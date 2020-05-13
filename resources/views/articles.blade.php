@extends('layout')

@section('content')
    <table class="table table-striped">
        <thead>
        <tr>
            <th scope="col">ID</th>
            <th scope="col">anz</th>
        </tr>
        </thead>
        <tbody id="placeHere">

        </tbody>
    </table>
    <table style="width:100%">
        <tr>
            <th>Title</th>
            <th style="width:10%">Creator</th>
            <th>Created at</th>
            <th style="width:5%">Price</th>
            <th>Description</th>
        </tr>
        @foreach($article as $a)
            <tr>
                <td>{{$a->ab_name}}</td>
                <td>{{$a->ab_creator}}</td>
                <td>{{$a->ab_createdate}}</td>
                <td style="text-align: center">{{$a->ab_price}}</td>
                <td>{{$a->ab_description}}</td>
                <td><form name="delete-request">
                        <input type="hidden" value="{{$a->id}}" name="id">
                        <button type="submit" class="btn btn-danger">delete</button>
                    </form></td>
                <td><button type="button" class="btn btn-primary" onclick="addToCart({{$a->id}})">+</button></td>
            </tr>
            @endforeach
    </table>

@endsection
