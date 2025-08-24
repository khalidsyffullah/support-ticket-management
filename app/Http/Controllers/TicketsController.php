<?php

namespace App\Http\Controllers;

use App\Events\AssignedUser;
use App\Events\TicketCreated;
use App\Events\TicketNewComment;
use App\Events\TicketUpdated;
use App\Http\Middleware\RedirectIfNotParmitted;
use App\Models\Attachment;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Contact;
use App\Models\Department;
use App\Models\Faq;
use App\Models\KnowledgeBase;
use App\Models\PendingEmail;
use App\Models\Priority;
use App\Models\Review;
use App\Models\Role;
use App\Models\Setting;
use App\Models\Status;
use App\Models\Ticket;
use App\Models\TicketEntry;
use App\Models\TicketField;
use App\Models\Type;
use App\Notifications\TicketForwardedNotification;
use App\Notifications\TicketUpdatedNotification;
use App\Models\User;
use App\Models\TicketForwardingRequest;
use App\Notifications\TicketForwardingRequested;
use App\Notifications\TicketForwardingResult;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TicketsController extends Controller
{

    public function __construct(){
        $this->middleware(RedirectIfNotParmitted::class.':ticket');
    }

    public function index(Request $request){
        $byCustomer = null;
        $byAssign = null;
        $user = Auth()->user();
        $hiddenFields = Setting::where('slug', 'hide_ticket_fields')->first();
        if(in_array($user['role']['slug'], ['customer'])){
            $byCustomer = $user['id'];
        }elseif(in_array($user['role']['slug'], ['manager'])){
            $byAssign = $user['id'];
        }else{
            $byAssign = $request->input('assigned_to');
        }
        $whereAll = [];
        $type = $request->input('type');
        $limit = $request->input('limit', 10);
        $customer = $request->input('customer_id');

        if(!empty($customer)){
            $whereAll[] = ['user_id', '=', $customer];
        }

        if($type == 'un_assigned'){
            $whereAll[] = ['assigned_to', '=', null];
        }elseif ($type == 'open'){
            $opened_status = Status::where('slug', 'like', '%closed%')->first();
            $whereAll[] = ['status_id', '!=', $opened_status->id];
        }elseif ($type == 'new'){
            $whereAll[] = ['created_at', '>=', date('Y-m-d').' 00:00:00'];
        }

        $ticketQuery = Ticket::where($whereAll);

        if ($request->has(['field', 'direction'])) {
            if($request->input('field') == 'tech'){
                $ticketQuery
                    ->join('users', 'tickets.assigned_to', '=', 'users.id')
                    ->orderBy('users.first_name', $request->input('direction'))->select('tickets.*');
            }else{
                $ticketQuery->orderBy($request->input('field'), $request->input('direction'));
            }
        }else{
            $ticketQuery->orderBy('updated_at', 'DESC');
        }

        return Inertia::render('Tickets/Index', [
            'title' => 'Tickets',
            'filters' => $request->all(),
            'hidden_fields' => $hiddenFields && $hiddenFields->value ? json_decode($hiddenFields->value) : null ,
            'priorities' => Priority::orderBy('name')
                ->get()
                ->map
                ->only('id', 'name'),
            'assignees' => [],
            'types' => Type::orderBy('name')
                ->get()
                ->map
                ->only('id', 'name'),
            'categories' => Category::orderBy('name')
                ->get()
                ->map
                ->only('id', 'name'),
            'departments' => Department::orderBy('name')
                ->get()
                ->map
                ->only('id', 'name'),
            'statuses' => Status::orderBy('name')
                ->get()
                ->map
                ->only('id', 'name'),
            'tickets' => $ticketQuery
                ->filter($request->only(['search', 'priority_id', 'status_id', 'type_id', 'category_id', 'department_id']))
                ->byCustomer($byCustomer)
                ->byAssign($byAssign)
                ->paginate($limit)
                ->withQueryString()
                ->through(function ($ticket){
                    return [
                        'id' => $ticket->id,
                        'uid' => $ticket->uid,
                        'subject' => $ticket->subject,
                        'user' => $ticket->user ? $ticket->user->first_name.' '.$ticket->user->last_name : null,
                        'priority' => $ticket->priority ? $ticket->priority->name : null,
                        'category' => $ticket->category ? $ticket->category->name: null,
                        'sub_category' => $ticket->subCategory ? $ticket->subCategory->name: null,
                        'rating' => $ticket->review ? $ticket->review->rating : 0,
                        'status' => $ticket->status ? $ticket->status->name : null,
                        'status_slug' => $ticket->status ? $ticket->status->slug : null,
                        'due' => $ticket->due,
                        'assigned_to' => $ticket->assignedTo? $ticket->assignedTo->first_name.' '.$ticket->assignedTo->last_name : null,
                        'created_at' => $ticket->created_at,
                        'updated_at' => $ticket->updated_at,
                    ];
                }),
        ]);
    }

    public function suggestions(Request $request)
    {
        $searchTerm = $request->input('search');

        if (strlen($searchTerm) < 1) {
            return response()->json(['faqs' => [], 'knowledge_base' => []]);
        }

        $searchWords = array_unique(explode(' ', $searchTerm));

        $faqQuery = Faq::query();
        $kbQuery = KnowledgeBase::query();

        $faqRelevance = "((CASE WHEN name LIKE '%{$searchTerm}%' THEN 2 ELSE 0 END)";
        $kbRelevance = "((CASE WHEN title LIKE '%{$searchTerm}%' THEN 2 ELSE 0 END)";

        $faqQuery->where(function ($query) use ($searchWords) {
            foreach ($searchWords as $word) {
                if (!empty($word)) {
                    $query->orWhere('name', 'LIKE', "%{$word}%")
                          ->orWhere('details', 'LIKE', "%{$word}%");
                }
            }
        });

        $kbQuery->where(function ($query) use ($searchWords) {
            foreach ($searchWords as $word) {
                if (!empty($word)) {
                    $query->orWhere('title', 'LIKE', "%{$word}%")
                          ->orWhere('details', 'LIKE', "%{$word}%");
                }
            }
        });

        foreach ($searchWords as $word) {
            if (!empty($word)) {
                $faqRelevance .= " + (CASE WHEN name LIKE '%{$word}%' THEN 1 ELSE 0 END)";
                $faqRelevance .= " + (CASE WHEN details LIKE '%{$word}%' THEN 1 ELSE 0 END)";
                $kbRelevance .= " + (CASE WHEN title LIKE '%{$word}%' THEN 1 ELSE 0 END)";
                $kbRelevance .= " + (CASE WHEN details LIKE '%{$word}%' THEN 1 ELSE 0 END)";
            }
        }
        $faqRelevance .= ")";
        $kbRelevance .= ")";


        $faqs = $faqQuery
            ->select('id', 'name', 'details')
            ->selectRaw("{$faqRelevance} as relevance")
            ->orderBy('relevance', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($faq) {
                $faq->details = strip_tags($faq->details);
                return $faq;
            });

        $knowledge_base = $kbQuery
            ->select('id', 'title', 'details')
            ->selectRaw("{$kbRelevance} as relevance")
            ->orderBy('relevance', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($kb) {
                $kb->details = strip_tags($kb->details);
                return $kb;
            });

        return response()->json(['faqs' => $faqs, 'knowledge_base' => $knowledge_base]);
    }

    public function csvImport(Request $request)
    {
        $file = $request->file('file');
        if(!empty($file)){

            $fileContents = $this->csvToArray($file->getPathname());
            foreach ($fileContents as $data) {
                $findExistingTicket = Ticket::where('uid', $data['UID'])->first();
                if(empty($findExistingTicket)){
                    $priority = Priority::firstOrCreate(['name' => $data['Priority']]);
                    $category = Category::firstOrCreate(['name' => $data['Category']]);
                    $sub_category = Category::firstOrCreate(['name' => $data['Sub Category']]);
                    $department = Department::firstOrCreate(['name' => $data['Department']]);
                    $status = Status::firstOrCreate(['name' => $data['Status']]);
                    $assignTo = User::where(['email' => $data['Assigned To Email']])->first();
                    if(empty($assignTo) && !empty($data['Assigned To Email']) && !empty($data['Assigned To Name'])){
                        $aName = $this->splitName($data['Assigned To Name']);
                        $assignTo = User::create(['email' => $data['Assigned To Email'], 'first_name' => $aName[0], 'last_name' => $aName[1]]);
                    }

                    $ticket = Ticket::create([
                        'uid' => $data['UID'],
                        'subject' => $data['Subject'],
                        'priority_id' => $priority->id,
                        'category_id' => $category->id,
                        'sub_category_id' => $sub_category->id,
                        'department_id' => $department->id,
                        'status_id' => $status->id,
                        'assigned_to' => $assignTo?$assignTo->id:null
                    ]);
                }
            }
            return redirect()->back()->with('success', 'CSV file imported successfully.');
        }else{
            return redirect()->back()->with('error', 'CSV file import issue!');
        }
    }

    public function csvExport()
    {
        $tickets = Ticket::all();
        $csvFileName = 'tickets.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $csvFileName . '"',
        ];

        $handle = fopen('php://output', 'w');
        fputcsv($handle, ['UID', 'Subject', 'Priority', 'Category', 'Sub Category', 'Department', 'Status', 'Assigned To Email', 'Assigned To Name', 'Created']);

        foreach ($tickets as $ticket) {
            fputcsv($handle, [$ticket->uid, $ticket->subject, $ticket->priority ? $ticket->priority->name : null,
                $ticket->category ? $ticket->category->name: null, $ticket->subCategory ? $ticket->subCategory->name: null,
                $ticket->department ? $ticket->department->name: null,
                $ticket->status ? $ticket->status->name : null,
                $ticket->assignedTo? $ticket->assignedTo->email : null,
                $ticket->assignedTo? $ticket->assignedTo->first_name.' '.$ticket->assignedTo->last_name : null,
                $ticket->created_at
                ]);
        }

        fclose($handle);

        return Response::make('', 200, $headers);
    }

    public function create(Request $request){
        $user = Auth()->user();
        $roles = Role::pluck('id', 'slug')->all();
        $hiddenFields = Setting::where('slug', 'hide_ticket_fields')->first();
        $custom_fields = TicketField::get();
        return Inertia::render('Tickets/Create', [
            'title' => 'Create a new ticket',
            'custom_fields' => $custom_fields,
            'hidden_fields' => $hiddenFields && $hiddenFields->value ? json_decode($hiddenFields->value) : null ,
            'customers' => User::where('role_id', $roles['customer'] ?? 0)->orWhere('id', $request->input('customer_id'))->orderBy('first_name')
                ->limit(6)
                ->get()
                ->map
                ->only('id', 'name'),
            'usersExceptCustomers' => User::where('role_id', '!=', $roles['customer'] ?? 0)->orWhere('id', $request->input('user_id'))->orderBy('first_name')
                ->limit(6)
                ->get()
                ->map
                ->only('id', 'name'),
            'priorities' => Priority::orderBy('name')
                ->get()
                ->map
                ->only('id', 'name'),
            'departments' => Department::orderBy('name')
                ->get()
                ->map
                ->only('id', 'name'),
            'all_categories' => Category::orderBy('name')
                ->get(),
            'statuses' => Status::orderBy('name')
                ->get()
                ->map
                ->only('id', 'name'),
            'types' => Type::orderBy('name')
                ->get()
                ->map
                ->only('id', 'name'),
        ]);
    }

    public function store(\Illuminate\Http\Request $request) {
        $required_fields = [];

        $get_required_fields = Setting::where('slug', 'required_ticket_fields')->first();
        if(!empty($get_required_fields)){
            $required_fields = json_decode($get_required_fields->value, true);
        }
        $user = Auth()->user();
        $request_data = $this->validate($request, [
            'user_id' => ['nullable', Rule::exists('users', 'id')],
            'priority_id' => ['nullable', Rule::exists('priorities', 'id')],
            'status_id' => ['nullable', Rule::exists('status', 'id')],
            'department_id' => [in_array('department', $required_fields)?'required':'nullable', Rule::exists('departments', 'id')],
            'assigned_to' => [in_array('assigned_to', $required_fields)?'required':'nullable', Rule::exists('users', 'id')],
            'category_id' => [in_array('category', $required_fields)?'required':'nullable', Rule::exists('categories', 'id')],
            'sub_category_id' => [in_array('sub_category', $required_fields)?'required':'nullable', Rule::exists('categories', 'id')],
            'type_id' => [in_array('ticket_type', $required_fields)?'required':'nullable', Rule::exists('types', 'id')],
            'subject' => ['required'],
            'details' => ['required'],
        ]);

        if(in_array($user['role']['slug'], ['customer'])){
            $request_data['user_id'] = $user['id'];
        }

        if(is_null($request_data['priority_id'])){
            $priority = Priority::orderBy('name')->first();
            if(!empty($priority)){
                $request_data['priority_id'] = $priority->id;
            }
        }

        if(is_null($request_data['status_id'])){
            $status = Status::where('slug', 'like', '%active%')->first();
            if(!empty($status)){
                $request_data['status_id'] = $status->id;
            }
        }

        $request_data['created_by'] = $user['id'];
        $ticket = Ticket::create($request_data);

        if($request->hasFile('files')){
            $files = $request->file('files');
            foreach($files as $file){
                $file_path = $file->store('tickets', ['disk' => 'file_uploads']);
                Attachment::create(['ticket_id' => $ticket->id, 'name' => $file->getClientOriginalName(), 'size' => $file->getSize(), 'path' => $file_path]);
            }
        }

        $custom_inputs = $request->input('custom_field');

        if(!empty($custom_inputs)){
            foreach ($custom_inputs as $cfk => $cfv){
                $ticket_field = TicketField::where('name', $cfk)->first();
                if(!empty($ticket_field)){
                    TicketEntry::create(['ticket_id' => $ticket->id, 'field_id' => $ticket_field->id, 'name' => $cfk, 'label' => $ticket_field->label, 'value' => $cfv]);
                }
            }
        }

        event(new TicketCreated(['ticket_id' => $ticket->id]));

        if(!empty($ticket->assigned_to)){
            event(new AssignedUser($ticket->id));
        }


        return Redirect::route('tickets')->with('success', 'Ticket created.');
    }

    public function edit(Request $request, $uid){
        $user = Auth()->user();
        $byCustomer = null;
        $byAssign = null;
        if(in_array($user['role']['slug'], ['customer'])){
            $byCustomer = $user['id'];
        }elseif(in_array($user['role']['slug'], ['manager'])){
            $byAssign = $user['id'];
        }else{
            $byAssign = $request->input('assigned_to');
        }
        $ticket = Ticket::byCustomer($byCustomer)
            ->byAssign($byAssign)
            ->where(function($query) use ($uid){
                $query->where('uid', $uid);
                $query->orWhere('id', $uid);
            })->first();
        if(empty($ticket)){
            abort(404);
        }
        $hiddenFields = Setting::where('slug', 'hide_ticket_fields')->first();
        $comment_access = 'read';
        if($user['role']['slug'] === 'admin'){
            $comment_access = 'delete';
        }elseif($user['role']['slug'] === 'manager'){
            $comment_access = 'view';
        }

        $roles = Role::pluck('id', 'slug')->all();
        $department_users = [];
        if($ticket->department_id){
            $department_users = Department::find($ticket->department_id)->users()->get();
        }

        $forwarding_request = TicketForwardingRequest::with(['oldDepartment', 'newDepartment'])->where('ticket_id', $ticket->id)->latest()->first();

        return Inertia::render('Tickets/Edit', [
            'hidden_fields' => $hiddenFields ? json_decode($hiddenFields->value) : null ,
            'title' => $ticket->subject ? '#'.$ticket->uid.' '.$ticket->subject : '',
            'entries' => TicketEntry::where('ticket_id', $ticket->id)->get(),
            'customers' => User::where('role_id', $roles['customer'] ?? 0)->orWhere('id', $request->input('customer_id'))->orderBy('first_name')
                ->limit(6)
                ->get()
                ->map
                ->only('id', 'name'),
            'usersExceptCustomers' => $department_users,
            'priorities' => Priority::orderBy('name')
                ->get()
                ->map
                ->only('id', 'name'),
            'departments' => Department::orderBy('name')
                ->get()
                ->map
                ->only('id', 'name'),
            'all_categories' => Category::orderBy('name')
                ->get(),
            'statuses' => Status::orderBy('name')
                ->get()
                ->map
                ->only('id', 'name'),
            'attachments' => Attachment::orderBy('name')->with('user')->where('ticket_id', $ticket->id??null)->get(),
            'comments' => Comment::orderBy('created_at', 'asc')->with('user')->where('ticket_id', $ticket->id??null)->get(),
            'types' => Type::orderBy('name')
                ->get()
                ->map
                ->only('id', 'name'),
            'ticket' => [
                'id' => $ticket->id,
                'uid' => $ticket->uid,
                'user_id' => $ticket->user_id,
                'contact_id' => $ticket->contact_id,
                'user' => $ticket->user?$ticket->user->name: 'N/A',
                'contact' => $ticket->contact?: null,
                'priority_id' => $ticket->priority_id,
                'created_at' => $ticket->created_at,
                'priority' => $ticket->priority? $ticket->priority->name : 'N/A',
                'status_id' => $ticket->status_id,
                'status' => $ticket->status?: null,
                'closed' => $ticket->status && $ticket->status->slug == 'closed',
                'review' => $ticket->review,
                'department_id' => $ticket->department_id,
                'department' => $ticket->department? $ticket->department->name : 'N/A',
                'category_id' => $ticket->category_id,
                'sub_category_id' => $ticket->sub_category_id,
                'category' => $ticket->category ? $ticket->category->name : 'N/A',
                'sub_category' => $ticket->subCategory ? $ticket->subCategory->name : 'N/A',
                'assigned_to' => $ticket->assigned_to,
                'assigned_user' => $ticket->assignedTo ? $ticket->assignedTo->first_name .' '.$ticket->assignedTo->last_name : 'N/A',
                'type_id' => $ticket->type_id,
                'type' => $ticket->ticketType ? $ticket->ticketType->name : 'N/A',
                'ticket_id' => $ticket->ticket_id,
                'subject' => $ticket->subject,
                'details' => $ticket->details,
                'files' => [],
                'comment_access' => $comment_access,
            ],
            'forwarding_request' => $forwarding_request,
        ]);
    }

    public function update(Request $request, Ticket $ticket){
        $user = Auth()->user();
        $request_data = $this->validate($request, [
            'user_id' => ['nullable', Rule::exists('users', 'id')],
            'contact_id' => ['nullable', Rule::exists('contacts', 'id')],
            'priority_id' => ['nullable', Rule::exists('priorities', 'id')],
            'status_id' => ['nullable', Rule::exists('status', 'id')],
            'department_id' => ['nullable', Rule::exists('departments', 'id')],
            'assigned_to' => ['nullable', Rule::exists('users', 'id')],
            'category_id' => ['nullable', Rule::exists('categories', 'id')],
            'sub_category_id' => ['nullable', Rule::exists('categories', 'id')],
            'type_id' => ['nullable', Rule::exists('types', 'id')],
            'subject' => ['required'],
            'due' => ['nullable'],
            'details' => ['required'],
        ]);

        if(!empty($request->input('review')) || !empty($request->input('rating'))){
            $review = Review::create([
                'review' => $request->input('review'),
                'rating' => $request->input('rating'),
                'ticket_id' => $ticket->id,
                'user_id' => $user['id']
            ]);
            $ticket->update(['review_id' => $review->id]);
            return Redirect::route('tickets.edit', $ticket->uid)->with('success', 'Added the review!');
        }

        $closed_status = Status::where('slug', 'like', '%close%')->first();

        $update_message = null;
        if($closed_status && ($ticket->status_id != $closed_status->id) && $request_data['status_id'] == $closed_status->id){
            $update_message = 'The ticket has been closed.';
        }elseif($ticket->status_id != $request_data['status_id']){
            $update_message = 'The status has been changed for this ticket.';
        }

        if($ticket->priority_id != $request_data['priority_id']){
            $update_message = 'The priority has been changed for this ticket.';
        }

        if(empty($ticket->response) && $user['role']['slug'] === 'admin'){
            $request_data['response'] = date('Y-m-d H:i:s');
        }

        if(isset($request_data['due']) && !empty($request_data['due'])){
            $request_data['due'] = date('Y-m-d', strtotime($request_data['due']));
        }

        $assigned = (!empty($request_data['assigned_to']) && ($ticket->assigned_to != $request_data['assigned_to']))??false;
        $departmentChanged = $ticket->department_id != $request_data['department_id'];

        $old_department = $ticket->department;

        if ($departmentChanged && auth()->user()->role->slug != 'admin') {
            $forwarding_request = TicketForwardingRequest::create([
                'ticket_id' => $ticket->id,
                'old_department_id' => $ticket->department_id,
                'new_department_id' => $request_data['department_id'],
                'requested_by' => auth()->user()->id,
            ]);

            $admin_users = User::whereHas('role', function ($query) {
                $query->where('slug', 'admin');
            })->get();

            $message = 'Ticket #' . $ticket->uid . ' has a pending forwarding request.';
            Notification::send($admin_users, new TicketForwardingRequested($ticket, $forwarding_request));

            return Redirect::route('tickets.edit', $ticket->uid)->with('success', 'Ticket forwarding request sent for approval.');
        }

        $ticket->update($request_data);

        if ($departmentChanged) {
            $department = Department::find($request_data['department_id']);
            if($old_department){
                $message = "Ticket #{$ticket->uid} has been forwarded to {$department->name} from {$old_department->name} by ".auth()->user()->name;
            }else{
                $message = "Ticket #{$ticket->uid} has been assigned to {$department->name} department by ".auth()->user()->name;
            }

            if($department){
                Notification::send($department->users, new TicketForwardedNotification($ticket, $message));
            }

            $admin_users = User::whereHas('role', function ($query) {
                $query->where('slug', 'admin');
            })->get();
            Notification::send($admin_users, new TicketForwardedNotification($ticket, $message));
        }

        if($assigned){
            $user = User::find($request_data['assigned_to']);
            $message = "You have been assigned a new ticket #{$ticket->uid}";
            Notification::send($user, new TicketUpdatedNotification($ticket, $message));
            event(new AssignedUser(['ticket_id' => $ticket->id]));
        }

        if(!empty($update_message)){
            event(new TicketUpdated(['ticket_id' => $ticket->id, 'update_message' => $update_message]));
        }

        if(!empty($request->input('comment'))){
            Comment::create([
                'details' => $request->input('comment'),
                'ticket_id' => $ticket->id,
                'user_id' => $user['id']
            ]);
            $this->sendMailCron( $ticket->id, 'response' , $request->input('comment') );
        }

        $removedFiles = $request->input('removedFiles');
        if(!empty($removedFiles)){
            $attachments = Attachment::where('ticket_id', $ticket->id)->whereIn('id', $removedFiles)->get();
            foreach ($attachments as $attachment){
                if(Storage::disk('file_uploads')->exists($attachment->path)){
                    Storage::disk('file_uploads')->delete($attachment->path);
                }
                $attachment->delete();
            }
        }

        if($request->hasFile('files')){
            $files = $request->file('files');
            foreach($files as $file){
                $file_path = $file->store('tickets', ['disk' => 'file_uploads']);
                Attachment::create(['ticket_id' => $ticket->id, 'user_id' => $user['id'], 'name' => $file->getClientOriginalName(), 'size' => $file->getSize(), 'path' => $file_path]);
            }
        }

        return Redirect::route('tickets.edit', $ticket->uid)->with('success', 'Ticket updated.');
    }

    public function newComment(Request $request){
        $requestAll = $request->all();
        $ticket = Comment::where('ticket_id', $requestAll['ticket_id'])->count();
        if(empty($ticket)){
            event(new TicketNewComment(['ticket_id' => $requestAll['ticket_id'], 'comment' => $requestAll['comment']]));
        }

        $newComment = new Comment;
        if(isset($requestAll['user_id'])){
            $newComment->user_id = $requestAll['user_id'];
        }
        if(isset($requestAll['ticket_id'])){
            $newComment->ticket_id = $requestAll['ticket_id'];
        }
        $newComment->details = $requestAll['comment'];

        $newComment->save();

        return response()->json($newComment);
    }

    public function destroy(Ticket $ticket)
    {        $ticket->delete();
        return Redirect::route('tickets')->with('success', 'Ticket deleted.');
    }

    public function restore(Ticket $ticket){
        $ticket->restore();
        return Redirect::back()->with('success', 'Ticket restored.');
    }

    public function handleForwardingRequest(Request $request, $id)
    {
        $forwarding_request = TicketForwardingRequest::findOrFail($id);
        $ticket = Ticket::findOrFail($forwarding_request->ticket_id);
        $admin = auth()->user();

        if ($request->status == 'approved') {
            $ticket->update([
                'department_id' => $forwarding_request->new_department_id,
                'assigned_to' => null
            ]);

            $forwarding_request->update(['status' => 'approved', 'processed_by' => $admin->id]);

            $old_department = Department::find($forwarding_request->old_department_id);
            $new_department = Department::find($forwarding_request->new_department_id);

            // Notify old department team
            if ($old_department) {
                $message = "For Ticket #{$ticket->uid} your forwarding request is accepted by {$admin->name}.";
                Notification::send($old_department->users, new TicketForwardedNotification($ticket, $message));
            }

            // Notify new department team
            if ($new_department) {
                $message = "Ticket #{$ticket->uid} has been assigned to {$new_department->name} department by {$admin->name}.";
                Notification::send($new_department->users, new TicketForwardedNotification($ticket, $message));
            }

            session()->flash('success', 'Ticket forwarding request approved and ticket updated.');
            return response()->json(['success' => true]);

        } else {
            $forwarding_request->update(['status' => 'rejected', 'processed_by' => $admin->id]);

            $old_department = Department::find($forwarding_request->old_department_id);

            if ($old_department) {
                $message = "For Ticket #{$ticket->uid} your forwarding request is rejected by {$admin->name}.";
                Notification::send($old_department->users, new TicketForwardedNotification($ticket, $message));
            }

            session()->flash('success', 'Ticket forwarding request rejected.');
            return response()->json(['success' => true]);
        }
    }

    private function sendMailCron($id, $type = null, $value = null){
        PendingEmail::create(['ticket_id' => $id, 'type' => $type, 'value' => $value]);
    }

    private function csvToArray($filename = '', $delimiter = ',')
    {
        if (!file_exists($filename) || !is_readable($filename))
            return false;

        $header = null;
        $data = array();
        if (($handle = fopen($filename, 'r')) !== false)
        {
            while (($row = fgetcsv($handle, 1000, $delimiter)) !== false)
            {
                if (!$header)
                    $header = $row;
                else
                    $data[] = array_combine($header, $row);
            }
            fclose($handle);
        }

        return $data;
    }

    private function splitName($name) {
        $name = trim($name);
        $last_name = (!str_contains($name, ' ')) ? '' : preg_replace('#.*\s([\w-]*)$#', '$1', $name);
        $first_name = trim( preg_replace('#'.preg_quote($last_name,'#').'#', '', $name ) );
        return array($first_name, $last_name);
    }
}