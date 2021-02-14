<?php

namespace EMerchantPay\Repository;

use EMerchantPay\Model\Post;
use Illuminate\Database\Eloquent\Model;

class PostsRepository implements RepositoryInterface
{
    public function all(): array
    {
        return Post::all();
    }

    public function get($id): Model
    {
        return Post::find($id);
    }

    public function store($id, $data): bool
    {
        $post = $this->get($id);
        if (!$post) {
            return false;
        }
        $post->fill($data);
        return $post->save();
    }

    public function delete($id): bool
    {
        $post = $this->get($id);
        return $post->delete();
    }
}