<?php

namespace App\Http\Controllers;

use App\Events\ContactMessage;
use App\Models\Blog;
use App\Models\Faq;
use App\Models\FrontPage;
use App\Models\KnowledgeBase;
use App\Models\Setting;
use App\Models\Type;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Jackiedo\DotenvEditor\Facades\DotenvEditor;

class PageController extends Controller
{

    public function blog()
    {
        if (!$this->isEnabled('blog')) {
            return abort(404);
        }
        return Inertia::render('Landing/Blog/Index', [
            'footer' => FrontPage::where('slug', 'footer')->first(),
            'title' => 'Blogs & News',
            'posts' => Blog::where('is_active', '1')->orderBy('created_at', 'desc')
                ->filter(Request::only('search'))
                ->paginate(6)
                ->withQueryString()
                ->through(function ($post) {
                    return [
                        'id' => $post->id,
                        'title' => $post->title,
                        'type' => $post->type ? $post->type->name : '',
                        'typeId' => $post->type_id,
                        'image' => $post->image,
                        'details' => strip_tags($post->details),
                        'created_at' => $post->created_at,
                        'updated_at' => $post->updated_at,
                    ];
                }),
        ]);
    }

    public function kbByType($typeId)
    {
        $type = Type::where('id', $typeId)->first();
        return Inertia::render('Landing/KnowledgeBase/ByType', [
            'footer' => FrontPage::where('slug', 'footer')->first(),
            'title' => 'Blog posts',
            'type' => $type,
            'posts' => KnowledgeBase::where('type_id', $type->id)->orderBy('created_at', 'desc')
                ->filter(Request::only('search'))
                ->paginate(9)
                ->withQueryString()
                ->through(function ($post) {
                    return [
                        'id' => $post->id,
                        'title' => $post->title,
                        'type' => $post->type ? $post->type->name : '',
                        'typeId' => $post->type_id,
                        'details' => strip_tags($post->details),
                        'created_at' => $post->created_at,
                        'updated_at' => $post->updated_at,
                    ];
                }),
        ]);
    }

    public function blogByType($typeId)
    {
        $type = Type::where('id', $typeId)->first();
        return Inertia::render('Landing/Blog/ByType', [
            'footer' => FrontPage::where('slug', 'footer')->first(),
            'title' => 'Blog posts',
            'type' => $type,
            'posts' => Blog::where('type_id', $type->id)->orderBy('created_at', 'desc')
                ->filter(Request::only('search'))
                ->paginate(9)
                ->withQueryString()
                ->through(function ($post) {
                    return [
                        'id' => $post->id,
                        'title' => $post->title,
                        'isActive' => $post->is_active ? 'Yes' : 'No',
                        'type' => $post->type ? $post->type->name : '',
                        'typeId' => $post->type_id,
                        'image' => $post->image,
                        'details' => strip_tags($post->details),
                        'created_at' => $post->created_at,
                        'updated_at' => $post->updated_at,
                    ];
                }),
        ]);
    }

