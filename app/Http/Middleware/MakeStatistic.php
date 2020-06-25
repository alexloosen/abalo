<?php


namespace App\Http\Middleware;
use Closure;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redis;


class MakeStatistic
{
    public function handle($request, Closure $next) {
        // Before - Hadling
        $uri = $request->path();
        $date = date('Y-m-d');
        // remove ids from uri!!!
        $uri = preg_replace("/[0-9]/", "", $uri);
        $uri_clean = $uri;
        if (substr($uri, -1) == '/'){
            $uri_clean = substr_replace($uri, "",-1);
        }

        $key = $date . '-' . $uri_clean;

        //if not already in storage, cache in this case, put new key
        if(Cache::has($key)){
            Cache::increment($key);
            Redis::incr($key);
        } else{
            Cache::forever($key, 1);
            Redis::set($key, 1);
        }

        $result = $next($request);
        // After – Handling if needed
        return $result;
    }
}
