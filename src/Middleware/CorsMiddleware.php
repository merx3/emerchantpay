<?php

namespace EMerchantPay\Middleware;

class CorsMiddleware
{
    /**
     * @param \Slim\Http\Request $request
     * @param \Slim\Http\Response $response
     * @param $next
     * @return \Slim\Http\Response
     */
    public function __invoke(\Slim\Http\Request $request, \Slim\Http\Response $response, $next)
    {
        /** @var $response \Slim\Http\Response */
        $response = $next($request, $response);

        // needs exact origin for axios 
        return $response->withHeader('Access-Control-Allow-Origin', $_SERVER['HTTP_ORIGIN'])
            ->withHeader('Access-Control-Allow-Headers', 'Access-Control-*, X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            ->withHeader('Access-Control-Allow-Credentials', 'true');
    }
}