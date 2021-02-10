<?php

namespace EMerchantPay\Repository;

use EMerchantPay\Model\User;
use Illuminate\Database\Eloquent\Model;

class UsersRepository implements RepositoryInterface
{
    /**
     * @inheritdoc
     */
    public function all(): array
    {
        return User::all();
    }

    /**
     * @inheritdoc
     */
    public function get($id): Model
    {
        return User::find($id);
    }

    /**
     * @inheritdoc
     */
    public function store($id, $data): bool
    {
        /** @var User $user */
        $user = $this->get($id);

        if (!$user) {
            return User::create($data);
        }

        $user->fill($data);
        return $user->save();
    }

    /**
     * @inheritdoc
     */
    public function delete($id): bool
    {
        $user = $this->get($id);

        return !$user || $user->delete();
    }

    /**
     * @param $username
     * @return User
     */
    public function getByName($username)
    {
        return User::where(User::COLUMN_USERNAME, $username)
            ->first();
    }
}