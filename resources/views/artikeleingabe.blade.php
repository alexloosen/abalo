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
    <div id="3">
        <form method="post" action="articles" onsubmit="return validate()" name="the_form">
            @csrf
            <div class="form-group">
                <label for="name">
                    Titel Ihres Artikels:
                </label>
                <input type="text" name="ab_name" id="name">
            </div>

            <div class="form-group">
                <label for="price">
                    Preis in €:
                </label>
                <input type="text" name="ab_price" id="price">
            </div>
            <div class="form-group">
                <label for="description">
                    Beschreibung:
                </label>
                <textarea name="ab_description" id="description"></textarea>
            </div>
            <input type="hidden" name="ab_creator_id" value="1">
            <button type="submit" class="btn btn-secondary" style="margin-left: 200px">Anzeige aufgeben</button>
        </form>

    </div>
@endsection

