<?php

namespace App\Http\Controllers;

use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MessageAPIController extends Controller
{
    // Broadcasten einer Artikel-Vergünstigungs-Nachricht
    public function discount($id){
        $client = new \Bloatless\WebSocket\Client;
        $client->connect('127.0.0.1', 8001, '/demo', 'foo.lh');

        $var = json_encode(['id' => 2,
            'text' => $id]);
        $payload = json_encode([
            'action' => 'echo',
            'data' => $var
        ]);

        $client->sendData($payload);
        return \response('I send some data related to discount...');
    }

    // Broadcasten einer Artikel-Verkaufs-Nachricht
    public function sold($id){
        $client = new \Bloatless\WebSocket\Client;
        $client->connect('127.0.0.1', 8001, '/demo', 'foo.lh');

        $creator_id = DB::select('select ab_creator_id, ab_name from ab_article where id = ?', [$id]);
        $var_in = json_encode([
            'article' => $id,
            'name' => $creator_id[0]->ab_name,
            'creator' => $creator_id[0]->ab_creator_id
        ]);
        $var = json_encode([
            'id' => 3,
            'text' => $var_in]);
        $payload = json_encode([
            'action' => 'echo',
            'data' => $var
        ]);

        $client->sendData($payload);
        return \response('I send some data related to selling...');
    }
}
?>
