import { createSSRApp, h as h$1 } from "vue";
import { renderToString } from "@vue/server-renderer";
import { createInertiaApp } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
import { i18nVue } from "laravel-vue-i18n";
const Dashboard$1 = "ড্যাশবোর্ড";
const Logout$1 = "লগআউট";
const Tickets$1 = "টিকিট";
const Chat$1 = "চ্যাট";
const FAQs$1 = "প্রশ্নোত্তর";
const Blog$1 = "ব্লগ";
const More$1 = "আরও";
const Notes$1 = "নোট";
const Contacts$1 = "যোগাযোগ";
const Organizations$1 = "প্রতিষ্ঠান";
const Users$1 = "ব্যবহারকারীরা";
const Customers$1 = "গ্রাহকরা";
const Settings$1 = "সেটিংস";
const Global$1 = "গ্লোবাল";
const Categories$1 = "শ্রেণীসমূহ";
const Status$1 = "অবস্থা";
const Priorities$1 = "অগ্রাধিকার";
const Departments$1 = "বিভাগসমূহ";
const Types$1 = "ধরন";
const Pusher$1 = "পুশার";
const Contact$1 = "যোগাযোগ";
const Services$1 = "সেবা";
const Filter$1 = "ফিল্টার";
const Trashed$1 = "মুছে ফেলা";
const Reset$1 = "পুনরায় সেট করুন";
const Name$1 = "নাম";
const Email$1 = "ইমেইল";
const Phone$1 = "ফোন";
const Country$1 = "দেশ";
const City$1 = "শহর";
const Address$1 = "ঠিকানা";
const Password$1 = "পাসওয়ার্ড";
const Role$1 = "ভূমিকা";
const Photo$1 = "ছবি";
const Technical$1 = "প্রযুক্তিগত";
const Hardware$1 = "হার্ডওয়্যার";
const Development$1 = "উন্নয়ন";
const Management$1 = "ব্যবস্থাপনা";
const Admin$1 = "অ্যাডমিন";
const Software$1 = "সফটওয়্যার";
const Service$1 = "সেবা";
const Event$1 = "ইভেন্ট";
const Average$1 = "গড়";
const Seconds$1 = "সেকেন্ড";
const Month$1 = "মাস";
const Months$1 = "মাসসমূহ";
const Day$1 = "দিন";
const Days$1 = "দিনসমূহ";
const Hours$1 = "ঘণ্টা";
const Hour$1 = "ঘণ্টা";
const Minutes$1 = "মিনিট";
const Minute$1 = "মিনিট";
const Key$1 = "কি";
const Subject$1 = "বিষয়";
const Priority$1 = "অগ্রাধিকার";
const Updated$1 = "আপডেট করা হয়েছে";
const Customer$1 = "গ্রাহক";
const Department$1 = "বিভাগ";
const Category$1 = "শ্রেণী";
const Created$1 = "তৈরি করা হয়েছে";
const Save$1 = "সংরক্ষণ করুন";
const Ticket$1 = "টিকিট";
const FAQ$1 = "প্রশ্নোত্তর";
const Title$1 = "শিরোনাম";
const Details$1 = "বিস্তারিত";
const Note$1 = "নোট";
const Submit$1 = "জমা দিন";
const Cancel$1 = "বাতিল করুন";
const Organization$1 = "প্রতিষ্ঠান";
const Province$1 = "প্রদেশ";
const State$1 = "রাজ্য";
const Delete$1 = "মুছুন";
const Update$1 = "আপডেট করুন";
const Create$1 = "তৈরি করুন";
const Location$1 = "অবস্থান";
const Privacy$1 = "গোপনীয়তা";
const Company$1 = "কোম্পানি";
const Subscribe$1 = "সাবস্ক্রাইব";
const Login$1 = "লগইন";
const Hello$1 = "হ্যালো";
const Registration$1 = "নিবন্ধন";
const bd = {
  "Edit Profile": "প্রোফাইল সম্পাদনা করুন",
  Dashboard: Dashboard$1,
  Logout: Logout$1,
  Tickets: Tickets$1,
  Chat: Chat$1,
  FAQs: FAQs$1,
  Blog: Blog$1,
  "Knowledge Base": "জ্ঞানভিত্তিক তথ্য",
  More: More$1,
  Notes: Notes$1,
  Contacts: Contacts$1,
  Organizations: Organizations$1,
  Users: Users$1,
  Customers: Customers$1,
  Settings: Settings$1,
  Global: Global$1,
  Categories: Categories$1,
  Status: Status$1,
  Priorities: Priorities$1,
  Departments: Departments$1,
  Types: Types$1,
  "Email Templates": "ইমেইল টেমপ্লেট",
  "SMTP Mail": "SMTP মেইল",
  Pusher: Pusher$1,
  "Pusher Chat": "পুশার চ্যাট",
  "Front Pages": "সামনের পৃষ্ঠাসমূহ",
  Contact: Contact$1,
  Services: Services$1,
  "Privacy Policy": "গোপনীয়তা নীতি",
  "Terms of Services": "পরিষেবার শর্তাবলী",
  Filter: Filter$1,
  Trashed: Trashed$1,
  "Trashed With": "মুছে ফেলা সহ",
  "Only Trashed": "শুধুমাত্র মুছে ফেলা",
  "Search...": "অনুসন্ধান...",
  Reset: Reset$1,
  Name: Name$1,
  Email: Email$1,
  Phone: Phone$1,
  Country: Country$1,
  "Create User": "ব্যবহারকারী তৈরি করুন",
  "First Name": "প্রথম নাম",
  "First name": "প্রথম নাম",
  "Last Name": "শেষ নাম",
  "Last name": "শেষ নাম",
  City: City$1,
  Address: Address$1,
  Password: Password$1,
  Role: Role$1,
  Photo: Photo$1,
  "New Tickets": "নতুন টিকিট",
  "Open Tickets": "খোলা টিকিট",
  "Closed Tickets": "বন্ধ টিকিট",
  "Unassigned Tickets": "অবর্দিষ্ট টিকিট",
  "Ticket by department": "বিভাগ অনুযায়ী টিকিট",
  "Ticket by type": "ধরন অনুযায়ী টিকিট",
  "Top ticket creator": "শীর্ষ টিকিট নির্মাতা",
  "Ticket history": "টিকিট ইতিহাস",
  "First Response Time": "প্রথম প্রতিক্রিয়া সময়",
  "Last Response Time": "সর্বশেষ প্রতিক্রিয়া সময়",
  Technical: Technical$1,
  Hardware: Hardware$1,
  Development: Development$1,
  Management: Management$1,
  Admin: Admin$1,
  Software: Software$1,
  Service: Service$1,
  Event: Event$1,
  Average: Average$1,
  Seconds: Seconds$1,
  "this month": "এই মাস",
  "last month": "গত মাস",
  Month: Month$1,
  Months: Months$1,
  Day: Day$1,
  Days: Days$1,
  Hours: Hours$1,
  Hour: Hour$1,
  Minutes: Minutes$1,
  Minute: Minute$1,
  Key: Key$1,
  Subject: Subject$1,
  "Attach files": "ফাইল সংযুক্ত করুন",
  Priority: Priority$1,
  "Date": "তারিখ",
  Updated: Updated$1,
  Customer: Customer$1,
  Department: Department$1,
  "Assigned to": "নির্ধারিত",
  "Ticket type": "টিকিট ধরন",
  Category: Category$1,
  Created: Created$1,
  "Request Details": "অনুরোধের বিবরণ",
  "Attach File": "ফাইল সংযুক্ত করুন",
  "Delete Ticket": "টিকিট মুছুন",
  Save: Save$1,
  "Ticket discussion": "টিকিট আলোচনা",
  Ticket: Ticket$1,
  FAQ: FAQ$1,
  "Create Ticket": "টিকিট তৈরি করুন",
  "New Ticket": "নতুন টিকিট",
  "Create FAQ": "প্রশ্নোত্তর তৈরি করুন",
  "Filter by priority": "অগ্রাধিকারের মাধ্যমে ফিল্টার করুন",
  "Filter by status": "অবস্থার মাধ্যমে ফিল্টার করুন",
  "Delete FAQ": "প্রশ্নোত্তর মুছুন",
  Title: Title$1,
  Details: Details$1,
  Note: Note$1,
  Submit: Submit$1,
  Cancel: Cancel$1,
  "Delete note": "নোট মুছুন",
  Organization: Organization$1,
  Province: Province$1,
  State: State$1,
  "Postal code": "পোস্টাল কোড",
  "Delete Organization": "প্রতিষ্ঠান মুছুন",
  "Update Organization": "প্রতিষ্ঠান আপডেট করুন",
  Delete: Delete$1,
  Update: Update$1,
  Create: Create$1,
  "Create Customer": "গ্রাহক তৈরি করুন",
  "Manage Users": "ব্যবহারকারী পরিচালনা করুন",
  "Default Language": "ডিফল্ট ভাষা",
  "Email Notifications": "ইমেইল বিজ্ঞপ্তি",
  "Create ticket by new customer": "নতুন গ্রাহকের দ্বারা টিকিট তৈরি করুন",
  "Create ticket from dashboard": "ড্যাশবোর্ড থেকে টিকিট তৈরি করুন",
  "Status or priority changes": "অবস্থা বা অগ্রাধিকার পরিবর্তন",
  "Create a new user": "নতুন ব্যবহারকারী তৈরি করুন",
  "Email Template": "ইমেইল টেমপ্লেট",
  "SMTP Host": "SMTP হোস্ট",
  "SMTP Port": "SMTP পোর্ট",
  "SMTP Username": "SMTP ব্যবহারকারীর নাম",
  "SMTP Password": "SMTP পাসওয়ার্ড",
  Location: Location$1,
  "Phone number": "ফোন নম্বর",
  "Email address": "ইমেইল ঠিকানা",
  "Add New": "নতুন যোগ করুন",
  Privacy: Privacy$1,
  Company: Company$1,
  Subscribe: Subscribe$1,
  Login: Login$1,
  "Submit ticket": "টিকিট জমা দিন",
  "terms and conditions": "শর্তাবলী এবং শর্তসমূহ",
  "I agree with the": "আমি এর সাথে সম্মত",
  "Don’t have account?": "অ্যাকাউন্ট নেই?",
  "Remember Me": "আমাকে মনে রাখবেন",
  "Reset Password": "পাসওয়ার্ড পুনরায় সেট করুন",
  "Already have an account?": "ইতিমধ্যে একটি অ্যাকাউন্ট আছে?",
  "Good Morning": "সুপ্রভাত",
  "Good Noon": "শুভ মধ্যাহ্ন",
  "Good Evening": "শুভ সন্ধ্যা",
  "Good Afternoon": "শুভ অপরাহ্ন",
  Hello: Hello$1,
  "Forgot your password?": "আপনার পাসওয়ার্ড ভুলে গেছেন?",
  "Send Password Reset Link": "পাসওয়ার্ড পুনরায় সেট করার লিংক পাঠান",
  Registration: Registration$1
};
const __vite_glob_1_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Address: Address$1,
  Admin: Admin$1,
  Average: Average$1,
  Blog: Blog$1,
  Cancel: Cancel$1,
  Categories: Categories$1,
  Category: Category$1,
  Chat: Chat$1,
  City: City$1,
  Company: Company$1,
  Contact: Contact$1,
  Contacts: Contacts$1,
  Country: Country$1,
  Create: Create$1,
  Created: Created$1,
  Customer: Customer$1,
  Customers: Customers$1,
  Dashboard: Dashboard$1,
  Day: Day$1,
  Days: Days$1,
  Delete: Delete$1,
  Department: Department$1,
  Departments: Departments$1,
  Details: Details$1,
  Development: Development$1,
  Email: Email$1,
  Event: Event$1,
  FAQ: FAQ$1,
  FAQs: FAQs$1,
  Filter: Filter$1,
  Global: Global$1,
  Hardware: Hardware$1,
  Hello: Hello$1,
  Hour: Hour$1,
  Hours: Hours$1,
  Key: Key$1,
  Location: Location$1,
  Login: Login$1,
  Logout: Logout$1,
  Management: Management$1,
  Minute: Minute$1,
  Minutes: Minutes$1,
  Month: Month$1,
  Months: Months$1,
  More: More$1,
  Name: Name$1,
  Note: Note$1,
  Notes: Notes$1,
  Organization: Organization$1,
  Organizations: Organizations$1,
  Password: Password$1,
  Phone: Phone$1,
  Photo: Photo$1,
  Priorities: Priorities$1,
  Priority: Priority$1,
  Privacy: Privacy$1,
  Province: Province$1,
  Pusher: Pusher$1,
  Registration: Registration$1,
  Reset: Reset$1,
  Role: Role$1,
  Save: Save$1,
  Seconds: Seconds$1,
  Service: Service$1,
  Services: Services$1,
  Settings: Settings$1,
  Software: Software$1,
  State: State$1,
  Status: Status$1,
  Subject: Subject$1,
  Submit: Submit$1,
  Subscribe: Subscribe$1,
  Technical: Technical$1,
  Ticket: Ticket$1,
  Tickets: Tickets$1,
  Title: Title$1,
  Trashed: Trashed$1,
  Types: Types$1,
  Update: Update$1,
  Updated: Updated$1,
  Users: Users$1,
  default: bd
}, Symbol.toStringTag, { value: "Module" }));
const Dashboard = "Dashboard";
const Logout = "Logout";
const Tickets = "Tickets";
const Chat = "Chat";
const FAQs = "FAQs";
const Blog = "Blog";
const More = "More";
const Notes = "Notes";
const Contacts = "Contacts";
const Organizations = "Organizations";
const Users = "Users";
const Customers = "Customers";
const Settings = "Settings";
const Global = "Global";
const Categories = "Categories";
const Status = "Status";
const Priorities = "Priorities";
const Departments = "Departments";
const Types = "Types";
const Pusher = "Pusher";
const Contact = "Contact";
const Services = "Services";
const Filter = "Filter";
const Trashed = "Trashed";
const Reset = "Reset";
const Name = "Name";
const Email = "Email";
const Phone = "Phone";
const Country = "Country";
const City = "City";
const Address = "Address";
const Password = "Password";
const Role = "Role";
const Photo = "Photo";
const Technical = "Technical";
const Hardware = "Hardware";
const Development = "Development";
const Management = "Management";
const Admin = "Admin";
const Software = "Software";
const Service = "Service";
const Event = "Event";
const Average = "Average";
const Seconds = "Seconds";
const Month = "Month";
const Months = "Months";
const Day = "Day";
const Days = "Days";
const Hours = "Hours";
const Hour = "Hour";
const Minutes = "Minutes";
const Minute = "Minute";
const Key = "Key";
const Subject = "Subject";
const Priority = "Priority";
const Updated = "Updated";
const Customer = "Customer";
const Department = "Department";
const Category = "Category";
const Created = "Created";
const Save = "Save";
const Ticket = "Ticket";
const FAQ = "FAQ";
const Title = "Title";
const Type = "Type";
const Details = "Details";
const Note = "Note";
const Submit = "Submit";
const Cancel = "Cancel";
const Organization = "Organization";
const Province = "Province";
const State = "State";
const Delete = "Delete";
const Update = "Update";
const Create = "Create";
const Statuses = "Statuses";
const Slug = "Slug";
const Location = "Location";
const Icon = "Icon";
const Tag = "Tag";
const Privacy = "Privacy";
const Bottom = "Bottom";
const Company = "Company";
const Subscribe = "Subscribe";
const Login = "Login";
const Faqs = "Faqs";
const Active = "Active";
const Inactive = "Inactive";
const Browse = "Browse";
const Knowledge = "Knowledge";
const Languages = "Languages";
const User = "User";
const Home = "Home";
const Register = "Register";
const Newsletter = "Newsletter";
const Hello = "Hello";
const Registration = "Registration";
const en = {
  "Edit Profile": "Edit Profile",
  Dashboard,
  Logout,
  Tickets,
  Chat,
  FAQs,
  Blog,
  "Knowledge Base": "Knowledge Base",
  More,
  Notes,
  Contacts,
  Organizations,
  Users,
  Customers,
  Settings,
  Global,
  Categories,
  Status,
  Priorities,
  Departments,
  Types,
  "Email Templates": "Email Templates",
  "SMTP Mail": "SMTP Mail",
  Pusher,
  "Pusher Chat": "Pusher Chat",
  "Front Pages": "Front Pages",
  Contact,
  Services,
  "Privacy Policy": "Privacy Policy",
  "Terms of Services": "Terms of Services",
  Filter,
  Trashed,
  "Trashed With": "Trashed With",
  "Only Trashed": "Only Trashed",
  "Search...": "Search...",
  Reset,
  Name,
  Email,
  Phone,
  Country,
  "Create User": "Create User",
  "First Name": "First Name",
  "First name": "First name",
  "Last Name": "Last Name",
  "Last name": "Last name",
  City,
  Address,
  Password,
  Role,
  Photo,
  "New Tickets": "New Tickets",
  "Open Tickets": "Open Tickets",
  "Closed Tickets": "Closed Tickets",
  "Unassigned Tickets": "Unassigned Tickets",
  "Ticket by department": "Ticket by department",
  "Ticket by type": "Ticket by type",
  "Top ticket creator": "Top ticket creator",
  "Ticket history": "Ticket history",
  "First Response Time": "First Response Time",
  "Last Response Time": "Last Response Time",
  Technical,
  Hardware,
  Development,
  Management,
  Admin,
  Software,
  Service,
  Event,
  Average,
  Seconds,
  "this month": "this month",
  "last month": "last month",
  Month,
  Months,
  Day,
  Days,
  Hours,
  Hour,
  Minutes,
  Minute,
  Key,
  Subject,
  "Attach files": "Attach files",
  Priority,
  "Date": "Date",
  Updated,
  Customer,
  Department,
  "Assigned to": "Assigned to",
  "Ticket type": "Ticket type",
  Category,
  Created,
  "Request Details": "Request Details",
  "Attach File": "Attach File",
  "Delete Ticket": "Delete Ticket",
  Save,
  "Ticket discussion": "Ticket discussion",
  "Comment histories for this ticket will be available here.": "Comment histories for this ticket will be available here.",
  Ticket,
  "Comment histories": "Comment histories",
  "Comment history": "Comment history",
  "Write a comment and press enter to send...": "Write a comment and press enter to send...",
  "Click on a conversation from left to see the histories.": "Click on a conversation from left to see the histories.",
  "Type a message...": "Type a message...",
  FAQ,
  "Create Ticket": "Create Ticket",
  "New Ticket": "New Ticket",
  "Create FAQ": "Create FAQ",
  "Filter by priority": "Filter by priority",
  "Filter by status": "Filter by status",
  "Filter by role": "Filter by role",
  "Delete FAQ": "Delete FAQ",
  "Update FAQ": "Update FAQ",
  "Create Knowledge Base": "Create Knowledge Base",
  Title,
  Type,
  Details,
  "Delete knowledge base": "Delete knowledge base",
  "Update knowledge base": "Update knowledge base",
  Note,
  "No ticket found.": "No ticket found.",
  "note details here...": "note details here...",
  Submit,
  Cancel,
  "Delete note": "Delete note",
  "Create Contact": "Create Contact",
  Organization,
  "Delete Contact": "Delete Contact",
  "Update Contact": "Update Contact",
  "Create Organization": "Create Organization",
  Province,
  State,
  "Postal code": "Postal code",
  "Delete Organization": "Delete Organization",
  "Update Organization": "Update Organization",
  Delete,
  Update,
  Create,
  "Create Customer": "Create Customer",
  "Manage Users": "Manage Users",
  "Delete User": "Delete User",
  "Update User": "Update User",
  "Are you sure you want to delete this user?": "Are you sure you want to delete this user?",
  "App Name": "App Name",
  "Default Language": "Default Language",
  "Email Notifications": "Email Notifications",
  "Create ticket by new customer": "Create ticket by new customer",
  "Create ticket from dashboard": "Create ticket from dashboard",
  "Notification for the first comment": "Notification for the first comment",
  "User got assigned for a task": "User got assigned for a task",
  "Status or priority changes": "Status or priority changes",
  "Create a new user": "Create a new user",
  "Cron Job Instruction": "Cron Job Instruction",
  "If you would like to send mail without delaying you need to set a cron job for that with once per minute.": "If you would like to send mail without delaying you need to set a cron job for that with once per minute.",
  "Create Category": "Create Category",
  "Create New": "Create New",
  Statuses,
  "Create Status": "Create Status",
  Slug,
  "Create Priority": "Create Priority",
  "Create Department": "Create Department",
  "Create Type": "Create Type",
  "Email Template": "Email Template",
  "Email Html": "Email Html",
  "Update Template": "Update Template",
  "SMTP Host": "SMTP Host",
  "SMTP Port": "SMTP Port",
  "SMTP Username": "SMTP Username",
  "SMTP Password": "SMTP Password",
  "Mail Encryption": "Mail Encryption",
  "From Address": "From Address",
  "From Name": "From Name",
  "Pusher App ID": "Pusher App ID",
  "Pusher App Key": "Pusher App Key",
  "Pusher App Secret": "Pusher App Secret",
  "Pusher App Cluster": "Pusher App Cluster",
  Location,
  "Phone number": "Phone number",
  "Email address": "Email address",
  "Email Address": "Email Address",
  "Location address": "Location address",
  "Email details": "Email details",
  "Location details": "Location details",
  "Location map": "Location map",
  "Add New": "Add New",
  Icon,
  Tag,
  Privacy,
  "List information": "List information",
  Bottom,
  "List items": "List items",
  "Page Content": "Page Content",
  "Frequently Asked Questions": "Frequently Asked Questions",
  "Contact us": "Contact us",
  "Useful Link": "Useful Link",
  Company,
  Subscribe,
  Login,
  "Submit ticket": "Submit ticket",
  "Login HelpDesk": "Login HelpDesk",
  Faqs,
  "Filter Ticket By": "Filter Ticket By",
  "Assign To": "Assign To",
  "No conversation found.": "No conversation found.",
  "No faqs found.": "No faqs found.",
  "Faq Description": "Faq Description",
  Active,
  Inactive,
  Browse,
  Knowledge,
  Languages,
  User,
  "No languages found.": "No languages found.",
  "User roles": "User roles",
  "No organizations found.": "No organizations found.",
  Home,
  "Create a ticket": "Create a ticket",
  "Open a ticket": "Open a ticket",
  "Select a category": "Select a category",
  "Select a type": "Select a type",
  "Select a department": "Select a department",
  "Start Chat": "Start Chat",
  "Confirm Password": "Confirm Password",
  "No customers found.": "No customers found.",
  "No knowledge base found.": "No knowledge base found.",
  "Create Post": "Create Post",
  "Feature image": "Feature image",
  "Select type": "Select type",
  "Create a new post": "Create a new post",
  "No post base found.": "No post base found.",
  "Is Active": "Is Active",
  "All Posts": "All Posts",
  "Search your query in the FAQ items...": "Search your query in the FAQ items...",
  Register,
  "Useful Links": "Useful Links",
  Newsletter,
  "Your email address": "Your email address",
  "Join our newsletter service.": "Join our newsletter service.",
  "terms and conditions": "terms and conditions",
  "I agree with the": "I agree with the",
  "Don’t have account?": "Don’t have account?",
  "Remember Me": "Remember Me",
  "Reset Password": "Reset Password",
  "Already have an account?": "Already have an account?",
  "Good Morning": "Good Morning",
  "Good Noon": "Good Noon",
  "Good Evening": "Good Evening",
  "Good Afternoon": "Good Afternoon",
  Hello,
  "System Update": "System Update",
  "Check Update": "Check Update",
  "Forgot your password?": "Forgot your password?",
  "Send Password Reset Link": "Send Password Reset Link",
  Registration
};
const __vite_glob_1_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Active,
  Address,
  Admin,
  Average,
  Blog,
  Bottom,
  Browse,
  Cancel,
  Categories,
  Category,
  Chat,
  City,
  Company,
  Contact,
  Contacts,
  Country,
  Create,
  Created,
  Customer,
  Customers,
  Dashboard,
  Day,
  Days,
  Delete,
  Department,
  Departments,
  Details,
  Development,
  Email,
  Event,
  FAQ,
  FAQs,
  Faqs,
  Filter,
  Global,
  Hardware,
  Hello,
  Home,
  Hour,
  Hours,
  Icon,
  Inactive,
  Key,
  Knowledge,
  Languages,
  Location,
  Login,
  Logout,
  Management,
  Minute,
  Minutes,
  Month,
  Months,
  More,
  Name,
  Newsletter,
  Note,
  Notes,
  Organization,
  Organizations,
  Password,
  Phone,
  Photo,
  Priorities,
  Priority,
  Privacy,
  Province,
  Pusher,
  Register,
  Registration,
  Reset,
  Role,
  Save,
  Seconds,
  Service,
  Services,
  Settings,
  Slug,
  Software,
  State,
  Status,
  Statuses,
  Subject,
  Submit,
  Subscribe,
  Tag,
  Technical,
  Ticket,
  Tickets,
  Title,
  Trashed,
  Type,
  Types,
  Update,
  Updated,
  User,
  Users,
  default: en
}, Symbol.toStringTag, { value: "Module" }));
const php_en = {
  "auth.failed": "These credentials do not match our records.",
  "auth.password": "The provided password is incorrect.",
  "auth.throttle": "Too many login attempts. Please try again in :seconds seconds.",
  "pagination.previous": "&laquo; Previous",
  "pagination.next": "Next &raquo;",
  "passwords.reset": "Your password has been reset.",
  "passwords.sent": "We have emailed your password reset link.",
  "passwords.throttled": "Please wait before retrying.",
  "passwords.token": "This password reset token is invalid.",
  "passwords.user": "We can't find a user with that email address.",
  "validation.accepted": "The :attribute field must be accepted.",
  "validation.accepted_if": "The :attribute field must be accepted when :other is :value.",
  "validation.active_url": "The :attribute field must be a valid URL.",
  "validation.after": "The :attribute field must be a date after :date.",
  "validation.after_or_equal": "The :attribute field must be a date after or equal to :date.",
  "validation.alpha": "The :attribute field must only contain letters.",
  "validation.alpha_dash": "The :attribute field must only contain letters, numbers, dashes, and underscores.",
  "validation.alpha_num": "The :attribute field must only contain letters and numbers.",
  "validation.array": "The :attribute field must be an array.",
  "validation.ascii": "The :attribute field must only contain single-byte alphanumeric characters and symbols.",
  "validation.before": "The :attribute field must be a date before :date.",
  "validation.before_or_equal": "The :attribute field must be a date before or equal to :date.",
  "validation.between.array": "The :attribute field must have between :min and :max items.",
  "validation.between.file": "The :attribute field must be between :min and :max kilobytes.",
  "validation.between.numeric": "The :attribute field must be between :min and :max.",
  "validation.between.string": "The :attribute field must be between :min and :max characters.",
  "validation.boolean": "The :attribute field must be true or false.",
  "validation.can": "The :attribute field contains an unauthorized value.",
  "validation.confirmed": "The :attribute field confirmation does not match.",
  "validation.current_password": "The password is incorrect.",
  "validation.date": "The :attribute field must be a valid date.",
  "validation.date_equals": "The :attribute field must be a date equal to :date.",
  "validation.date_format": "The :attribute field must match the format :format.",
  "validation.decimal": "The :attribute field must have :decimal decimal places.",
  "validation.declined": "The :attribute field must be declined.",
  "validation.declined_if": "The :attribute field must be declined when :other is :value.",
  "validation.different": "The :attribute field and :other must be different.",
  "validation.digits": "The :attribute field must be :digits digits.",
  "validation.digits_between": "The :attribute field must be between :min and :max digits.",
  "validation.dimensions": "The :attribute field has invalid image dimensions.",
  "validation.distinct": "The :attribute field has a duplicate value.",
  "validation.doesnt_end_with": "The :attribute field must not end with one of the following: :values.",
  "validation.doesnt_start_with": "The :attribute field must not start with one of the following: :values.",
  "validation.email": "The :attribute field must be a valid email address.",
  "validation.ends_with": "The :attribute field must end with one of the following: :values.",
  "validation.enum": "The selected :attribute is invalid.",
  "validation.exists": "The selected :attribute is invalid.",
  "validation.extensions": "The :attribute field must have one of the following extensions: :values.",
  "validation.file": "The :attribute field must be a file.",
  "validation.filled": "The :attribute field must have a value.",
  "validation.gt.array": "The :attribute field must have more than :value items.",
  "validation.gt.file": "The :attribute field must be greater than :value kilobytes.",
  "validation.gt.numeric": "The :attribute field must be greater than :value.",
  "validation.gt.string": "The :attribute field must be greater than :value characters.",
  "validation.gte.array": "The :attribute field must have :value items or more.",
  "validation.gte.file": "The :attribute field must be greater than or equal to :value kilobytes.",
  "validation.gte.numeric": "The :attribute field must be greater than or equal to :value.",
  "validation.gte.string": "The :attribute field must be greater than or equal to :value characters.",
  "validation.hex_color": "The :attribute field must be a valid hexadecimal color.",
  "validation.image": "The :attribute field must be an image.",
  "validation.in": "The selected :attribute is invalid.",
  "validation.in_array": "The :attribute field must exist in :other.",
  "validation.integer": "The :attribute field must be an integer.",
  "validation.ip": "The :attribute field must be a valid IP address.",
  "validation.ipv4": "The :attribute field must be a valid IPv4 address.",
  "validation.ipv6": "The :attribute field must be a valid IPv6 address.",
  "validation.json": "The :attribute field must be a valid JSON string.",
  "validation.lowercase": "The :attribute field must be lowercase.",
  "validation.lt.array": "The :attribute field must have less than :value items.",
  "validation.lt.file": "The :attribute field must be less than :value kilobytes.",
  "validation.lt.numeric": "The :attribute field must be less than :value.",
  "validation.lt.string": "The :attribute field must be less than :value characters.",
  "validation.lte.array": "The :attribute field must not have more than :value items.",
  "validation.lte.file": "The :attribute field must be less than or equal to :value kilobytes.",
  "validation.lte.numeric": "The :attribute field must be less than or equal to :value.",
  "validation.lte.string": "The :attribute field must be less than or equal to :value characters.",
  "validation.mac_address": "The :attribute field must be a valid MAC address.",
  "validation.max.array": "The :attribute field must not have more than :max items.",
  "validation.max.file": "The :attribute field must not be greater than :max kilobytes.",
  "validation.max.numeric": "The :attribute field must not be greater than :max.",
  "validation.max.string": "The :attribute field must not be greater than :max characters.",
  "validation.max_digits": "The :attribute field must not have more than :max digits.",
  "validation.mimes": "The :attribute field must be a file of type: :values.",
  "validation.mimetypes": "The :attribute field must be a file of type: :values.",
  "validation.min.array": "The :attribute field must have at least :min items.",
  "validation.min.file": "The :attribute field must be at least :min kilobytes.",
  "validation.min.numeric": "The :attribute field must be at least :min.",
  "validation.min.string": "The :attribute field must be at least :min characters.",
  "validation.min_digits": "The :attribute field must have at least :min digits.",
  "validation.missing": "The :attribute field must be missing.",
  "validation.missing_if": "The :attribute field must be missing when :other is :value.",
  "validation.missing_unless": "The :attribute field must be missing unless :other is :value.",
  "validation.missing_with": "The :attribute field must be missing when :values is present.",
  "validation.missing_with_all": "The :attribute field must be missing when :values are present.",
  "validation.multiple_of": "The :attribute field must be a multiple of :value.",
  "validation.not_in": "The selected :attribute is invalid.",
  "validation.not_regex": "The :attribute field format is invalid.",
  "validation.numeric": "The :attribute field must be a number.",
  "validation.password.letters": "The :attribute field must contain at least one letter.",
  "validation.password.mixed": "The :attribute field must contain at least one uppercase and one lowercase letter.",
  "validation.password.numbers": "The :attribute field must contain at least one number.",
  "validation.password.symbols": "The :attribute field must contain at least one symbol.",
  "validation.password.uncompromised": "The given :attribute has appeared in a data leak. Please choose a different :attribute.",
  "validation.present": "The :attribute field must be present.",
  "validation.present_if": "The :attribute field must be present when :other is :value.",
  "validation.present_unless": "The :attribute field must be present unless :other is :value.",
  "validation.present_with": "The :attribute field must be present when :values is present.",
  "validation.present_with_all": "The :attribute field must be present when :values are present.",
  "validation.prohibited": "The :attribute field is prohibited.",
  "validation.prohibited_if": "The :attribute field is prohibited when :other is :value.",
  "validation.prohibited_unless": "The :attribute field is prohibited unless :other is in :values.",
  "validation.prohibits": "The :attribute field prohibits :other from being present.",
  "validation.regex": "The :attribute field format is invalid.",
  "validation.required": "The :attribute field is required.",
  "validation.required_array_keys": "The :attribute field must contain entries for: :values.",
  "validation.required_if": "The :attribute field is required when :other is :value.",
  "validation.required_if_accepted": "The :attribute field is required when :other is accepted.",
  "validation.required_unless": "The :attribute field is required unless :other is in :values.",
  "validation.required_with": "The :attribute field is required when :values is present.",
  "validation.required_with_all": "The :attribute field is required when :values are present.",
  "validation.required_without": "The :attribute field is required when :values is not present.",
  "validation.required_without_all": "The :attribute field is required when none of :values are present.",
  "validation.same": "The :attribute field must match :other.",
  "validation.size.array": "The :attribute field must contain :size items.",
  "validation.size.file": "The :attribute field must be :size kilobytes.",
  "validation.size.numeric": "The :attribute field must be :size.",
  "validation.size.string": "The :attribute field must be :size characters.",
  "validation.starts_with": "The :attribute field must start with one of the following: :values.",
  "validation.string": "The :attribute field must be a string.",
  "validation.timezone": "The :attribute field must be a valid timezone.",
  "validation.unique": "The :attribute has already been taken.",
  "validation.uploaded": "The :attribute failed to upload.",
  "validation.uppercase": "The :attribute field must be uppercase.",
  "validation.url": "The :attribute field must be a valid URL.",
  "validation.ulid": "The :attribute field must be a valid ULID.",
  "validation.uuid": "The :attribute field must be a valid UUID.",
  "validation.custom.attribute-name.rule-name": "custom-message"
};
const __vite_glob_1_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: php_en
}, Symbol.toStringTag, { value: "Module" }));
async function resolvePageComponent(path, pages) {
  for (const p2 of Array.isArray(path) ? path : [path]) {
    const page = pages[p2];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
function t() {
  return t = Object.assign ? Object.assign.bind() : function(t4) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var r2 = arguments[e2];
      for (var n2 in r2) ({}).hasOwnProperty.call(r2, n2) && (t4[n2] = r2[n2]);
    }
    return t4;
  }, t.apply(null, arguments);
}
var e = String.prototype.replace, r = /%20/g, n = "RFC3986", o = { default: n, formatters: { RFC1738: function(t4) {
  return e.call(t4, r, "+");
}, RFC3986: function(t4) {
  return String(t4);
} }, RFC1738: "RFC1738" }, i = Object.prototype.hasOwnProperty, u = Array.isArray, a = function() {
  for (var t4 = [], e2 = 0; e2 < 256; ++e2) t4.push("%" + ((e2 < 16 ? "0" : "") + e2.toString(16)).toUpperCase());
  return t4;
}(), s = function(t4, e2) {
  for (var r2 = e2 && e2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, n2 = 0; n2 < t4.length; ++n2) void 0 !== t4[n2] && (r2[n2] = t4[n2]);
  return r2;
}, f = { arrayToObject: s, assign: function(t4, e2) {
  return Object.keys(e2).reduce(function(t5, r2) {
    return t5[r2] = e2[r2], t5;
  }, t4);
}, combine: function(t4, e2) {
  return [].concat(t4, e2);
}, compact: function(t4) {
  for (var e2 = [{ obj: { o: t4 }, prop: "o" }], r2 = [], n2 = 0; n2 < e2.length; ++n2) for (var o2 = e2[n2], i2 = o2.obj[o2.prop], a2 = Object.keys(i2), s2 = 0; s2 < a2.length; ++s2) {
    var f2 = a2[s2], c2 = i2[f2];
    "object" == typeof c2 && null !== c2 && -1 === r2.indexOf(c2) && (e2.push({ obj: i2, prop: f2 }), r2.push(c2));
  }
  return function(t5) {
    for (; t5.length > 1; ) {
      var e3 = t5.pop(), r3 = e3.obj[e3.prop];
      if (u(r3)) {
        for (var n3 = [], o3 = 0; o3 < r3.length; ++o3) void 0 !== r3[o3] && n3.push(r3[o3]);
        e3.obj[e3.prop] = n3;
      }
    }
  }(e2), t4;
}, decode: function(t4, e2, r2) {
  var n2 = t4.replace(/\+/g, " ");
  if ("iso-8859-1" === r2) return n2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n2);
  } catch (t5) {
    return n2;
  }
}, encode: function(t4, e2, r2, n2, i2) {
  if (0 === t4.length) return t4;
  var u2 = t4;
  if ("symbol" == typeof t4 ? u2 = Symbol.prototype.toString.call(t4) : "string" != typeof t4 && (u2 = String(t4)), "iso-8859-1" === r2) return escape(u2).replace(/%u[0-9a-f]{4}/gi, function(t5) {
    return "%26%23" + parseInt(t5.slice(2), 16) + "%3B";
  });
  for (var s2 = "", f2 = 0; f2 < u2.length; ++f2) {
    var c2 = u2.charCodeAt(f2);
    45 === c2 || 46 === c2 || 95 === c2 || 126 === c2 || c2 >= 48 && c2 <= 57 || c2 >= 65 && c2 <= 90 || c2 >= 97 && c2 <= 122 || i2 === o.RFC1738 && (40 === c2 || 41 === c2) ? s2 += u2.charAt(f2) : c2 < 128 ? s2 += a[c2] : c2 < 2048 ? s2 += a[192 | c2 >> 6] + a[128 | 63 & c2] : c2 < 55296 || c2 >= 57344 ? s2 += a[224 | c2 >> 12] + a[128 | c2 >> 6 & 63] + a[128 | 63 & c2] : (c2 = 65536 + ((1023 & c2) << 10 | 1023 & u2.charCodeAt(f2 += 1)), s2 += a[240 | c2 >> 18] + a[128 | c2 >> 12 & 63] + a[128 | c2 >> 6 & 63] + a[128 | 63 & c2]);
  }
  return s2;
}, isBuffer: function(t4) {
  return !(!t4 || "object" != typeof t4 || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
}, isRegExp: function(t4) {
  return "[object RegExp]" === Object.prototype.toString.call(t4);
}, maybeMap: function(t4, e2) {
  if (u(t4)) {
    for (var r2 = [], n2 = 0; n2 < t4.length; n2 += 1) r2.push(e2(t4[n2]));
    return r2;
  }
  return e2(t4);
}, merge: function t2(e2, r2, n2) {
  if (!r2) return e2;
  if ("object" != typeof r2) {
    if (u(e2)) e2.push(r2);
    else {
      if (!e2 || "object" != typeof e2) return [e2, r2];
      (n2 && (n2.plainObjects || n2.allowPrototypes) || !i.call(Object.prototype, r2)) && (e2[r2] = true);
    }
    return e2;
  }
  if (!e2 || "object" != typeof e2) return [e2].concat(r2);
  var o2 = e2;
  return u(e2) && !u(r2) && (o2 = s(e2, n2)), u(e2) && u(r2) ? (r2.forEach(function(r3, o3) {
    if (i.call(e2, o3)) {
      var u2 = e2[o3];
      u2 && "object" == typeof u2 && r3 && "object" == typeof r3 ? e2[o3] = t2(u2, r3, n2) : e2.push(r3);
    } else e2[o3] = r3;
  }), e2) : Object.keys(r2).reduce(function(e3, o3) {
    var u2 = r2[o3];
    return e3[o3] = i.call(e3, o3) ? t2(e3[o3], u2, n2) : u2, e3;
  }, o2);
} }, c = Object.prototype.hasOwnProperty, l = { brackets: function(t4) {
  return t4 + "[]";
}, comma: "comma", indices: function(t4, e2) {
  return t4 + "[" + e2 + "]";
}, repeat: function(t4) {
  return t4;
} }, p = Array.isArray, h = String.prototype.split, y = Array.prototype.push, d = function(t4, e2) {
  y.apply(t4, p(e2) ? e2 : [e2]);
}, g = Date.prototype.toISOString, b = o.default, v = { addQueryPrefix: false, allowDots: false, charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encoder: f.encode, encodeValuesOnly: false, format: b, formatter: o.formatters[b], indices: false, serializeDate: function(t4) {
  return g.call(t4);
}, skipNulls: false, strictNullHandling: false }, m = function t3(e2, r2, n2, o2, i2, u2, a2, s2, c2, l2, y2, g2, b2, m2) {
  var j2, w2 = e2;
  if ("function" == typeof a2 ? w2 = a2(r2, w2) : w2 instanceof Date ? w2 = l2(w2) : "comma" === n2 && p(w2) && (w2 = f.maybeMap(w2, function(t4) {
    return t4 instanceof Date ? l2(t4) : t4;
  })), null === w2) {
    if (o2) return u2 && !b2 ? u2(r2, v.encoder, m2, "key", y2) : r2;
    w2 = "";
  }
  if ("string" == typeof (j2 = w2) || "number" == typeof j2 || "boolean" == typeof j2 || "symbol" == typeof j2 || "bigint" == typeof j2 || f.isBuffer(w2)) {
    if (u2) {
      var $2 = b2 ? r2 : u2(r2, v.encoder, m2, "key", y2);
      if ("comma" === n2 && b2) {
        for (var O2 = h.call(String(w2), ","), E2 = "", R2 = 0; R2 < O2.length; ++R2) E2 += (0 === R2 ? "" : ",") + g2(u2(O2[R2], v.encoder, m2, "value", y2));
        return [g2($2) + "=" + E2];
      }
      return [g2($2) + "=" + g2(u2(w2, v.encoder, m2, "value", y2))];
    }
    return [g2(r2) + "=" + g2(String(w2))];
  }
  var S2, x2 = [];
  if (void 0 === w2) return x2;
  if ("comma" === n2 && p(w2)) S2 = [{ value: w2.length > 0 ? w2.join(",") || null : void 0 }];
  else if (p(a2)) S2 = a2;
  else {
    var N2 = Object.keys(w2);
    S2 = s2 ? N2.sort(s2) : N2;
  }
  for (var T2 = 0; T2 < S2.length; ++T2) {
    var k2 = S2[T2], C = "object" == typeof k2 && void 0 !== k2.value ? k2.value : w2[k2];
    if (!i2 || null !== C) {
      var _ = p(w2) ? "function" == typeof n2 ? n2(r2, k2) : r2 : r2 + (c2 ? "." + k2 : "[" + k2 + "]");
      d(x2, t3(C, _, n2, o2, i2, u2, a2, s2, c2, l2, y2, g2, b2, m2));
    }
  }
  return x2;
}, j = Object.prototype.hasOwnProperty, w = Array.isArray, $ = { allowDots: false, allowPrototypes: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decoder: f.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, O = function(t4) {
  return t4.replace(/&#(\d+);/g, function(t5, e2) {
    return String.fromCharCode(parseInt(e2, 10));
  });
}, E = function(t4, e2) {
  return t4 && "string" == typeof t4 && e2.comma && t4.indexOf(",") > -1 ? t4.split(",") : t4;
}, R = function(t4, e2, r2, n2) {
  if (t4) {
    var o2 = r2.allowDots ? t4.replace(/\.([^.[]+)/g, "[$1]") : t4, i2 = /(\[[^[\]]*])/g, u2 = r2.depth > 0 && /(\[[^[\]]*])/.exec(o2), a2 = u2 ? o2.slice(0, u2.index) : o2, s2 = [];
    if (a2) {
      if (!r2.plainObjects && j.call(Object.prototype, a2) && !r2.allowPrototypes) return;
      s2.push(a2);
    }
    for (var f2 = 0; r2.depth > 0 && null !== (u2 = i2.exec(o2)) && f2 < r2.depth; ) {
      if (f2 += 1, !r2.plainObjects && j.call(Object.prototype, u2[1].slice(1, -1)) && !r2.allowPrototypes) return;
      s2.push(u2[1]);
    }
    return u2 && s2.push("[" + o2.slice(u2.index) + "]"), function(t5, e3, r3, n3) {
      for (var o3 = n3 ? e3 : E(e3, r3), i3 = t5.length - 1; i3 >= 0; --i3) {
        var u3, a3 = t5[i3];
        if ("[]" === a3 && r3.parseArrays) u3 = [].concat(o3);
        else {
          u3 = r3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var s3 = "[" === a3.charAt(0) && "]" === a3.charAt(a3.length - 1) ? a3.slice(1, -1) : a3, f3 = parseInt(s3, 10);
          r3.parseArrays || "" !== s3 ? !isNaN(f3) && a3 !== s3 && String(f3) === s3 && f3 >= 0 && r3.parseArrays && f3 <= r3.arrayLimit ? (u3 = [])[f3] = o3 : "__proto__" !== s3 && (u3[s3] = o3) : u3 = { 0: o3 };
        }
        o3 = u3;
      }
      return o3;
    }(s2, e2, r2, n2);
  }
}, S = function(t4, e2) {
  var r2 = /* @__PURE__ */ function(t5) {
    return $;
  }();
  if ("" === t4 || null == t4) return r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var n2 = "string" == typeof t4 ? function(t5, e3) {
    var r3, n3 = {}, o3 = (e3.ignoreQueryPrefix ? t5.replace(/^\?/, "") : t5).split(e3.delimiter, Infinity === e3.parameterLimit ? void 0 : e3.parameterLimit), i3 = -1, u3 = e3.charset;
    if (e3.charsetSentinel) for (r3 = 0; r3 < o3.length; ++r3) 0 === o3[r3].indexOf("utf8=") && ("utf8=%E2%9C%93" === o3[r3] ? u3 = "utf-8" : "utf8=%26%2310003%3B" === o3[r3] && (u3 = "iso-8859-1"), i3 = r3, r3 = o3.length);
    for (r3 = 0; r3 < o3.length; ++r3) if (r3 !== i3) {
      var a3, s3, c2 = o3[r3], l2 = c2.indexOf("]="), p2 = -1 === l2 ? c2.indexOf("=") : l2 + 1;
      -1 === p2 ? (a3 = e3.decoder(c2, $.decoder, u3, "key"), s3 = e3.strictNullHandling ? null : "") : (a3 = e3.decoder(c2.slice(0, p2), $.decoder, u3, "key"), s3 = f.maybeMap(E(c2.slice(p2 + 1), e3), function(t6) {
        return e3.decoder(t6, $.decoder, u3, "value");
      })), s3 && e3.interpretNumericEntities && "iso-8859-1" === u3 && (s3 = O(s3)), c2.indexOf("[]=") > -1 && (s3 = w(s3) ? [s3] : s3), n3[a3] = j.call(n3, a3) ? f.combine(n3[a3], s3) : s3;
    }
    return n3;
  }(t4, r2) : t4, o2 = r2.plainObjects ? /* @__PURE__ */ Object.create(null) : {}, i2 = Object.keys(n2), u2 = 0; u2 < i2.length; ++u2) {
    var a2 = i2[u2], s2 = R(a2, n2[a2], r2, "string" == typeof t4);
    o2 = f.merge(o2, s2, r2);
  }
  return f.compact(o2);
};
class x {
  constructor(t4, e2, r2) {
    var n2, o2;
    this.name = t4, this.definition = e2, this.bindings = null != (n2 = e2.bindings) ? n2 : {}, this.wheres = null != (o2 = e2.wheres) ? o2 : {}, this.config = r2;
  }
  get template() {
    const t4 = `${this.origin}/${this.definition.uri}`.replace(/\/+$/, "");
    return "" === t4 ? "/" : t4;
  }
  get origin() {
    return this.config.absolute ? this.definition.domain ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ""}` : this.config.url : "";
  }
  get parameterSegments() {
    var t4, e2;
    return null != (t4 = null == (e2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : e2.map((t5) => ({ name: t5.replace(/{|\??}/g, ""), required: !/\?}$/.test(t5) }))) ? t4 : [];
  }
  matchesUrl(t4) {
    var e2;
    if (!this.definition.methods.includes("GET")) return false;
    const r2 = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, (t5, e3, r3, n3) => {
      var o3;
      const i3 = `(?<${r3}>${(null == (o3 = this.wheres[r3]) ? void 0 : o3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+"})`;
      return n3 ? `(${e3}${i3})?` : `${e3}${i3}`;
    }).replace(/^\w+:\/\//, ""), [n2, o2] = t4.replace(/^\w+:\/\//, "").split("?"), i2 = null != (e2 = new RegExp(`^${r2}/?$`).exec(n2)) ? e2 : new RegExp(`^${r2}/?$`).exec(decodeURI(n2));
    if (i2) {
      for (const t5 in i2.groups) i2.groups[t5] = "string" == typeof i2.groups[t5] ? decodeURIComponent(i2.groups[t5]) : i2.groups[t5];
      return { params: i2.groups, query: S(o2) };
    }
    return false;
  }
  compile(t4) {
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, (e2, r2, n2) => {
      var o2, i2;
      if (!n2 && [null, void 0].includes(t4[r2])) throw new Error(`Ziggy error: '${r2}' parameter is required for route '${this.name}'.`);
      if (this.wheres[r2] && !new RegExp(`^${n2 ? `(${this.wheres[r2]})?` : this.wheres[r2]}$`).test(null != (i2 = t4[r2]) ? i2 : "")) throw new Error(`Ziggy error: '${r2}' parameter '${t4[r2]}' does not match required format '${this.wheres[r2]}' for route '${this.name}'.`);
      return encodeURI(null != (o2 = t4[r2]) ? o2 : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template;
  }
}
class N extends String {
  constructor(e2, r2, n2 = true, o2) {
    if (super(), this.t = null != o2 ? o2 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, this.t = t({}, this.t, { absolute: n2 }), e2) {
      if (!this.t.routes[e2]) throw new Error(`Ziggy error: route '${e2}' is not in the route list.`);
      this.i = new x(e2, this.t.routes[e2], this.t), this.u = this.l(r2);
    }
  }
  toString() {
    const e2 = Object.keys(this.u).filter((t4) => !this.i.parameterSegments.some(({ name: e3 }) => e3 === t4)).filter((t4) => "_query" !== t4).reduce((e3, r2) => t({}, e3, { [r2]: this.u[r2] }), {});
    return this.i.compile(this.u) + function(t4, e3) {
      var r2, n2 = t4, i2 = function(t5) {
        if (!t5) return v;
        if (null != t5.encoder && "function" != typeof t5.encoder) throw new TypeError("Encoder has to be a function.");
        var e4 = t5.charset || v.charset;
        if (void 0 !== t5.charset && "utf-8" !== t5.charset && "iso-8859-1" !== t5.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        var r3 = o.default;
        if (void 0 !== t5.format) {
          if (!c.call(o.formatters, t5.format)) throw new TypeError("Unknown format option provided.");
          r3 = t5.format;
        }
        var n3 = o.formatters[r3], i3 = v.filter;
        return ("function" == typeof t5.filter || p(t5.filter)) && (i3 = t5.filter), { addQueryPrefix: "boolean" == typeof t5.addQueryPrefix ? t5.addQueryPrefix : v.addQueryPrefix, allowDots: void 0 === t5.allowDots ? v.allowDots : !!t5.allowDots, charset: e4, charsetSentinel: "boolean" == typeof t5.charsetSentinel ? t5.charsetSentinel : v.charsetSentinel, delimiter: void 0 === t5.delimiter ? v.delimiter : t5.delimiter, encode: "boolean" == typeof t5.encode ? t5.encode : v.encode, encoder: "function" == typeof t5.encoder ? t5.encoder : v.encoder, encodeValuesOnly: "boolean" == typeof t5.encodeValuesOnly ? t5.encodeValuesOnly : v.encodeValuesOnly, filter: i3, format: r3, formatter: n3, serializeDate: "function" == typeof t5.serializeDate ? t5.serializeDate : v.serializeDate, skipNulls: "boolean" == typeof t5.skipNulls ? t5.skipNulls : v.skipNulls, sort: "function" == typeof t5.sort ? t5.sort : null, strictNullHandling: "boolean" == typeof t5.strictNullHandling ? t5.strictNullHandling : v.strictNullHandling };
      }(e3);
      "function" == typeof i2.filter ? n2 = (0, i2.filter)("", n2) : p(i2.filter) && (r2 = i2.filter);
      var u2 = [];
      if ("object" != typeof n2 || null === n2) return "";
      var a2 = l[e3 && e3.arrayFormat in l ? e3.arrayFormat : e3 && "indices" in e3 ? e3.indices ? "indices" : "repeat" : "indices"];
      r2 || (r2 = Object.keys(n2)), i2.sort && r2.sort(i2.sort);
      for (var s2 = 0; s2 < r2.length; ++s2) {
        var f2 = r2[s2];
        i2.skipNulls && null === n2[f2] || d(u2, m(n2[f2], f2, a2, i2.strictNullHandling, i2.skipNulls, i2.encode ? i2.encoder : null, i2.filter, i2.sort, i2.allowDots, i2.serializeDate, i2.format, i2.formatter, i2.encodeValuesOnly, i2.charset));
      }
      var h2 = u2.join(i2.delimiter), y2 = true === i2.addQueryPrefix ? "?" : "";
      return i2.charsetSentinel && (y2 += "iso-8859-1" === i2.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), h2.length > 0 ? y2 + h2 : "";
    }(t({}, e2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: (t4, e3) => "boolean" == typeof t4 ? Number(t4) : e3(t4) });
  }
  p(e2) {
    e2 ? this.t.absolute && e2.startsWith("/") && (e2 = this.h().host + e2) : e2 = this.v();
    let r2 = {};
    const [n2, o2] = Object.entries(this.t.routes).find(([t4, n3]) => r2 = new x(t4, n3, this.t).matchesUrl(e2)) || [void 0, void 0];
    return t({ name: n2 }, r2, { route: o2 });
  }
  v() {
    const { host: t4, pathname: e2, search: r2 } = this.h();
    return (this.t.absolute ? t4 + e2 : e2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + r2;
  }
  current(e2, r2) {
    const { name: n2, params: o2, query: i2, route: u2 } = this.p();
    if (!e2) return n2;
    const a2 = new RegExp(`^${e2.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`).test(n2);
    if ([null, void 0].includes(r2) || !a2) return a2;
    const s2 = new x(n2, u2, this.t);
    r2 = this.l(r2, s2);
    const f2 = t({}, o2, i2);
    if (Object.values(r2).every((t4) => !t4) && !Object.values(f2).some((t4) => void 0 !== t4)) return true;
    const c2 = (t4, e3) => Object.entries(t4).every(([t5, r3]) => Array.isArray(r3) && Array.isArray(e3[t5]) ? r3.every((r4) => e3[t5].includes(r4)) : "object" == typeof r3 && "object" == typeof e3[t5] && null !== r3 && null !== e3[t5] ? c2(r3, e3[t5]) : e3[t5] == r3);
    return c2(r2, f2);
  }
  h() {
    var t4, e2, r2, n2, o2, i2;
    const { host: u2 = "", pathname: a2 = "", search: s2 = "" } = "undefined" != typeof window ? window.location : {};
    return { host: null != (t4 = null == (e2 = this.t.location) ? void 0 : e2.host) ? t4 : u2, pathname: null != (r2 = null == (n2 = this.t.location) ? void 0 : n2.pathname) ? r2 : a2, search: null != (o2 = null == (i2 = this.t.location) ? void 0 : i2.search) ? o2 : s2 };
  }
  get params() {
    const { params: e2, query: r2 } = this.p();
    return t({}, e2, r2);
  }
  get routeParams() {
    return this.p().params;
  }
  get queryParams() {
    return this.p().query;
  }
  has(t4) {
    return this.t.routes.hasOwnProperty(t4);
  }
  l(e2 = {}, r2 = this.i) {
    null != e2 || (e2 = {}), e2 = ["string", "number"].includes(typeof e2) ? [e2] : e2;
    const n2 = r2.parameterSegments.filter(({ name: t4 }) => !this.t.defaults[t4]);
    return Array.isArray(e2) ? e2 = e2.reduce((e3, r3, o2) => t({}, e3, n2[o2] ? { [n2[o2].name]: r3 } : "object" == typeof r3 ? r3 : { [r3]: "" }), {}) : 1 !== n2.length || e2[n2[0].name] || !e2.hasOwnProperty(Object.values(r2.bindings)[0]) && !e2.hasOwnProperty("id") || (e2 = { [n2[0].name]: e2 }), t({}, this.m(r2), this.j(e2, r2));
  }
  m(e2) {
    return e2.parameterSegments.filter(({ name: t4 }) => this.t.defaults[t4]).reduce((e3, { name: r2 }, n2) => t({}, e3, { [r2]: this.t.defaults[r2] }), {});
  }
  j(e2, { bindings: r2, parameterSegments: n2 }) {
    return Object.entries(e2).reduce((e3, [o2, i2]) => {
      if (!i2 || "object" != typeof i2 || Array.isArray(i2) || !n2.some(({ name: t4 }) => t4 === o2)) return t({}, e3, { [o2]: i2 });
      if (!i2.hasOwnProperty(r2[o2])) {
        if (!i2.hasOwnProperty("id")) throw new Error(`Ziggy error: object passed as '${o2}' parameter is missing route model binding key '${r2[o2]}'.`);
        r2[o2] = "id";
      }
      return t({}, e3, { [o2]: i2[r2[o2]] });
    }, {});
  }
  valueOf() {
    return this.toString();
  }
}
function T(t4, e2, r2, n2) {
  const o2 = new N(t4, e2, r2, n2);
  return t4 ? o2.toString() : o2;
}
const k = { install(t4, e2) {
  const r2 = (t5, r3, n2, o2 = e2) => T(t5, r3, n2, o2);
  parseInt(t4.version) > 2 ? (t4.config.globalProperties.route = r2, t4.provide("route", r2)) : t4.mixin({ methods: { route: r2 } });
} };
const appName = "HelpDesk";
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, /* @__PURE__ */ Object.assign({ "./Pages/Auth/ForgotPassword.vue": () => import("./assets/ForgotPassword-DLBq96yT.js"), "./Pages/Auth/ForgotPasswordInput.vue": () => import("./assets/ForgotPasswordInput-Xjb-YX6Z.js"), "./Pages/Auth/Login.vue": () => import("./assets/Login-BzDLLOIk.js"), "./Pages/Auth/Register.vue": () => import("./assets/Register-RDi0WpGu.js"), "./Pages/Blank.vue": () => import("./assets/Blank-Bi6sysSr.js"), "./Pages/Blogs/ByCategory.vue": () => import("./assets/ByCategory-DBcoxEaf.js"), "./Pages/Blogs/Create.vue": () => import("./assets/Create-BQdHER5T.js"), "./Pages/Blogs/Edit.vue": () => import("./assets/Edit-CCY2UaBH.js"), "./Pages/Blogs/Index.vue": () => import("./assets/Index-CrHHB4Ok.js"), "./Pages/Categories/Create.vue": () => import("./assets/Create-DB9WImZj.js"), "./Pages/Categories/Edit.vue": () => import("./assets/Edit-CFgxRGpw.js"), "./Pages/Categories/Index.vue": () => import("./assets/Index-D1sbZkhv.js"), "./Pages/Chat/Index.vue": () => import("./assets/Index-CFo2KbyB.js"), "./Pages/Cities/Create.vue": () => import("./assets/Create-fA-4Ck07.js"), "./Pages/Cities/Edit.vue": () => import("./assets/Edit-ZE3n7tNv.js"), "./Pages/Cities/Index.vue": () => import("./assets/Index-pSmU4GeD.js"), "./Pages/Contacts/Create.vue": () => import("./assets/Create-BSZbwTzq.js"), "./Pages/Contacts/Edit.vue": () => import("./assets/Edit-BdoRENa0.js"), "./Pages/Contacts/Index.vue": () => import("./assets/Index-DuzevBmE.js"), "./Pages/Customers/Create.vue": () => import("./assets/Create-CyzUDZS9.js"), "./Pages/Customers/Edit.vue": () => import("./assets/Edit-Cud02EUP.js"), "./Pages/Customers/Index.vue": () => import("./assets/Index-ANeudAbt.js"), "./Pages/Dashboard/Index.vue": () => import("./assets/Index-De8Jv8R7.js"), "./Pages/DepartmentalTeams/Index.vue": () => import("./assets/Index-T9wmgvvS.js"), "./Pages/Departments/Create.vue": () => import("./assets/Create-DopQjoFA.js"), "./Pages/Departments/Edit.vue": () => import("./assets/Edit-BMbEXmG0.js"), "./Pages/Departments/Index.vue": () => import("./assets/Index-CUYNnxuL.js"), "./Pages/EmailTemplates/Edit.vue": () => import("./assets/Edit-CP9PoGZD.js"), "./Pages/EmailTemplates/Index.vue": () => import("./assets/Index-BgIUrHdR.js"), "./Pages/Error.vue": () => import("./assets/Error-Bka7ChsF.js"), "./Pages/Faqs/Create.vue": () => import("./assets/Create-B4kbH_Tp.js"), "./Pages/Faqs/Edit.vue": () => import("./assets/Edit-Bgr25Zth.js"), "./Pages/Faqs/Index.vue": () => import("./assets/Index-BSWn2I1f.js"), "./Pages/Faqs/Site.vue": () => import("./assets/Site-oenVcrvt.js"), "./Pages/FrontPages/Contact.vue": () => import("./assets/Contact-CPpsxGbD.js"), "./Pages/FrontPages/Footer.vue": () => import("./assets/Footer-BTTgfHnr.js"), "./Pages/FrontPages/Home.vue": () => import("./assets/Home-BPs6-kJR.js"), "./Pages/FrontPages/PrivacyPolicy.vue": () => import("./assets/PrivacyPolicy-CcLoOrlD.js"), "./Pages/FrontPages/Services.vue": () => import("./assets/Services-DqcEyRWR.js"), "./Pages/FrontPages/TermsOfServices.vue": () => import("./assets/TermsOfServices-BU0NORS_.js"), "./Pages/KnowledgeBase/Create.vue": () => import("./assets/Create-rG8_s1lK.js"), "./Pages/KnowledgeBase/Det.vue": () => import("./assets/Det-DQQ6Vv_9.js"), "./Pages/KnowledgeBase/Edit.vue": () => import("./assets/Edit-C9UYrf-Y.js"), "./Pages/KnowledgeBase/Index.vue": () => import("./assets/Index-CUJVmUXO.js"), "./Pages/Landing/Blog/ByType.vue": () => import("./assets/ByType-DtrxvQxH.js"), "./Pages/Landing/Blog/Details.vue": () => import("./assets/Details-B1L2-J06.js"), "./Pages/Landing/Blog/Index.vue": () => import("./assets/Index-CVB9eASp.js"), "./Pages/Landing/Contact.vue": () => import("./assets/Contact-6NAD7uU8.js"), "./Pages/Landing/FAQ.vue": () => import("./assets/FAQ-Dn24KY0s.js"), "./Pages/Landing/Home.vue": () => import("./assets/Home-BAbo04fd.js"), "./Pages/Landing/KnowledgeBase/ByType.vue": () => import("./assets/ByType-D0YOFe5G.js"), "./Pages/Landing/KnowledgeBase/Details.vue": () => import("./assets/Details-Cz9J5cYN.js"), "./Pages/Landing/KnowledgeBase/Index.vue": () => import("./assets/Index-C7CIpbRN.js"), "./Pages/Landing/OpenTicket.vue": () => import("./assets/OpenTicket-hhWlhBUQ.js"), "./Pages/Landing/PrivacyPolicy.vue": () => import("./assets/PrivacyPolicy-CQaK20rM.js"), "./Pages/Landing/Services.vue": () => import("./assets/Services-JbQEfKr9.js"), "./Pages/Landing/TermsOfServices.vue": () => import("./assets/TermsOfServices-BO5j_OwE.js"), "./Pages/Languages/Create.vue": () => import("./assets/Create-Cna9tU9T.js"), "./Pages/Languages/Edit.vue": () => import("./assets/Edit-BVV5FTHm.js"), "./Pages/Languages/Index.vue": () => import("./assets/Index-B-zFqVLe.js"), "./Pages/License/Activate.vue": () => import("./assets/Activate-OCZfXM7N.js"), "./Pages/License/Settings.vue": () => import("./assets/Settings-2HisccuU.js"), "./Pages/Notes/Index.vue": () => import("./assets/Index-BbFCsU9Z.js"), "./Pages/Notifications/Index.vue": () => import("./assets/Index-CXb4tN8a.js"), "./Pages/Organizations/Create.vue": () => import("./assets/Create-BKdYaPrt.js"), "./Pages/Organizations/Edit.vue": () => import("./assets/Edit-DeKh__xv.js"), "./Pages/Organizations/Index.vue": () => import("./assets/Index-BospN9R4.js"), "./Pages/PendingUsers/Index.vue": () => import("./assets/Index-Dz_GQMFk.js"), "./Pages/Priorities/Create.vue": () => import("./assets/Create-GMdHHq1M.js"), "./Pages/Priorities/Edit.vue": () => import("./assets/Edit-Bst8kktS.js"), "./Pages/Priorities/Index.vue": () => import("./assets/Index-Cidk974v.js"), "./Pages/Reports/Index.vue": () => import("./assets/Index-B9cj1Kax.js"), "./Pages/Roles/Create.vue": () => import("./assets/Create-n2fpvOdq.js"), "./Pages/Roles/Edit.vue": () => import("./assets/Edit-DTijEBj0.js"), "./Pages/Roles/Index.vue": () => import("./assets/Index-DEfkcTEu.js"), "./Pages/Settings/Index.vue": () => import("./assets/Index-Cd4qbVoj.js"), "./Pages/Settings/Piping.vue": () => import("./assets/Piping-Cv-QTyP1.js"), "./Pages/Settings/Pusher.vue": () => import("./assets/Pusher-BpEnHkxW.js"), "./Pages/Settings/Smtp.vue": () => import("./assets/Smtp-DXiP30UX.js"), "./Pages/Settings/Update.vue": () => import("./assets/Update-DpZoZGdw.js"), "./Pages/Statuses/Create.vue": () => import("./assets/Create-CToH47zC.js"), "./Pages/Statuses/Edit.vue": () => import("./assets/Edit-CPCpX05I.js"), "./Pages/Statuses/Index.vue": () => import("./assets/Index-jvvo3NUU.js"), "./Pages/Tickets/Create.vue": () => import("./assets/Create-BtSJ9xyY.js"), "./Pages/Tickets/Edit.vue": () => import("./assets/Edit-D62nWWx1.js"), "./Pages/Tickets/Index.vue": () => import("./assets/Index-BRUoXMtD.js"), "./Pages/Tickets/builder.vue": () => import("./assets/builder-wYghVRGX.js"), "./Pages/Types/Create.vue": () => import("./assets/Create-B9a1vTWd.js"), "./Pages/Types/Edit.vue": () => import("./assets/Edit-DOO8BE47.js"), "./Pages/Types/Index.vue": () => import("./assets/Index-DEZnL4VD.js"), "./Pages/UserNotifications/Create.vue": () => import("./assets/Create-BvWT9Erp.js"), "./Pages/UserNotifications/Edit.vue": () => import("./assets/Edit-DJYUSxSC.js"), "./Pages/UserNotifications/Index.vue": () => import("./assets/Index-CyaF6Lhc.js"), "./Pages/Users/Create.vue": () => import("./assets/Create-Bs_B9Zy5.js"), "./Pages/Users/Edit.vue": () => import("./assets/Edit-iqr2GCE2.js"), "./Pages/Users/EditProfile.vue": () => import("./assets/EditProfile-BULyBhdD.js"), "./Pages/Users/Index.vue": () => import("./assets/Index-BIXvaLjx.js") })),
    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h$1(App, props) }).use(plugin).use(k, {
        ...page.props.ziggy,
        location: new URL(page.props.ziggy.location)
      }).use(i18nVue, {
        lang: "en",
        resolve: (lang) => {
          const langs = /* @__PURE__ */ Object.assign({ "../../lang/bd.json": __vite_glob_1_0, "../../lang/en.json": __vite_glob_1_1, "../../lang/php_en.json": __vite_glob_1_2 });
          return langs[`../../lang/${lang}.json`].default;
        }
      });
    }
  })
);
