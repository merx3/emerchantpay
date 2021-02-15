<?php

namespace EMerchantPay\Repository;

use EMerchantPay\Model\Post;
use Illuminate\Database\Eloquent\Model;

class PostsRepository implements RepositoryInterface
{
    public function all()
    {
        return Post::all();
    }

    public function get($id): Model
    {
        return Post::find($id);
    }

    public function store($id, $data): bool
    {
        if ($id) {
            $post = $this->get($id);
            if (!$post) {
                throw new \InvalidArgumentException("Post with id $id does not exist");
            }
        } else {
            $post = new Post();
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