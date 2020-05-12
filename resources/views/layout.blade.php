<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Abalo</title>

    {{--not my stuff--}}
    <link href = {{ asset("bootstrap/css/bootstrap.css") }} rel="stylesheet" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

    <script src="https://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
    {{--not my stuff--}}

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ url('/style.css') }}">
    <link href="/fontawesome-free-5.11.2-web/css/all.css" rel="stylesheet">
</head>
<body>
<div class="container" style="margin:0px; max-width: 100%;">
    <header>
        <div class="row mt-3 mb-1">
            <div class="col p-1 m-2">
                <div class="row align-items-center">
                    <div class="col-md-auto ml-2"><button onclick="menuHandling()" id="menu"><i class="fas fa-bars" style="align-self: center; font-size:3rem; color:dimgray;"></i></button></div>
                    <div class="col">
                        <h1>Abalo</h1>
                        <p>Das ist unser Slogan.</p>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <div class="row mt-1 mb-1">
        <div id="1"></div>
        <div class="col p-1 m-2">
            @yield('content')
        </div>
    </div>
    <footer>
        <div class="row mt-1 mb-3">
            <div class="col p-1 m-2">
                <p>Copyright</p>
            </div>
        </div>
    </footer>
</div>

<div id="myCookieConsent">
    <a id="cookieButton">Understood</a>
    <div>This&nbsp;website is&nbsp;using&nbsp;cookies.</div>
</div>

</body>
@yield('scripts')
<script type="text/javascript" src="{{ url('/js/menu.js') }}"></script>
<script type="text/javascript" src="{{ url('/js/article_creation.js') }}"></script>
<script type="text/javascript" src="{{ url('/js/cart_controll.js') }}"></script>
<script type="text/javascript" src="{{ url('/js/cookiecheck.js') }}"></script>


</html>
