<?php

namespace Smiled\Bundle\MerchantBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\QueryBuilder;

use Oro\Bundle\WorkflowBundle\Helper\WorkflowQueryTrait;
use Smiled\Bundle\MerchantBundle\Entity\Merchant;

class MerchantRepository extends EntityRepository
{
    
    public function findBySearch($value)
    {
        $query = $this->getEntityManager()
            ->createQuery('SELECT a  FROM MerchantBundle:Merchant a where name like '.$value);
        try {
            return $query->getResult();
        } catch (\Doctrine\ORM\NoResultException $e) { 
            return null;
        }
    }

  

}