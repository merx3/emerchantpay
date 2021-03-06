<?php

namespace EMerchantPay\Service\Session;

use EMerchantPay\Service\ServiceInterface;

class SessionService implements ServiceInterface
{
    public function __construct()
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_set_cookie_params([
                'lifetime' => 60*60*24,
                'path' => '/',
                'domain' => $_SERVER['HTTP_HOST'],
                'secure' => true,
                'httponly' => true,
                'samesite' => 'none'
            ]);
            session_start();
        }
    }

    public static function getName(): string
    {
        return 'session';
    }

    /**
     * @param $name
     * @param null $defaultValue
     *
     * @return mixed|null
     */
    public function get($name, $defaultValue = null)
    {
        return $_SESSION[$name] ?? $defaultValue;
    }

    /**
     * @param $name
     * @param $value
     */
    public function set($name, $value)
    {
        $_SESSION[$name] = $value;
    }

    /**
     * @param $name
     */
    public function unset($name)
    {
        unset($_SESSION[$name]);
    }
}