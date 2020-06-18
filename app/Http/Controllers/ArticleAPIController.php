<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use function GuzzleHttp\Psr7\copy_to_string;


class ArticleAPIController extends Controller
{
    // for m5 task 5, so certain articles can be discounted
    public function personal_articles($id){
        $result['data'] = DB::select('select ab_name, id from ab_article where ab_creator_id = ?', [$id]);
        return response()->json($result);
    }

    // für die dynamische/interaktive Artikelsuche, gibt Anzahl gefundener Artikel zurück
    public function searchArticle($search)
    {
        Redis::rpush('lastarticlesearch', $search);
        $result ['num'] = DB::select('select count(*) from ab_article where ab_name ~* ?', [$search]);
        return response()->json($result);
    }

    public function getLastSearchTerms(){
        $result = Redis::lrange('lastarticlesearch', 0, -1);
        return response()->json($result);
    }

    //gibt einen Teil der gesuchten Artikel zurück
    public function searchArticlePage($search, $offset){
        $result ['data'] = DB::select('select * from ab_article where ab_name ~* ? limit 5 offset ?;', [$search, $offset]);
        return response()->json($result);
    }

    //gibt Anzahl ALLER Artikel zurück
    public function get_count(){
        $result ['num'] = DB::select('select count(*) from ab_article;');
        return response()->json($result);
    }

    //zum Anzeigen einer Seite ALLER Artikel
    public function get_all_page($offset){
        $result ['data'] = DB::select('select * from ab_article limit 5 offset ?;', [$offset]);
        return response()->json($result);
    }

    //neuen Artikel in der Datenbank anlegen
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

    //einen Artikel aus der Datenbank löschen
    public function delete_api($id){
        try{
            DB::table('ab_article')->where('id','=',$id)->delete();
        } catch (\Illuminate\Database\QueryException $exception) {
            return response()->json(['answer' => 'article could not be deleted.']);
        }
        return response()->json(['answer' => 'article was deleted successfully! Please refresh the page.']);
    }
}
