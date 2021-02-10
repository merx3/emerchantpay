<?php

use EMerchantPay\Service\Auth\AuthService;
use EMerchantPay\Service\Auth\Provider\DBCredentialsProvider;
use EMerchantPay\Service\Auth\Strategy\HashStrategy;
use Slim\App;

return function (App $app) {
    $container = $app->getContainer();

    // view renderer
    $container['renderer'] = function ($c) {
        $settings = $c->get('settings')['renderer'];
        return new \Slim\Views\PhpRenderer($settings['template_path']);
    };

    // monolog
    $container['logger'] = function ($c) {
        $settings = $c->get('settings')['logger'];
        $logger = new \Monolog\Logger($settings['name']);
        $logger->pushProcessor(new \Monolog\Processor\UidProcessor());
        $logger->pushHandler(new \Monolog\Handler\StreamHandler($settings['path'], $settings['level']));
        return $logger;
    };

    // Service factory for Eloquent ORM
    $container['db'] = function ($c) {
        $capsule = new \Illuminate\Database\Capsule\Manager;
        $capsule->addConnection($c['settings']['db']);

        $capsule->setAsGlobal();
        $capsule->bootEloquent();

        return $capsule;
    };

    $container[AuthService::getName()] = function ($c) {
        $provider = new DBCredentialsProvider();
        $strategy = new HashStrategy();

        return new AuthService($provider, $strategy);
    };
};
