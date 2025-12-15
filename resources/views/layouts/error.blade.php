<!DOCTYPE html>
<html lang="en" class="light scroll-smooth " dir="ltr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta content="BDCCL - Online Ticket Support" name="description" />
    <meta name="website" content="https://support.bdccl.gov.bd/" />
    <meta name="email" content="noc@bdccl.gov.bd" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="shortcut icon" href="/favicon.png">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <script src="https://polyfill.io/v3/polyfill.min.js?features=smoothscroll,NodeList.prototype.forEach,Promise,Object.values,Object.assign,String.prototype.startsWith" defer></script>

</head>
<body class="font-inter leading-none antialiased">
<section class="text-center py-6">
    <div class="container">
        @yield('content')
    </div>
</section>
</body>
</html>
