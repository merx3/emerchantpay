<?php

namespace EMerchantPay\Api\Controller;

use EMerchantPay\Repository\PostsRepository;
use EMerchantPay\Service\FileStoreService;
use Psr\Container\ContainerInterface;
use Slim\Http\Request;
use Slim\Http\Response;
use Slim\Http\UploadedFile;

class PostsController
{
    /**
     * @var PostsRepository
     */
    private $repository;

    /**
     * @var ContainerInterface
     */
    protected $container;

    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
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
     * Return token after successful login
     *
     * @param Request $request
     * @param Response $response
     *
     * @return Response
     */
    public function storePost(Request $request, Response $response)
    {
        $params = $request->getParsedBody();
        $id = $params['id'] ?? false;
        $files = $request->getUploadedFiles();
        if (isset($files['image'])) {
            $image = $files['image'];
            /** @var FileStoreService $fileStore */
            $fileStore = $this->container->get(FileStoreService::getName());
            $path = $fileStore->save($image);
            $imageLink = '/images/' . $path;
            $params['image_link'] = $imageLink;
        } elseif (!$id) {
            throw new \InvalidArgumentException('Cannot create new post without an image');
        }

        return $response->withJson($this->repository->store($id, $params));
    }

    /**
     * Return token after successful login
     *
     * @param Request $request
     * @param Response $response
     *
     * @return Response
     */
    public function deletePost(Request $request, Response $response)
    {
        $route = $request->getAttribute('route');
        $postId = $route->getArgument('id');
        $post = $this->repository->get($postId);
        /** @var FileStoreService $fileStore */
        $fileStore = $this->container->get(FileStoreService::getName());
        $fileStore->delete($post->getImageLink());
        $this->repository->delete($postId);

        return $response->withStatus(200);
    }
}