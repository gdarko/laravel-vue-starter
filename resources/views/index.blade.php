<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>{{env('APP_NAME')}}</title>
    <link href="{{ mix('css/main.css') }}" type="text/css" rel="stylesheet"/>
    <script>
        window.AppConfig = {
            csrf: '{{ csrf_token() }}'
        }
    </script>
</head>
<body>
<noscript>
    <strong>We're sorry but this application doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
</noscript>
<div id="app"></div>
<!-- built files will be auto injected -->

<script src="{{ mix('js/main.js') }}"></script>
</body>
</html>
