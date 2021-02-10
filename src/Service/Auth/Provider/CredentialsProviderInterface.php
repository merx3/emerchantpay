<?php

namespace EMerchantPay\Service\Auth\Provider;

use EMerchantPay\Service\Auth\Credential\CredentialsInterface;
use EMerchantPay\Service\Auth\Strategy\AuthStrategyInterface;

interface CredentialsProviderInterface
{
    /**
     * Return credentials for user
     *
     * @param string $username
     * @param AuthStrategyInterface $strategy
     * @return CredentialsInterface
     */
    public function getCredentials(string $username, AuthStrategyInterface $strategy): CredentialsInterface;
}