<?php

namespace EMerchantPay\Model;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    const COLUMN_TITLE = 'title';
    const COLUMN_DESCRIPTION = 'description';
    const COLUMN_IMAGE_LINK = 'image_link';
    const COLUMN_CONTENT = 'content';

    protected $table = 'posts';

    protected $fillable = [
        self::COLUMN_TITLE,
        self::COLUMN_DESCRIPTION,
        self::COLUMN_IMAGE_LINK,
        self::COLUMN_CONTENT,
    ];

    public function getImageLink()
    {
        return $this->getAttributeValue(self::COLUMN_IMAGE_LINK);
    }
}