<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ArticleAPIController extends Controller
{
    public function searchArticle($search)
    {
        $result ['data'] = DB::select('select * from ab_article where ab_name ~* ? limit 5;', [$search]);
        return response()->json($result);
    }

    public function create_api(){
        if(is_numeric(\request()->ab_price) && is_numeric(\request()->ab_creator_id) && \request()->ab_name != ""
        && \request()->ab_price > 0){
            try {
                $date = date("d-m-y H:i");
                $id = DB::select('Select nextval(pg_get_serial_sequence(\'ab_article\', \'id\')) as new_id;');
                DB::table('ab_article')->insert([
                    'id' => $id[0]->new_id,
                    'ab_name' => \request()->ab_name,
                    'ab_price' => (int)\request()->ab_price,
                    'ab_description' => \request()->ab_description,
                    'ab_creator_id' => (int)\request()->ab_creator_id,
                    'ab_createdate' => $date
                ]);
            } catch (\Illuminate\Database\QueryException $exception) {
                $errorInfo = $exception->errorInfo;
                return response()->json(['answer' => 'article could not be created.']);
            }
            return response()->json([
                'answer' => 'article was created! with',
                'id' => $id[0]->new_id
            ]);

        }
        else{
            return response()->json([
                'answer' => 'you send invalid data!'
            ]);
        }
    }

    public function delete_api($id){

        try{
            DB::table('ab_article')->where('id','=',$id)->delete();
        } catch (\Illuminate\Database\QueryException $exception) {
            $errorInfo = $exception->errorInfo;
            return response()->json(['answer' => 'article could not be deleted.']);
        }
        return response()->json(['answer' => 'article was deleted successfully!']);
    }

    public function make_cart(){
        $check = DB::table('ab_shoppingcart')->select('id')->where('id', '=', 1)->first();
        if($check != null && $check->id ==  1){
            return response()->json(['answer'=>'shoppingcart was already created!']);
        }
        $date = date("d-m-y H:i");
        try{
                DB::table('ab_shoppingcart')->insert(['id' => 1,
                    'ab_creator_id' => 1, 'ab_createdate' => $date]);

            } catch (\Illuminate\Database\QueryException $exception) {
            $errorInfo = $exception->errorInfo;
            return response()->json(['answer' => 'shoppingcart could not be created.']);
        }
        return response()->json(['answer' => 'shoppingcart was created successfully!']);
    }

    public function add_to_cart($articleid){
        try{
            $tmp = DB::select('Select nextval(pg_get_serial_sequence(\'ab_shoppingcart_item\', \'id\')) as new_id;');
            $id = $tmp[0]->new_id;
            $date = date("d-m-y H:i");
            DB::table('ab_shoppingcart_item')->insert(['id' => $id, 'ab_shoppingcart_id' => 1, 'ab_article_id' => $articleid,
                'ab_createdate' => $date]);

        } catch (\Illuminate\Database\QueryException $exception) {
            $errorInfo = $exception->errorInfo;
            return response()->json(['answer' => 'item could not be added to cart.']);
        }
        return response()->json(['answer' => 'item was added to cart!']);
    }

    public function remove_from_cart($shoppingcartid, $articleid){
        $item;
        try{
            $item = DB::table('ab_shoppingcart_item')->where('ab_shoppingcart_id','=',$shoppingcartid)
                ->where('ab_article_id','=',$articleid)->distinct()->first();
            DB::table('ab_shoppingcart_item')->where('ab_shoppingcart_id','=',$shoppingcartid)
                ->where('ab_article_id','=',$articleid)
                ->where('id','=',$item->id)->delete();
        }catch (\Illuminate\Database\QueryException $exception) {
            $errorInfo = $exception->errorInfo;
            return response()->json(['answer' => 'item could not be deleted from cart.']);
        }
        return response()->json(['answer' => 'item was deleted from cart',
            'id' => $shoppingcartid,
            'article_id' => $articleid,
            'relation_id' => $item->id]);
    }
}
