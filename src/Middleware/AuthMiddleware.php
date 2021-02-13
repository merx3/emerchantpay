<?php

namespace EMerchantPay\Middleware;

use EMerchantPay\Service\Auth\AuthService;
use EMerchantPay\Service\Session\SessionService;

abstract class AuthMiddleware
{
    const SESSION_LOGGED = '__is_authenticated';
    const SESSION_LOGGED_USER = '__authenticated_user';

    /**
     * @var SessionService
     */
    private $session;

    /**
     * @var AuthService
     */
    private $authService;
    /**
     * @var null
     */
    private $container;

    public function __construct($authService, $session, $container = null)
    {
        $this->authService = $authService;
        $this->session = $session;
        $this->container = $container;
    }

    /**
     * Example middleware invokable class
     * @param \Slim\Http\Request  $request
     * @param \Slim\Http\Response $response
     * @param $next
     *
     * @return mixed
     */
    public function __invoke($request, $response, $next)
    {
        if ($this->isAuthenticated()) {
            return $next($request, $response);
        }

        list($user, $password) = $this->getUserAndPassword($request);

        if (!$this->authService->validate($user, $password)) {
            return $response->withJson(['error' => 'Authentication failed'], 401);
        }
        $this->storeAuthenticated($user);

        return $next($request, $response);
    }

    /**
     * @return void
     */
    public function logout()
    {
        $this->session->unset(self::SESSION_LOGGED);
    }

    /**
     * @return bool|null
     */
    protected function isAuthenticated()
    {
        return $this->session->get(self::SESSION_LOGGED);
    }

    /**
     * @param string $user
     */
    protected function storeAuthenticated(string $user)
    {
        $this->session->set(self::SESSION_LOGGED, true);
        $this->session->set(self::SESSION_LOGGED_USER, $user);
    }

    /**
     * @param \Slim\Http\Request $request
     * @param $matches
     * @return array
     */
    protected abstract function getUserAndPassword(\Slim\Http\Request $request): array;
}