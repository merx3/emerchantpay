<?php

namespace EMerchantPay\Service\Auth\Strategy;

use EMerchantPay\Service\Auth\Credential\CredentialsInterface;
use EMerchantPay\Service\Auth\Credential\HashCredential;

class HashStrategy implements AuthStrategyInterface
{
    const OPTION_COST = 'cost';
    const OPTION_ALGO = 'algo';

    private $defaultProtectOptions = [
        self::OPTION_COST => 10,
        self::OPTION_ALGO => PASSWORD_BCRYPT
    ];

    /**
     * @inheritDoc
     */
    public function protectPassword($password, $options): string
    {
        $options = array_merge($this->defaultProtectOptions, $options);
        $algo = $options[self::OPTION_ALGO];
        $cost = $options[self::OPTION_COST];

        return password_hash($password, $algo,  ["cost" => $cost]);
    }

    /**
     * @inheritDoc
     */
    public function checkPassword($password,CredentialsInterface $credentials): bool
    {
        if (!$credentials instanceof HashCredential) {
            throw new \InvalidArgumentException("Only hash credentials can be validated");
        }
        $hash = $credentials->getHash();

        return password_verify($password, $hash);
    }
}