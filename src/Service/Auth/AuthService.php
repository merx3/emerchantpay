<?php

namespace EMerchantPay\Service;

use EMerchantPay\Service\Auth\Provider\CredentialsProviderInterface;
use EMerchantPay\Service\Auth\Strategy\AuthStrategyInterface;

class AuthService implements AuthInterface
{
    /**
     * @var CredentialsProviderInterface
     */
    private $provider;

    /**
     * @var AuthStrategyInterface
     */
    private $strategy;

    public function __construct(CredentialsProviderInterface $provider, AuthStrategyInterface $strategy)
    {
        $this->provider = $provider;
        $this->strategy = $strategy;
    }

    /**
     * @inheritdoc
     */
    public function validate(string $username, string $password): bool
    {
        $credentials = $this->provider->getCredentials($username, $this->strategy);

        return $this->strategy->checkPassword($password, $credentials);
    }
}