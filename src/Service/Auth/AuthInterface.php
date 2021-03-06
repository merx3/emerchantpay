<?php

namespace EMerchantPay\Service\Auth;

interface AuthInterface
{
    /**
     * Authenticate an user
     *
     * @param string $username
     * @param string $password
     * @return bool
     */
    public function validate(string $username, string $password): bool;

}