<?php

namespace EMerchantPay\Middleware;

class HttpBasicAuthMiddleware extends AuthMiddleware
{
    /**
     * @param \Slim\Http\Request $request
     * @param $matches
     * @return array
     */
    public function getUserAndPassword(\Slim\Http\Request $request): array
    {
        $user = '';
        $password = '';
        if (preg_match("/Basic\s+(.*)$/i", $request->getHeaderLine("Authorization"), $matches)) {
            $explodedCredential = explode(":", base64_decode($matches[1]), 2);
            if (count($explodedCredential) == 2) {
                list($user, $password) = $explodedCredential;
            }
        }
        return [$user, $password];
    }
}