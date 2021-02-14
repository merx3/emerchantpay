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
        $perPage = $request->getQueryParam('perPage');
        $page = $request->getQueryParam('page');
        $allPosts = $this->repository->all();
        $pagePosts = $allPosts->forPage($page, $perPage)->toArray();
        $pagesCount = max(ceil($allPosts->count() / $perPage), 1);

        return $response->withJson([
            'posts' => array_values($pagePosts),
            'pagesCount' => $pagesCount,
        ]);
    }

    /**
     * Return token after successful login
     *
     * @param Request $request
     * @param Response $response
     *
     * @return Response
     */
    public function getPost(Request $request, Response $response)
    {
        $route = $request->getAttribute('route');
        $postId = $route->getArgument('id');
        $post = $this->repository->get($postId);

        return $response->withJson($post->toArray());
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