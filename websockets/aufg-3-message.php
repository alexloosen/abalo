<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

require __DIR__ . '/src/Client.php';

$client = new \Bloatless\WebSocket\Client;
$client->connect('127.0.0.1', 8001, '/demo', 'foo.lh');

$var = json_encode(['text' => 'In Kürze warten wir Abalo für Sie. Nach einer kurzen Pause sind wir wieder für Sie da! Versprochen.',
    'id' => 1]);
$payload = json_encode([
    'action' => 'echo',
    'data' => $var
]);

$client->sendData($payload); ?>