    public function blogDetails(Blog $post)
    {
        return Inertia::render('Landing/Blog/Details', [
            'footer' => FrontPage::where('slug', 'footer')->first(),
            'title' => $post->title,
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'is_active' => $post->is_active,
                'author_id' => $post->author_id,
                'author' => $post->author ?? null,
                'type_id' => $post->type_id,
                'image' => $post->image,
                'details' => $post->details,
                'created_at' => $post->created_at,
                'updated_at' => $post->updated_at,
            ],
            'types' => Type::whereHas('posts')->get(),
            'recent_posts' => Blog::where('id', '!=', $post->id)
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get()
                ->map
                ->only('id', 'title', 'created_at', 'details', 'image', 'updated_at'),
            'related_posts' => Blog::where('type_id', $post->type_id)
                ->where('id', '!=', $post->id)
                ->orderBy('created_at', 'desc')
                ->limit(3)
                ->get()
                ->map
                ->only('id', 'title', 'created_at', 'details', 'image', 'updated_at')
        ]);
    }

    public function kb()
    {
        if (!$this->isEnabled('kb')) {
            return abort(404);
        }
        // Test Code
        $setting = Setting::where('slug', 'enable_options')->select('value')->first();
        $options = $setting->value ? json_decode($setting->value, true) : null;
        $key = array_search('service', array_column($options, 'slug'));
        $option = $options[$key];
        // Test Code
        return Inertia::render('Landing/KnowledgeBase/Index', [
            'footer' => FrontPage::where('slug', 'footer')->first(),
            'types' => Type::orderBy('name')->get()->map->only('id', 'name'),
            'filters' => Request::only('search'),
            'title' => 'Knowledge Base',
            'kb' => KnowledgeBase::orderBy('created_at', 'desc')
                ->filter(Request::only('search'))
                ->paginate(9)
                ->withQueryString()
                ->through(function ($post) {
                    return [
                        'id' => $post->id,
                        'title' => $post->title,
                        'type' => $post->type ? $post->type->name : '',
                        'typeId' => $post->type_id,
                        'updated_at' => $post->updated_at,
                        'created_at' => $post->created_at,
                        'details' => strip_tags($post->details),
                    ];
                }),
        ]);
    }

    public function faq()
    {
        if (!$this->isEnabled('faq')) {
            return abort(404);
        }
        return Inertia::render('Landing/FAQ', [
            'footer' => FrontPage::where('slug', 'footer')->first(),
            'title' => 'FAQs',
            'filters' => Request::only('search'),
            'faqs' => Faq::orderBy('name')
                ->filter(Request::only('search'))
                ->paginate(100)
                ->withQueryString()
                ->through(function ($faq) {
                    return [
                        'id' => $faq->id,
                        'name' => $faq->name,
                        'details' => $faq->details,
                        'active' => false,
                    ];
                }),
        ]);
    }

    public function kbDetails(KnowledgeBase $kb_item)
    {
        return Inertia::render('Landing/KnowledgeBase/Details', [
            'footer' => FrontPage::where('slug', 'footer')->first(),
            'title' => $kb_item->title,
            'kb' => [
                'id' => $kb_item->id,
                'title' => $kb_item->title,
                'type' => $kb_item->type ? $kb_item->type->name : '',
                'typeId' => $kb_item->type_id,
                'updated_at' => $kb_item->updated_at,
                'created_at' => $kb_item->created_at,
                'details' => $kb_item->details,
            ],
            'types' => Type::whereHas('kb')->get(),
            'random_kb' => KnowledgeBase::where('id', '!=', $kb_item->id)
                ->inRandomOrder()
                ->limit(5)
                ->get()
                ->map
                ->only('id', 'title', 'created_at', 'details', 'updated_at')
        ]);
    }

    public function privacy()
    {
        $page = FrontPage::where('slug', 'privacy')->first();
        return Inertia::render('Landing/PrivacyPolicy', [
            'footer' => FrontPage::where('slug', 'footer')->first(),
            'title' => $page->title,
            'data' => $page
        ]);
    }

    public function contact()
    {
        if (!$this->isEnabled('contact')) {
            return abort(404);
        }
        $page = FrontPage::where('slug', 'contact')->first();
        $env = DotenvEditor::load();
        $siteKey = $env->keyExists('RE_CAPTCHA_KEY') ? $env->getValue('RE_CAPTCHA_KEY') : '';
        return Inertia::render('Landing/Contact', [
            'footer' => FrontPage::where('slug', 'footer')->first(),
            'site_key' => $siteKey,
            'title' => $page->title,
            'data' => $page
        ]);
    }

    public function services()
    {
        if (!$this->isEnabled('service')) {
            return abort(404);
        }
        $page = FrontPage::where('slug', 'services')->first();
        return Inertia::render('Landing/Services', [
            'footer' => FrontPage::where('slug', 'footer')->first(),
            'title' => 'Services',
            'data' => $page
        ]);
    }

    public function terms()
    {
        $page = FrontPage::where('slug', 'terms')->first();
        return Inertia::render('Landing/TermsOfServices', [
            'footer' => FrontPage::where('slug', 'footer')->first(),
            'title' => $page->title,
            'data' => $page
        ]);
    }

    public function contactPost()
    {
        $contact_data = Request::validate([
            'name' => ['required', 'max:40'],
            'email' => ['required', 'max:60', 'email'],
            'phone' => ['nullable', 'max:20'],
            'message' => ['required'],
        ]);

        event(new ContactMessage(['email' => $contact_data['email'], 'name' => $contact_data['name'], 'phone' => $contact_data['phone'], 'message' => $contact_data['message']]));
        return Redirect::back()->with('success', 'Your message has been sent!');
    }
    private function isEnabled($slug)
    {
        $setting = Setting::where('slug', 'enable_options')->select('value')->first();
        $options = $setting->value ? json_decode($setting->value, true) : null;
        $key = array_search($slug, array_column($options, 'slug'));
        if (empty($options)) {
            return true;
        }
        return $options[$key] ? $options[$key]['value'] : true;
    }

    public function getFlag($code)
    {
        $flagItems = [
            'AD' => '🇦🇩',
            'AE' => '🇦🇪',
            'AF' => '🇦🇫',
            'AG' => '🇦🇬',
            'AI' => '🇦🇮',
            'AL' => '🇦🇱',
            'AM' => '🇦🇲',
            'AO' => '🇦🇴',
            'AQ' => '🇦🇶',
            'AR' => '🇦🇷',
            'AS' => '🇦🇸',
            'AT' => '🇦🇹',
            'AU' => '🇦🇺',
            'AW' => '🇦🇼',
            'AX' => '🇦🇽',
            'AZ' => '🇦🇿',
            'BA' => '🇧🇦',
            'BB' => '🇧🇧',
            'BD' => '🇧🇩',
            'BE' => '🇧🇪',
            'BF' => '🇧🇫',
            'BG' => '🇧🇬',
            'BH' => '🇧🇭',
            'BI' => '🇧🇮',
            'BJ' => '🇧🇯',
            'BL' => '🇧🇱',
            'BM' => '🇧🇲',
            'BN' => '🇧🇳',
            'BO' => '🇧🇴',
            'BQ' => '🇧🇶',
            'BR' => '🇧🇷',
            'BS' => '🇧🇸',
            'BT' => '🇧🇹',
            'BV' => '🇧🇻',
            'BW' => '🇧🇼',
            'BY' => '🇧🇾',
            'BZ' => '🇧🇿',
            'CA' => '🇨🇦',
            'CC' => '🇨🇨',
            'CD' => '🇨🇩',
            'CF' => '🇨🇫',
            'CG' => '🇨🇬',
            'CH' => '🇨🇭',
            'CI' => '🇨🇮',
            'CK' => '🇨🇰',
            'CL' => '🇨🇱',
            'CM' => '🇨🇲',
            'CN' => '🇨🇳',
            'CO' => '🇨🇴',
            'CR' => '🇨🇷',
            'CU' => '🇨🇺',
            'CV' => '🇨🇻',
            'CW' => '🇨🇼',
            'CX' => '🇨🇽',
            'CY' => '🇨🇾',
            'CZ' => '🇨🇿',
            'DE' => '🇩🇪',
            'DJ' => '🇩🇯',
            'DK' => '🇩🇰',
            'DM' => '🇩🇲',
            'DO' => '🇩🇴',
            'DZ' => '🇩🇿',
            'EC' => '🇪🇨',
            'EE' => '🇪🇪',
            'EG' => '🇪🇬',
            'EH' => '🇪🇭',
            'ER' => '🇪🇷',
            'ES' => '🇪🇸',
            'ET' => '🇪🇹',
            'FI' => '🇫🇮',
            'FJ' => '🇫🇯',
            'FK' => '🇫🇰',
            'FM' => '🇫🇲',
            'FO' => '🇫🇴',
            'FR' => '🇫🇷',
            'GA' => '🇬🇦',
            'GB' => '🇬🇧',
            'GD' => '🇬🇩',
            'GE' => '🇬🇪',
            'GF' => '🇬🇫',
            'GG' => '🇬🇬',
            'GH' => '🇬🇭',
            'GI' => '🇬🇮',
            'GL' => '🇬🇱',
            'GM' => '🇬🇲',
            'GN' => '🇬🇳',
            'GP' => '🇬🇵',
            'GQ' => '🇬🇶',
            'GR' => '🇬🇷',
            'GS' => '🇬🇸',
            'GT' => '🇬🇹',
            'GU' => '🇬🇺',
            'GW' => '🇬🇼',
            'GY' => '🇬🇾',
            'HK' => '🇭🇰',
            'HM' => '🇭🇲',
            'HN' => '🇭🇳',
            'HR' => '🇭🇷',
            'HT' => '🇭🇹',
            'HU' => '🇭🇺',
            'ID' => '🇮🇩',
            'IE' => '🇮🇪',
            'IL' => '🇮🇱',
            'IM' => '🇮🇲',
            'IN' => '🇮🇳',
            'IO' => '🇮🇴',
            'IQ' => '🇮🇶',
            'IR' => '🇮🇷',
            'IS' => '🇮🇸',
            'IT' => '🇮🇹',
            'JE' => '🇯🇪',
            'JM' => '🇯🇲',
            'JO' => '🇯🇴',
            'JP' => '🇯🇵',
            'KE' => '🇰🇪',
            'KG' => '🇰🇬',
            'KH' => '🇰🇭',
            'KI' => '🇰🇮',
            'KM' => '🇰🇲',
            'KN' => '🇰🇳',
            'KP' => '🇰🇵',
            'KR' => '🇰🇷',
            'KW' => '🇰🇼',
            'KY' => '🇰🇾',
            'KZ' => '🇰🇿',
            'LA' => '🇱🇦',
            'LB' => '🇱🇧',
            'LC' => '🇱🇨',
            'LI' => '🇱🇮',
            'LK' => '🇱🇰',
            'LR' => '🇱🇷',
            'LS' => '🇱🇸',
            'LT' => '🇱🇹',
            'LU' => '🇱🇺',
            'LV' => '🇱🇻',
            'LY' => '🇱🇾',
            'MA' => '🇲🇦',
            'MC' => '🇲🇨',
            'MD' => '🇲🇩',
            'ME' => '🇲🇪',
            'MF' => '🇲🇫',
            'MG' => '🇲🇬',
            'MH' => '🇲🇭',
            'MK' => '🇲🇰',
            'ML' => '🇲🇱',
            'MM' => '🇲🇲',
            'MN' => '🇲🇳',
            'MO' => '🇲🇴',
            'MP' => '🇲🇵',
            'MQ' => '🇲🇶',
            'MR' => '🇲🇷',
            'MS' => '🇲🇸',
            'MT' => '🇲🇹',
            'MU' => '🇲🇺',
            'MV' => '🇲🇻',
            'MW' => '🇲🇼',
            'MX' => '🇲🇽',
            'MY' => '🇲🇾',
            'MZ' => '🇲🇿',
            'NA' => '🇳🇦',
            'NC' => '🇳🇨',
            'NE' => '🇳🇪',
            'NF' => '🇳🇫',
            'NG' => '🇳🇬',
            'NI' => '🇳🇮',
            'NL' => '🇳🇱',
            'NO' => '🇳🇴',
            'NP' => '🇳🇵',
            'NR' => '🇳🇷',
            'NU' => '🇳🇺',
            'NZ' => '🇳🇿',
            'OM' => '🇴🇲',
            'PA' => '🇵🇦',
            'PE' => '🇵🇪',
            'PF' => '🇵🇫',
            'PG' => '🇵🇬',
            'PH' => '🇵🇭',
            'PK' => '🇵🇰',
            'PL' => '🇵🇱',
            'PM' => '🇵🇲',
            'PN' => '🇵🇳',
            'PR' => '🇵🇷',
            'PS' => '🇵🇸',
            'PT' => '🇵🇹',
            'PW' => '🇵🇼',
            'PY' => '🇵🇾',
            'QA' => '🇶🇦',
            'RE' => '🇷🇪',
            'RO' => '🇷🇴',
            'RS' => '🇷🇸',
            'RU' => '🇷🇺',
            'RW' => '🇷🇼',
            'SA' => '🇸🇦',
            'SB' => '🇸🇧',
            'SC' => '🇸🇨',
            'SD' => '🇸🇩',
            'SE' => '🇸🇪',
            'SG' => '🇸🇬',
            'SH' => '🇸🇭',
            'SI' => '🇸🇮',
            'SJ' => '🇸🇯',
            'SK' => '🇸🇰',
            'SL' => '🇸🇱',
            'SM' => '🇸🇲',
            'SN' => '🇸🇳',
            'SO' => '🇸🇴',
            'SR' => '🇸🇷',
            'SS' => '🇸🇸',
            'ST' => '🇸🇹',
            'SV' => '🇸🇻',
            'SX' => '🇸🇽',
            'SY' => '🇸🇾',
            'SZ' => '🇸🇿',
            'TC' => '🇹🇨',
            'TD' => '🇹🇩',
            'TF' => '🇹🇫',
            'TG' => '🇹🇬',
            'TH' => '🇹🇭',
            'TJ' => '🇹🇯',
            'TK' => '🇹🇰',
            'TL' => '🇹🇱',
            'TM' => '🇹🇲',
            'TN' => '🇹🇳',
            'TO' => '🇹🇴',
            'TR' => '🇹🇷',
            'TT' => '🇹🇹',
            'TV' => '🇹🇻',
            'TW' => '🇹🇼',
            'TZ' => '🇹🇿',
            'UA' => '🇺🇦',
            'UG' => '🇺🇬',
            'UM' => '🇺🇲',
            'US' => '🇺🇸',
            'UY' => '🇺🇾',
            'UZ' => '🇺🇿',
            'VA' => '🇻🇦',
            'VC' => '🇻🇨',
            'VE' => '🇻🇪',
            'VG' => '🇻🇬',
            'VI' => '🇻🇮',
            'VN' => '🇻🇳',
            'VU' => '🇻🇺',
            'WF' => '🇼🇫',
            'WS' => '🇼🇸',
            'XK' => '🇽🇰',
            'YE' => '🇾🇪',
            'YT' => '🇾🇹',
            'ZA' => '🇿🇦',
            'ZM' => '🇿🇲',
        ];
        return $flagItems[strtoupper($code)] ?? '🏳';
    }
}
