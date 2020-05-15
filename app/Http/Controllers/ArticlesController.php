<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Article;
use Symfony\Component\Console\Input\Input;

class ArticlesController extends Controller
{
    public function filter_articles($qstr){
        parse_str($qstr,$params);
            $results = DB::select('select ab_article.id as id, ab_article.ab_name as ab_name, ab_price, ab_description, ab_createdate,
	            ab_user.ab_name as ab_creator
                from ab_article, ab_user
                where ab_article.ab_name ~* ? and ab_article.ab_creator_id = ab_user.id;',[$params["search"]]);
        return view('articles',['article' => $results]);
    }

    public function all_articles(){
        $results = DB::select('select ab_article.id as id, ab_article.ab_name as ab_name, ab_price, ab_description, ab_createdate,
            ab_user.ab_name as ab_creator
            from ab_article, ab_user where ab_creator_id = ab_user.id;');
        return view('articles',['article' => $results]);
    }

    public function sell(){
        return view('artikeleingabe',['submitted' => false]);
    }

    public function create(){
        if(is_numeric(\request()->ab_price) && is_numeric(\request()->ab_creator_id)){
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
                return view('artikeleingabe', ['error' => $errorInfo, 'submitted' => false]);
            }
            return view('artikeleingabe', ['submitted' => true]);
        }
        else{
            dd('no numeric!');
        }
    }
}
