<?php

namespace EMerchantPay\Service\Auth\Provider;

use EMerchantPay\Model\User;
use EMerchantPay\Repository\UsersRepository;
use EMerchantPay\Service\Auth\Credential\CredentialsInterface;
use EMerchantPay\Service\Auth\Credential\HashCredential;
use EMerchantPay\Service\Auth\Strategy\AuthStrategyInterface;
use EMerchantPay\Service\Auth\Strategy\HashStrategy;

class DBCredentialsProvider implements CredentialsProviderInterface
{
    /**
     * @var UsersRepository
     */
    private $repo;

    public function __construct()
    {
        $this->repo = new UsersRepository();
    }

    /**
     * @inheritdoc
     */
    public function getCredentials(string $username, AuthStrategyInterface $strategy): CredentialsInterface
    {
        $user = $this->repo->getByName($username);

        return $this->buildCredentials($user, $strategy);
    }

    private function buildCredentials(User $user, AuthStrategyInterface $strategy)
    {
        $strategyClass = get_class($strategy);

        switch ($strategyClass) {
            case HashStrategy::class:
                return new HashCredential($user->getPassHash());
            default:
                throw new \InvalidArgumentException('No credentials found for strategy ' . $strategyClass);
        }
    }
}