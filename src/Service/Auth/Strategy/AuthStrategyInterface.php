<?php

namespace EMerchantPay\Service\Auth\Strategy;

use EMerchantPay\Service\Auth\Credential\CredentialsInterface;

interface AuthStrategyInterface
{
    /**
     * @param $password
     * @param $options
     * @return string
     */
    public function protectPassword($password, $options): string;

    /**
     * @param $password
     * @param CredentialsInterface $credentials
     * @return bool
     */
    public function checkPassword($password, CredentialsInterface $credentials): bool;
}