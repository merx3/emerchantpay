<?php

use EMerchantPay\Api\Controller\LoginController;
use Slim\App;

return function (App $app) {
    $container = $app->getContainer();

    $app->group('/api', function () use ($app, $container) {
        $authMiddleware = $container->get('auth');
        $app->group('/admin', function () use ($app) {
            $app->post('/login', LoginController::class . ':login')->setName('auth.logout');
            $app->post('/logout', LoginController::class . ':logout')->setName('auth.logout');
        })->add($authMiddleware);;
    });

    // handle 404 with CORS
    $app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function($req, $res) {
        return $res->withStatus(404)
            ->withHeader('Content-Type', 'text/html')
            ->write('Page not found');
    });
};
