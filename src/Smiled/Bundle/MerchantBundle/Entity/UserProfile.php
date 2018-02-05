<?php

namespace Smiled\Bundle\MerchantBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
 
/**
 * @ORM\Entity
 * @ORM\Table(name="user_profile")
 */
class UserProfile {
 /**
     * @var integer
     *
     * @ORM\Column(name="user_id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $user_id;

    /**
     * @var string
     *
     * @ORM\Column(name="username", type="string", length=150)
     */
    private $username;

    
    /**
     * Get user_id
     *
     * @return integer
     */
    public function getUserId()
    {
        return $this->user_id;
    }

    /**
     * Set username
     *
     * @param string $title
     * @return Post
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
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
 
}
