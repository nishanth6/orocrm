<?php

namespace Smiled\Bundle\MerchantBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="smiled_moment")
 */
class SmiledMoment
{
    /**
     * @var string
     *
     * @ORM\Column(name="smiled_id", type="string", length=40, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $smiled_id;


    /**
     * @var integer
     *
     * @ORM\Column(name="user_id", type="integer")
     */
    protected $user_id;


    /**
     * @var integer
     *
     * @ORM\Column(name="is_deleted", type="integer")
     */
    protected $is_deleted;


    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=512)
     */
    protected $title;

    /**
     * @var string
     *
     * @ORM\Column(name="referral_code", type="string", length=512)
     */
    protected $referral_code;

    /**
     * @var string
     *
     * @ORM\Column(name="media", type="string", length=150)
     */ 
    protected $media;

    /**
     * @var string
     *
     * @ORM\Column(name="username", type="string", length=150)
     */ 
    protected $username;

    /**
     * @var string
     *
     * @ORM\Column(name="media_thumb", type="string", length=150)
     */
    protected $media_thumb;

     /**
     * @var integer
     *
     * @ORM\Column(name="image_width", type="decimal", length=150)
     */
    protected $image_width;

     /**
     * @var integer
     *
     * @ORM\Column(name="image_height", type="decimal", length=150)
     */
    protected $image_height;

    /**
     * @var string
     *
     * @ORM\Column(name="location_name", type="string", length=150)
     */
    protected $location_name;

    /**
     * @var string
     *
     * @ORM\Column(name="lat", type="decimal")
     */
    protected $lat;

    /**
     * @var string
     *
     * @ORM\Column(name="lon", type="decimal")
     */
    protected $lon;

    /**
     * @var string
     *
     * @ORM\Column(name="merchant_ids", type="integer")
     */
    protected $merchant_ids;

     /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_on", type="datetime")
     */
    private $created_on;

    /**
     * Get smiled_id
     *
     * @return string
     */
    public function getSmiledId()
    {
        return $this->smiled_id;
    }

     /**
     * Set smiledId
     *
     * @param string $smiled_id
     *
     * @return SmiledMoment
     */
    public function setSmiledId($smiled_id)
    {
        $this->smiled_id = $smiled_id;

        return $this;
    }

    /**
     * Set user_id
     *
     * @param integer $user_id
     * @return Post
     */
    public function setUserId($user_id)
    {
        $this->user_id = $user_id;

        return $this;
    }

    /**
     * Get user_id
     *
     * @return string
     */
    public function getUserId()
    {
        return $this->user_id;
    }

    /**
     * Set media
     *
     * @param string $media
     * @return Post
     */
    public function setMedia($media)
    {
        $this->media = $media;

        return $this;
    }
    /**
     * Get media
     *
     * @return integer
     */
    public function getMedia()
    {
        return $this->media;
    }

    /**
     * Set media_thumb
     *
     * @param string $media_thumb
     * @return Post
     */
    public function setMediaThumb($media_thumb)
    {
        $this->media_thumb = $media_thumb;

        return $this;
    }

    /**
     * Get media
     *
     * @return integer
     */
    public function getMediaThumbT()
    {
        return $this->media_thumb;
    }

    /**
     * Set location
     *
     * @param string $location_name
     * @return Post
     */
    public function setLocationName($location_name)
    {
        $this->location_name = $location_name;

        return $this;
    }

    /**
     * Get location
     *
     * @return string
     */
    public function getLocationName()
    {
        return $this->location_name;
    }

    /**
     * Set title
     *
     * @param string $title
     * @return POST
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }


    /**
     * Set referral_code
     *
     * @param string $referral_code
     * @return POST
     */
    public function setReferralCode($referral_code)
    {
        $this->referral_code = $referral_code;

        return $this;
    }

    /**
     * Get referral_code
     *
     * @return string
     */
    public function getReferralCode()
    {
        return $this->referral_code;
    }



    /**
     * Set created_on
     *
     * @param \DateTime $created_on
     * @return SmiledMoment
     */
    public function setCreatedOn($created_on)
    {
        $this->created_on = $created_on;

        return $this;
    }
    /**
     * Get created_on
     *
     * @return \DateTime
     */
    public function getCreatedOn()
    {
        return $this->created_on;
    }

    /**
     * Set initial value for created_on/modified_on values
     *
     * @ORM\PrePersist
     */
    public function setCreatedValues()
    {
        $this->setCreatedOn(new \DateTime()); 
    }


    /**
     * Set lat
     *
     * @param string $lat
     * @return Post
     */
    public function setLat($lat)
    {
        $this->lat = $lat;

        return $this;
    }

    /**
     * Get lat
     *
     * @return string
     */
    public function getLat()
    {
        return $this->lat;
    }

    /**
     * Set lon
     *
     * @param string $lon
     * @return Post
     */
    public function setLon($lon)
    {
        $this->lon = $lon;

        return $this;
    }

    /**
     * Get lon
     *
     * @return string
     */
    public function getLon()
    {
        return $this->lon;
    }

    /**
     * Set merchant_ids
     *
     * @param string $merchant_ids
     * @return Post
     */
    public function setMerchantIds($merchant_ids)
    {
        $this->merchant_ids = $merchant_ids;

        return $this;
    }

    /**
     * Get merchant_ids
     *
     * @return string
     */
    public function getMerchantIds()
    {
        return $this->merchant_ids;
    }

     /**
     * Get username
     *
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set username
     *
     * @param string $username
     * @return Post
     */
    public function setUsername($username)
    {

        $this->username = trim($username);

        return $this;
    }


    /**
     * Get image_width
     *
     * @return string
     */
    public function getImageWidth()
    {
        return $this->image_width;
    }

    /**
     * Set image_width
     *
     * @param string $image_width
     * @return SmiledMoment
     */
    public function setImageWidth($image_width)
    {

        $this->image_width = $image_width;

        return $this;
    }

    /**
     * Get image_height
     *
     * @return string
     */
    public function getImageHeight()
    {
        return $this->image_height;
    }

    /**
     * Set image_height
     *
     * @param string $image_height
     * @return SmiledMoment
     */
    public function setImageHeight($image_height)
    {

        $this->image_height = $image_height;

        return $this;
    }
 
    /**
     * Get mediaThumb
     *
     * @return string
     */
    public function getMediaThumb()
    {
        return $this->media_thumb;
    }


    /**
     * Set is_deleted
     *
     * @param integer $is_deleted
     * @return SmiledMoment
     */
    public function setIsDeleted($is_deleted)
    {

        $this->is_deleted = $is_deleted;

        return $this;
    }
 

    /**
     * Get is_deleted
     *
     * @return integer
     */
    public function getIsDeleted()
    {
        return $this->is_deleted;
    }
}
