<?php

use EMerchantPay\Api\Controller\LoginController;
use EMerchantPay\Api\Controller\PostsController;
use Slim\App;

return function (App $app) {
    $container = $app->getContainer();

    $app->group('/api', function () use ($app, $container) {
        $authMiddleware = $container->get('auth');
        $app->group('/admin', function () use ($app) {
            $app->post('/login', LoginController::class . ':login')->setName('auth.logout');
            $app->post('/logout', LoginController::class . ':logout')->setName('auth.logout');
            $app->post('/posts', PostsController::class . ':storePost')->setName('admin.posts.store');
            $app->delete('/posts/{id}', PostsController::class . ':deletePost')->setName('admin.posts.store');
        })->add($authMiddleware);
        $app->get('/posts', PostsController::class . ':getPosts')->setName('posts.for.page');
        $app->get('/posts/{id}', PostsController::class . ':getPost')->setName('posts.view');
    });

    // handle 404 with CORS
    $app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function($req, $res) {
        return $res->withStatus(404)
            ->withHeader('Content-Type', 'text/html')
            ->write('Page not found');
    });
};
