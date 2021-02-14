<?php

namespace EMerchantPay\Api\Controller;

use EMerchantPay\Repository\PostsRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Slim\Http\Request;
use Slim\Http\Response;

class PostsController
{
    /**
     * @var PostsRepository
     */
    private $repository;

    public function __construct()
    {
        $this->repository = new PostsRepository();
    }

    /**
     * Return token after successful login
     *
     * @param Request $request
     * @param Response $response
     *
     * @return Response
     */
    public function getPosts(Request $request, Response $response)
    {
        /** @var LengthAwarePaginator $paginator */
        $perPage = $request->getQueryParam('perPage');
        $paginator = $this->repository->all()
            ->paginate($perPage);

        return $response->withJson([
            'items' => $paginator->currentPage(),
            'pagesCount' => $paginator->lastPage(),
        ]);
    }


    /**
     * @param int postId
     * @param int $perPage
     */
    public function updatePost(int $postId, array $postData)
    {
        return $this->repository->store($postId, $postData);
    }
}