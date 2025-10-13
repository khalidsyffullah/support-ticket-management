@component('mail::message')
# Welcome, {{ $user->first_name }}!

Your account has been created.

Here are your login details:
- **Email:** {{ $user->email }}
- **Password:** {{ $password }}

You can login at the following URL:
@component('mail::button', ['url' => $loginUrl])
Login
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
