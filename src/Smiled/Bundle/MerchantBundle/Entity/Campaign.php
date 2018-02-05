<?php

namespace Smiled\Bundle\MerchantBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="sc_campaign")
 */
class Campaign {

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(name="campaign_name", type="string", length=255)
     */
    protected $campaign_name;

    public function __clone() {
        $this->id = null;
    }

    public function getId() {
        return $this->id;
    }

    public function getCampaignName() {
        return $this->campaign_name;
    }

    public function setCampaignName($campaign_name) {
        $this->campaign_name = $campaign_name;
        return $this;
    }

    public function getDescription() {
        return $this->description;
    }

    public function setDescription($description) {
        $this->description = $description;
        return $this;
    }

}
