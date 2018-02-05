<?php

namespace Smiled\Bundle\MerchantBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="sc_system_notifications")
 */
class SystemNotification
{
    
    /**
     * @var string
     *
     * @ORM\Column(name="id", type="string", length=40, nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="smiled_moment_id", type="string")
     */
    protected $smiled_moment_id;

     /**
     * @var integer
     *
     * @ORM\Column(name="sc_campaign_id", type="integer")
     */
    protected $sc_campaign_id;

     /**
     * @var integer
     *
     * @ORM\Column(name="is_deleted", type="integer")
     */
    protected $is_deleted;



    /**
     * @var integer
     *
     * @ORM\Column(name="sc_merchant_id", type="integer")
     */
    protected $sc_merchant_id;


    /**
     * @var integer
     *
     * @ORM\Column(name="sc_merchant_lat", type="integer")
     */
    protected $sc_merchant_lat;


    /**
     * @var integer
     *
     * @ORM\Column(name="sc_merchant_lon", type="integer")
     */
    protected $sc_merchant_lon;


    /**
     * @var integer
     *
     * @ORM\Column(name="has_weekly_schedule", type="integer")
     */
    protected $has_weekly_schedule;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=150)
     */
    protected $name;

    /**
     * @var string
     *
     * @ORM\Column(name="short_description", type="string", length=150)
     */
    protected $short_description;

    /**
     * @var string
     *
     * @ORM\Column(name="long_description", type="string", length=150)
     */
    protected $long_description;

    /**
     * @var string
     *
     * @ORM\Column(name="notification_image", type="string", length=200)
     */
    protected $notification_image;

    /**
     * @var string
     *
     * @ORM\Column(name="notification_image_thumb", type="string", length=200)
     */
    protected $notification_image_thumb;

    /**
     * @var interger
     *
     * @ORM\Column(name="hours", type="integer", length=200)
     */
    protected $hours;

    /**
     * @var integer
     *
     * @ORM\Column(name="distance", type="integer", length=200)
     */
    protected $distance;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_on", type="datetime")
     */
    private $created_on;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="modified_on", type="datetime")
     */
    private $modified_on;
  
    /**
     * @var \DateTime
     *
     * @ORM\Column(name="notification_start_date", type="datetime")
     */
    protected $notification_start_date;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="notification_end_date", type="datetime")
     */
    protected $notification_end_date;

    /**
     * @var decimal
     *
     * @ORM\Column(name="lat", type="decimal")
     */
    protected $lat;

    /**
     * @var decimal
     *
     * @ORM\Column(name="lon", type="decimal")
     */
    protected $lon;


    /**
     * Get id
     *
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set id
     *
     * @param string $id
     *
     * @return SystemNotification
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Set sc_campaign_id
     *
     * @param integer $sc_campaign_id
     * @return Post
     */
    public function setScCampaignId($sc_campaign_id)
    {
        $this->sc_campaign_id = $sc_campaign_id;

        return $this;
    }
    /**
     * Get sc_campaign_id
     *
     * @return integer
     */
    public function getScCampaignId()
    {
        return $this->sc_campaign_id;
    }

    /**
     * Set smiled_moment_id
     *
     * @param string $smiled_moment_id
     * @return SystemNotification
     */
    public function setSmiledMomentId($smiled_moment_id)
    {
        $this->smiled_moment_id = $smiled_moment_id;

        return $this;
    }
    /**
     * Get smiled_moment_id
     *
     * @return string
     */
    public function getSmiledMomentId()
    {
        return $this->smiled_moment_id;
    }

    /**
     * Set sc_merchant_id
     *
     * @param integer $sc_merchant_id
     * @return Post
     */
    public function setScMerchantId($sc_merchant_id)
    {
        $this->sc_merchant_id = $sc_merchant_id;

        return $this;
    }
    /**
     * Get sc_merchant_id
     *
     * @return integer
     */
    public function getScMerchantId()
    {
        return $this->sc_merchant_id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Post
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set short_description
     *
     * @param string $short_description
     * @return Post
     */
    public function setShortDescription($short_description)
    {
        $this->short_description = $short_description;

        return $this;
    }

    /**
     * Get short_description
     *
     * @return string
     */
    public function getShortDescription()
    {
        return $this->short_description;
    }

    /**
     * Set long_description
     *
     * @param string $long_description
     * @return Post
     */
    public function setLongDescription($long_description)
    {
        $this->long_description = $long_description;

        return $this;
    }

    /**
     * Set notification_image
     *
     * @param string $notification_image
     * @return Post
     */

    public function setNotificationImage($notification_image)
    {
        $this->notification_image = $notification_image;
        return $this;
    }

    /**
     * Get notification_image
     *
     * @return string
     */
    public function getNotificationImage()
    {
        return $this->notification_image;
    }

    /**
     * Set notification_image_thumb
     *
     * @param string $notification_image_thumb
     * @return Post
     */

    public function setNotificationImageThumb($notification_image_thumb)
    {
        $this->notification_image_thumb = $notification_image_thumb;
        return $this;
    }

    /**
     * Get notification_image_thumb
     *
     * @return string
     */
    public function getNotificationImageThumb()
    {
        return $this->notification_image_thumb;
    }

    /**
     * Set hours
     *
     * @param integer $hours
     * @return Post
     */

    public function setHours($hours)
    {
        $this->hours = $hours;
        return $this;
    }

    /**
     * Get hours
     *
     * @return integer
     */
    public function getHours()
    {
        return $this->hours;
    }

    /**
     * Set distance
     *
     * @param integer $distance
     * @return Post
     */

    public function setDistance($distance)
    {
        $this->distance = $distance;
        return $this;
    }

    /**
     * Get hours
     *
     * @return integer
     */
    public function getDistance()
    {
        return $this->distance;
    }

    /**
     * Get longDescription
     *
     * @return string
     */
    public function getLongDescription()
    {
        return $this->long_description;
    }

    /**
     * Set created_on
     *
     * @param \DateTime $created_on
     * @return SystemNotification
     */
    public function setCreatedOn(\DateTime $created_on)
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
     * Set modified_on
     *
     * @param \DateTime $modified_on
     * @return Post
     */
    public function setModifiedOn($modified_on)
    {
        $this->modified_on = $modified_on;

        return $this;
    }

    /**
     * Get modified_on
     *
     * @return \DateTime
     */
    public function getModifiedOn()
    {
        return $this->modified_on;
    }

    /**
     * Auto set the modified date
     *
     * @ORM\PreUpdate
     */
    public function setModifiedValue()
    {
       $this->setModifiedOn(new \DateTime());
    }

    /**
     * Set initial value for created_on/modified_on values
     *
     * @ORM\PrePersist
     */
    public function setCreatedValues()
    {
        $this->setCreatedOn(new \DateTime());
        $this->setModifiedOn(new \DateTime());
    }
     


    /**
     * Set notification_start_date
     *
     * @param \DateTime $notification_start_date
     * @return SystemNotification
     */
    public function setNotificationStartDate(\DateTime $notification_start_date)
    {
        $this->notification_start_date = $notification_start_date;
        return $this;
    }

    /**
     * Get notification_start_date
     *
     * @return \DateTime
     */
    public function getNotificationStartDate()
    {
        return $this->notification_start_date;
    }

    /**
     * Set notification_end_date
     *
     * @param \DateTime $notification_end_date
     * @return SystemNotification
     */
    public function setNotificationEndDate(\DateTime $notification_end_date)
    {
        $this->notification_end_date = $notification_end_date;
        return $this;
    }

    /**
     * Get notification_end_date
     *
     * @return \DateTime
     */
    public function getNotificationEndDate()
    {
        return $this->notification_end_date;
    }

    /**
     * Set has_weekly_schedule
     *
     * @param  $has_weekly_schedule
     * @return SystemNotification
     */
    public function setHasWeeklySchedule($has_weekly_schedule)
    {
        if ($has_weekly_schedule == 'on') {
            $val = 1;
        } else {
            $val = 0;
        }
        $this->has_weekly_schedule = $val;
        return $this;
    }

    /**
     * Get has_weekly_schedule
     *
     * @return SystemNotification
     */
    public function getHasWeeklySchedule()
    {
        return $this->has_weekly_schedule;
    }



    /**
     * Set lat
     *
     * @param decimal $lat
     * @return SystemNotification
     */
    public function setLat($lat)
    {
        $this->lat = $lat;

        return $this;
    }

    /**
     * Get lat
     *
     * @return decimal
     */
    public function getLat()
    {
        return $this->lat;
    }

    /**
     * Set lon
     *
     * @param string $lon
     * @return SystemNotification
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
     * Set sc_merchant_lat
     *
     * @param string $sc_merchant_lat
     * @return SystemNotification
     */
    public function setScMerchantLat($sc_merchant_lat)
    {
        $this->sc_merchant_lat = $sc_merchant_lat;

        return $this;
    }

    /**
     * Get sc_merchant_lat
     *
     * @return string
     */
    public function getScMerchantLat()
    {
        return $this->sc_merchant_lat;
    }


    /**
     * Set sc_merchant_lon
     *
     * @param string $sc_merchant_lon
     * @return SystemNotification
     */
    public function setScMerchantLon($sc_merchant_lon)
    {
        $this->sc_merchant_lon = $sc_merchant_lon;

        return $this;
    }

    /**
     * Get sc_merchant_lon
     *
     * @return string
     */
    public function getScMerchantLon()
    {
        return $this->sc_merchant_lon;
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
