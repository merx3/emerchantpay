<?php

namespace Tests\Service\Auth;

use EMerchantPay\Service\Auth\Credential\CredentialsInterface;
use EMerchantPay\Service\Auth\Provider\CredentialsProviderInterface;
use EMerchantPay\Service\Auth\Strategy\AuthStrategyInterface;
use EMerchantPay\Service\Auth\AuthService;
use PHPUnit\Framework\TestCase;

class AuthServiceTest extends TestCase
{
    public function testValidate(): void
    {
        $username = 'testUser';
        $password = 'testPass';
        $credentials = $this->createMock(CredentialsInterface::class);
        $strategy = $this->getStrategyMock($password, $credentials);
        $provider = $this->getProviderMock($username, $strategy, $credentials);
        $authService = new AuthService($provider, $strategy);

        $this->assertTrue($authService->validate($username, $password));
    }

    private function getStrategyMock($pass, $credentials)
    {
        $strategy = $this->createMock(AuthStrategyInterface::class);

        $strategy->expects($this->once())
            ->method('checkPassword')
            ->with($this->equalTo($pass), $this->equalTo($credentials))
            ->willReturn(true);

        return $strategy;
    }

    private function getProviderMock($username, $strategy, $credentials)
    {
        $provider = $this->createMock(CredentialsProviderInterface::class);

        $provider->expects($this->once())
            ->method('getCredentials')
            ->with($this->equalTo($username), $this->equalTo($strategy))
            ->willReturn($credentials);

        return $provider;
    }
}