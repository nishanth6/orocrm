<?php 
namespace Smiled\Bundle\MerchantBundle\Service;
 
/**
 * Uploads image and creates thumbnail. Image does not get distorted when resized.
 *
 * Use:
 * $thumbnail = array('thumbnail' => true, 'padding' => true);
 * $this->get('image_uploader')->upload($submission->getFlag(), $thumbnail);
 */
class ImageUploadService
{
    private $imageUploadDir ;
    private $thumbnailUploadDir;
    private $thumbnailDefaults;
    private $validExtensions;
 
    /**
     * @param $root
     * @param $imageUpload
     */
    // public function __construct($root, $imageUpload)
    // {
    //     $imageUpload['image_upload_dir'] = 'web/public/images/notification/';
    //     $imageUpload['thumbnail_upload_dir'] = 'web/public/images/notification/thumbnail/';
    //     $imageUpload['thumbnail_defaults'] = array('height'=>'200','width'=>'200','red'=>'200','green'=>'0','blue'=>'0');
    //     $imageUpload['valid_extensions'] = array('jpg','jpeg','gif','png');
    //     $this->imageUploadDir = $root . $imageUpload['image_upload_dir'];
    //     $this->thumbnailUploadDir = $root . $imageUpload['thumbnail_upload_dir'];
    //     $this->thumbnailDefaults = $imageUpload['thumbnail_defaults'];
    //     $this->validExtensions = $imageUpload['valid_extensions'];
    // }
 
    /**
     * Image gets uploaded.
     *
     * @param $image
     * @param array $thumbnail
     * @return array|string
     */
    public function upload($image)
    {
        $thumbnail = array('thumbnail' => true, 'padding' => false);
        $imageUpload['image_upload_dir'] = '/var/www/html/orocrm/web/public/images/notifications/';
        $imageUpload['thumbnail_upload_dir'] = '/var/www/html/orocrm/web/public/images/notifications/thumbnail/';
        $this->imageUploadDir =  $imageUpload['image_upload_dir'];
        $this->thumbnailUploadDir =  $imageUpload['thumbnail_upload_dir'];
        $this->thumbnailDefaults = array('height'=>'200','width'=>'200','red'=>'200','green'=>'0','blue'=>'0');
        $this->validExtensions = array('jpg','jpeg','gif','png');
        $extension = $image->guessExtension();
        
        if (! in_array($extension, $this->validExtensions)) {
            return 'Invalid image format.';
        }
 
        $originalName = strip_tags($image->getClientOriginalName());
        $newName = sha1(crc32(time()) . microtime() . $originalName) . '.' . $extension;
 
        $image->move($this->imageUploadDir, $newName);
 
        if (! file_exists($this->imageUploadDir . $newName)) {
            return 'Image could not be uploaded.';
        }
 
        if (! is_null($thumbnail) && count($thumbnail) == 2) {
            if ($thumbnail['thumbnail'] === true) {
                if ($thumbnail['padding'] === true) {
                    $this->createThumbnailWithPadding(
                        $this->imageUploadDir . $newName,
                        $this->thumbnailUploadDir . $newName
                    );
                } else {
                  $w =  $this->createThumbnailWithoutPadding(
                        $this->imageUploadDir . $newName,
                        $this->thumbnailUploadDir . $newName
                    );

                }
            }
        }
 
        return array('originalName' => $originalName,  'path'=>'public/images/notifications/'.$newName, 
        'thumb_path'=> 'public/images/notifications/thumbnail/'.$newName, 
        'width'=>$w['width'],'height' => $w['height']);
    }
 
