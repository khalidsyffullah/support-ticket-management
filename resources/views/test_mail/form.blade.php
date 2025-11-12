<!DOCTYPE html>
<html>
<head>
    <title>Send Test Email</title>
</head>
<body>
    <h2>Send Test Email</h2>

    @if(session('success'))
        <p style="color:green;">{{ session('success') }}</p>
    @endif

    @if(session('error'))
        <p style="color:red;">{{ session('error') }}</p>
    @endif

    <form method="POST" action="{{ route('test_mail.send') }}">
        @csrf
        <label>Email:</label>
        <input type="email" name="email" required>
        <button type="submit">Send Test Email</button>
    </form>
</body>
</html>
