@extends('layout')

@section('content')
    @if($submitted == true)
        <p>Ihre Anzeige wurde aufgegeben!</p>
        <p>Weitere Anzeige aufgeben:</p>
    @endif
    @if(isset($error))
        @foreach($error as $e)
            <p style="color:red">{{$e}}</p>
        @endforeach
    @endif
    <div id="2">

    </div>
@endsection

