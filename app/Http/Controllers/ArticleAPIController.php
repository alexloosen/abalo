<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ArticleAPIController extends Controller
{
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
}
