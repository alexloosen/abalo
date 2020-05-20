<?php


namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;

class CartAPIController
{
    // einen Shoppingcart in der DB anlegen
    public function make_cart(){
        // zunächst prüfen, ob bereits einer angelegt wurde
        $check = DB::table('ab_shoppingcart')->select('id')->where('id', '=', 1)->first();
        if($check != null){
            $items = DB::table('ab_shoppingcart_item')->select('ab_article_id')->where('ab_shoppingcart_id','=',1)->get();
            return response()->json($items);
        }
        // wenn noch kein Shoppingcart angelegt wurde...
        $date = date("d-m-y H:i");
        try{
            DB::table('ab_shoppingcart')->insert(['id' => 1,
                'ab_creator_id' => 1, 'ab_createdate' => $date]);

        } catch (\Illuminate\Database\QueryException $exception) {
            return response()->json(['answer' => 'shoppingcart could not be created.']);
        }
        return response()->json(['answer' => 'shoppingcart was created successfully!']);
    }

    // Artikel einem Shoppingcart zuweisen über ab_shoppingcart_item Relation
    public function add_to_cart($articleid){
        try{
            $tmp = DB::select('Select nextval(pg_get_serial_sequence(\'ab_shoppingcart_item\', \'id\')) as new_id;');
            $id = $tmp[0]->new_id;
            $date = date("d-m-y H:i");
            DB::table('ab_shoppingcart_item')->insert(['id' => $id, 'ab_shoppingcart_id' => 1, 'ab_article_id' => $articleid,
                'ab_createdate' => $date]);

        } catch (\Illuminate\Database\QueryException $exception) {
            return response()->json(['answer' => 'item could not be added to cart.']);
        }
        return response()->json(['answer' => 'item was added to cart!']);
    }

    // Artikel aus einem Shoppingcart entfernen über ab_shoppingcart_item Relation
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
