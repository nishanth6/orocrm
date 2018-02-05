<?php

namespace Smiled\Bundle\MerchantBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="sc_merchant")
 */
class Merchant {

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(name="name", type="string", length=255, unique=true, nullable=true)
     */

    /**
     * @ORM\Column(type="string", length=255)
     */
    protected $name;

    public function __clone() {
        $this->id = null;
    }

    public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
        return $this;
    }

    public function getAddress() {
        return $this->description;
    }

    public function setAddress($description) {
        $this->description = $description;
        return $this;
    }

}
