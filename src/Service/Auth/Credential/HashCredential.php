<?php

namespace EMerchantPay\Service\Auth\Credential;

class HashCredential implements CredentialsInterface
{
    /**
     * @var string
     */
    private $hash;

    public function __construct(string $hash)
    {
        $this->hash = $hash;
    }

    /**
     * @return string
     */
    public function getHash()
    {
        return $this->hash;
    }
}