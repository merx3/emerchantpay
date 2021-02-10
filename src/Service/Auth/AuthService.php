<?php

namespace EMerchantPay\Service\Auth;

use EMerchantPay\Service\Auth\Provider\CredentialsProviderInterface;
use EMerchantPay\Service\Auth\Strategy\AuthStrategyInterface;
use EMerchantPay\Service\ServiceInterface;

class AuthService implements AuthInterface, ServiceInterface
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

    public static function getName(): string
    {
        return 'auth_service';
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