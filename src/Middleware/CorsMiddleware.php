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

        return $response->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    }
}