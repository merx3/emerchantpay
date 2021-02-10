<?php

namespace EMerchantPay\Repository;

use Illuminate\Database\Eloquent\Model;

interface RepositoryInterface
{
    /**
     * @return Model[]
     */
    public function all(): array;

    /**
     * @param $id
     * @return Model
     */
    public function get($id): Model;

    /**
     * @param $id
     * @param $data
     * @return bool
     */
    public function store($id, $data): bool;

    /**
     * @param $id
     * @return bool
     */
    public function delete($id): bool;
}