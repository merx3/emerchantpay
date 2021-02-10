<?php

namespace EMerchantPay\Service\Auth\Provider;

use EMerchantPay\Service\Auth\Credential\CredentialsInterface;
use EMerchantPay\Service\Auth\Strategy\AuthStrategyInterface;

interface CredentialsProviderInterface
{
    /**
     * Return credentials for user
     *
     * @param string $user
     * @param AuthStrategyInterface $strategy
     * @return CredentialsInterface
     */
    public function getCredentials(string $user, AuthStrategyInterface $strategy): CredentialsInterface;
}