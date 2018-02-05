<?php

namespace Smiled\Bundle\MerchantBundle\Entity;


use Doctrine\ORM\Mapping as ORM;


/**
 * @ORM\Entity
 * @ORM\Table(name="sc_system_notification_weekly_schedule")
 */
class SystemNotificationWeeklySchedule
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
     * @var integer
     *
     * @ORM\Column(name="sc_system_notification_id", type="integer")
     */
    protected $sc_system_notification_id;

     /**
     * @var integer
     *
     * @ORM\Column(name="is_deleted", type="integer")
     */
    protected $is_deleted;

    /**
     * @var string
     *
     * @ORM\Column(name="start_time", type="string", length=150)
     */
    protected $start_time;



    /**
     * @var integer
     *
     * @ORM\Column(name="weekday", type="integer", length=150)
     */
    protected $weekday;

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
     * @return SystemNotificationWeeklySchedule
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }



     /**
     * Set sc_system_notification_id
     *
     * @param integer $sc_system_notification_id
     * @return Post
     */
    public function setSystemNotificationId($sc_system_notification_id)
    {
        $this->sc_system_notification_id = $sc_system_notification_id;

        return $this;
    }
    /**
     * Get sc_system_notification_id
     *
     * @return string
     */
    public function getSystemNotificationId()
    {
        return $this->sc_system_notification_id;
    }
 
     /**
     * Set start_time
     *
     * @param string $start_time
     * @return Post
     */
    public function setStartTime($start_time)
    {
        $this->start_time = $start_time;

        return $this;
    }
    /**
     * Get start_time
     *
     * @return integer
     */
    public function getStartTime()
    {
        return $this->start_time;
    }

     /**
     * Set weekday
     *
     * @param integer $weekday
     * @return Post
     */
    public function setWeekday($weekday)
    {
        
        $this->weekday = $weekday;
        return $this;
    }
    /**
     * Get weekday
     *
     * @return integer
     */
    public function getWeekday()
    {
        return $this->weekday;
    }

    
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
     

   

     


    








    /**
     * Set scSystemNotificationId
     *
     * @param integer $scSystemNotificationId
     *
     * @return SystemNotificationWeeklySchedule
     */
    public function setScSystemNotificationId($scSystemNotificationId)
    {
        $this->sc_system_notification_id = $scSystemNotificationId;

        return $this;
    }

    /**
     * Get scSystemNotificationId
     *
     * @return integer
     */
    public function getScSystemNotificationId()
    {
        return $this->sc_system_notification_id;
    }
}
