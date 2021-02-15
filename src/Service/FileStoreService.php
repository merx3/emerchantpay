<?php

namespace EMerchantPay\Service;

use Slim\Http\UploadedFile;

class FileStoreService implements ServiceInterface
{
    private $storePath;

    public function __construct($storePath)
    {
        $this->storePath = $storePath;
    }

    public static function getName(): string
    {
        return 'file_store';
    }

    public function save(UploadedFile $image): string
    {
        $uploadDir = date("Ymd");
        $relativePath = $uploadDir . DIRECTORY_SEPARATOR . $image->getClientFilename();
        $fileLocation = $this->storePath . DIRECTORY_SEPARATOR . $relativePath;
        $this->makeDir($this->storePath . DIRECTORY_SEPARATOR . $uploadDir);
        $image->moveTo($fileLocation);

        return $relativePath;
    }

    public function delete($relativePath)
    {
        $relativePath = $this->removeImageDirFromPath($relativePath);
        $fileLocation = realpath($this->storePath . DIRECTORY_SEPARATOR . $relativePath);

        return unlink($fileLocation);
    }

    private function makeDir($dir)
    {
        if (!file_exists($dir)) {
            mkdir($dir, 0700);
        }
    }

    private function removeImageDirFromPath($path)
    {
        $pathParts = explode('/', $path);
        array_shift($pathParts);
        array_shift($pathParts);

        return implode('/', $pathParts);
    }
}