    /**
     * Resizes image with adding padding to the shortest edge and centers the image.
     * Transparency of image is destroyed.
     *
     * @param $sourceImage
     * @param $targetImage
     * @return bool
     */
    private function createThumbnailWithPadding($sourceImage, $targetImage)
    {
        list($sourceWidth, $sourceHeight, $sourceType) = getimagesize($sourceImage);
 
        $sourceGdImage = imagecreatefromstring(file_get_contents($sourceImage));
 
        //Determine scale based on the longest edge
        if ($sourceHeight > $sourceWidth) {
            $scale = ($this->thumbnailDefaults['height'] / $sourceHeight);
        } else {
            $scale = ($this->thumbnailDefaults['width'] / $sourceWidth);
        }
 
        //Calculate new image dimensions
        $thumbnailWidth =  ($sourceWidth * $scale);
        $thumbnailHeight =  ($sourceHeight * $scale);
 
        //Determine offset coordinates so that new image is centered
        $offsetX = (($this->thumbnailDefaults['width'] - $thumbnailWidth) / 2);
        $offsetY = (($this->thumbnailDefaults['height'] - $thumbnailHeight) / 2);
 
        //Create new image and fill with background colour
        $thumbnailGdImage = imagecreatetruecolor($this->thumbnailDefaults['width'], $this->thumbnailDefaults['height']);
 
        //Set background colour
        $bgColor = imagecolorallocate(
            $thumbnailGdImage,
            $this->thumbnailDefaults['red'],
            $this->thumbnailDefaults['green'],
            $this->thumbnailDefaults['blue']
        );
 
        //Fill background colour
        imagefill($thumbnailGdImage, 0, 0, $bgColor);
        //Copy and resize original image into center of new image
        imagecopyresampled(
            $thumbnailGdImage,
            $sourceGdImage,
            $offsetX,
            $offsetY,
            0,
            0,
            $thumbnailWidth,
            $thumbnailHeight,
            $sourceWidth,
            $sourceHeight
        );
 
        //clearstatcache();
 
        switch ($sourceType) {
            case IMAGETYPE_GIF:
                imagegif($thumbnailGdImage, $targetImage, 90);
                break;
            case IMAGETYPE_JPEG:
                imagejpeg($thumbnailGdImage, $targetImage, 90);
                break;
            case IMAGETYPE_PNG:
                imagepng($thumbnailGdImage, $targetImage, 9);
                break;
        }
 
        imagedestroy($sourceGdImage);
        imagedestroy($thumbnailGdImage);
 
        return true;
    }
 
    /**
     * Resizes image without adding padding to short edge.
     * Transparency of image is preserved.
     *
     * @param $sourceImage
     * @param $targetImage
     * @return bool
     */
    private function createThumbnailWithoutPadding($sourceImage, $targetImage)
    {
        list($sourceWidth, $sourceHeight, $sourceType) = getimagesize($sourceImage);
 
        switch ($sourceType) {
            case IMAGETYPE_GIF:
                $sourceGdImage = imagecreatefromgif($sourceImage);
                break;
            case IMAGETYPE_JPEG:
                $sourceGdImage = imagecreatefromjpeg($sourceImage);
                break;
            case IMAGETYPE_PNG:
                $sourceGdImage = imagecreatefrompng($sourceImage);
                break;
        }
 
        if ($sourceGdImage === false) {
            return false;
        }
 
        $sourceAspectRatio = ($sourceWidth / $sourceHeight);
        $thumbnailAspectRatio = ($this->thumbnailDefaults['width'] / $this->thumbnailDefaults['height']);
 
        if ($sourceWidth <= $this->thumbnailDefaults['width'] && $sourceHeight <= $this->thumbnailDefaults['height']) {
            $thumbnailWidth = $sourceWidth;
            $thumbnailHeight = $sourceHeight;
        } elseif ($thumbnailAspectRatio > $sourceAspectRatio) {
            $thumbnailWidth = (int) ($this->thumbnailDefaults['height'] * $sourceAspectRatio);
            $thumbnailHeight = $this->thumbnailDefaults['height'];
        } else {
            $thumbnailWidth = $this->thumbnailDefaults['width'];
            $thumbnailHeight = (int) ($this->thumbnailDefaults['width'] / $sourceAspectRatio);
        }
 
        $thumbnailGdImage = imagecreatetruecolor($thumbnailWidth, $thumbnailHeight);
 
        //Keep the transparency
        imagecolortransparent($thumbnailGdImage, imagecolorallocatealpha($thumbnailGdImage, 0, 0, 0, 127));
        imagealphablending($thumbnailGdImage, false);
        imagesavealpha($thumbnailGdImage, true);
 
        imagecopyresampled(
            $thumbnailGdImage,
            $sourceGdImage,
            0,
            0,
            0,
            0,
            $thumbnailWidth,
            $thumbnailHeight,
            $sourceWidth,
            $sourceHeight
        );
 
        //clearstatcache();
 
        switch ($sourceType) {
            case IMAGETYPE_GIF:
                imagegif($thumbnailGdImage, $targetImage, 90);
                break;
            case IMAGETYPE_JPEG:
                imagejpeg($thumbnailGdImage, $targetImage, 90);
                break;
            case IMAGETYPE_PNG:
                imagepng($thumbnailGdImage, $targetImage, 9);
                break;
        }
 
        imagedestroy($sourceGdImage);
        imagedestroy($thumbnailGdImage);

        $data = array('width'=>$sourceWidth,'height'=>$sourceHeight); 
 
        return $data;
    }
}
?>