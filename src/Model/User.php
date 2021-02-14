<?php

namespace EMerchantPay\Model;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    const COLUMN_USERNAME = 'username';
    const COLUMN_PASS_HASH = 'pass_hash';
    const COLUMN_IS_ADMIN = 'is_admin';

    protected $table = 'users';

    protected $fillable = [
        self::COLUMN_USERNAME,
        self::COLUMN_PASS_HASH,
        self::COLUMN_IS_ADMIN,
    ];

    public function getPassHash()
    {
        return $this->getAttributeValue(self::COLUMN_PASS_HASH);
    }
}