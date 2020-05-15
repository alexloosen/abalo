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
    <div id="search">
        <input type="text" v-on:keyup="handleIt">
        <table style="width:100%" v-show="noSearch">
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
                    <td><button type="button" class="btn btn-danger" onclick="deleteArticle({{$a->id}})">delete</button></td>
                    <td><button type="button" class="btn btn-primary" onclick="addToCart({{$a->id}})">+</button></td>
                </tr>
            @endforeach
        </table>
        <table style="width:100%" v-show="!noSearch">
            <tr>
                <th>Title</th>
                <th style="width:10%">Creator</th>
                <th>Created at</th>
                <th style="width:5%">Price</th>
                <th>Description</th>
            </tr>
            <tr v-for="item in objects">
                <td>@{{item.ab_name}}</td>
                <td>@{{item.ab_creator_id}}</td>
                <td>@{{item.ab_createdate}}</td>
                <td style="text-align: center">@{{item.ab_price}}</td>
                <td>@{{item.ab_description}}</td>
                <!-- warum geht das nicht?!?!?!
                <td><button type="button" class="btn btn-danger" onclick="deleteArticle(item.id}})">delete</button></td>
                <td><button type="button" class="btn btn-primary" onclick="addToCart(item.id}})">+</button></td>
                -->
            </tr>
        </table>
    </div>
@endsection
