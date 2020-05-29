@extends('layout')

@section('content')
    <table class="table table-striped" id="the_cart">
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
        <table style="width:100%">
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

                <td><button type="button" class="btn btn-danger" v-on:click="deleteArticle(item.id)">Delete Article</button></td>
                <td><button type="button" class="btn btn-primary" v-on:click="addToCart(item.id)">Add to Cart</button></td>

            </tr>
        </table>
    </div>
@endsection
