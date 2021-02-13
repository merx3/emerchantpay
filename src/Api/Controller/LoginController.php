<?php

namespace EMerchantPay\Api\Controller;

use EMerchantPay\Middleware\AuthMiddleware;
use Slim\Http\Request;
use Slim\Http\Response;
use Psr\Container\ContainerInterface;

class LoginController
{
    protected $container;

    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    /**
     * Return token after successful login
     *
     * @param Request $request
     * @param Response $response
     *
     * @return Response
     */
    public function login(Request $request, Response $response)
    {
        return $response->withStatus( 200);
    }

    /**
     * Return token after successful login
     *
     * @param Request $request
     * @param Response $response
     *
     * @return Response
     */
    public function logout(Request $request, Response $response)
    {
        /** @var AuthMiddleware $authMiddleware */
        $authMiddleware = $this->container->get('auth');
        $authMiddleware->logout();

        return $response->withStatus( 200);
    }
}