<?php

namespace Smiled\Bundle\MerchantBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\QueryBuilder;

use Oro\Bundle\WorkflowBundle\Helper\WorkflowQueryTrait;
use Smiled\Bundle\MerchantBundle\Entity\Campaign;

class CampaignRepository extends EntityRepository
{
    
    public function findByCampaigns()
    {
        $query = $this->getEntityManager()
            ->createQuery('SELECT a  FROM MerchantBundle:Campaign a');
        try {
            return $query->getResult();
        } catch (\Doctrine\ORM\NoResultException $e) {
            return null;
        }
    }

  

}