<?php

namespace Tests\Service\Auth\Strategy;

use EMerchantPay\Service\Auth\Credential\HashCredential;
use EMerchantPay\Service\Auth\Strategy\HashStrategy;
use PHPUnit\Framework\TestCase;

class HashStrategyTest extends TestCase
{
    private $testOptions = [
        HashStrategy::OPTION_ALGO => PASSWORD_BCRYPT,
        HashStrategy::OPTION_COST => 10,
    ];

    public function testProtectPassword()
    {
        $password = 'testPass123';
        $hashStrategy = new HashStrategy();
        $hash = $hashStrategy->protectPassword($password, $this->testOptions);

        $this->assertTrue(password_verify($password, $hash));
    }

    public function testCheckPasswordValid()
    {
        $password = 'testPass123';
        $hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 10]);
        $credentials = new HashCredential($hash);
        $hashStrategy = new HashStrategy();

        $this->assertTrue($hashStrategy->checkPassword($password, $credentials));
    }

    public function testCheckPasswordFalse()
    {
        $password = 'testPass123';
        $credentials = new HashCredential('fakeHash');
        $hashStrategy = new HashStrategy();

        $this->assertFalse($hashStrategy->checkPassword($password, $credentials));
    }
}