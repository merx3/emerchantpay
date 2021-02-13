<?php

use EMerchantPay\Middleware\CorsMiddleware;
use EMerchantPay\Middleware\HttpBasicAuthMiddleware;
use EMerchantPay\Service\Auth\AuthService;
use EMerchantPay\Service\Session\SessionService;
use Slim\App;

return function (App $app) {
    $container = $app->getContainer();

    $app->add(new CorsMiddleware);

    $container['auth'] = function ($c) use ($container) {
        $authService = $container->get(AuthService::getName());
        $sessionService = $container->get(SessionService::getName());
        return new HttpBasicAuthMiddleware($authService, $sessionService, $container);
    };
};
