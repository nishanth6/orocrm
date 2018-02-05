<?php

namespace Smiled\Bundle\MerchantBundle\Entity\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\QueryBuilder;

use Oro\Bundle\WorkflowBundle\Helper\WorkflowQueryTrait;
use Doctrine\ORM\Query;
use Smiled\Bundle\MerchantBundle\Entity\User;

class UserRepository extends EntityRepository
{
    
    public function findByUserSearchValue($value)
    {
        
//        return $this->createQueryBuilder('a')
//            ->andWhere('a.username like %x%')
//            ->getQuery()
//            ->execute();
        
      return  $query = $this->getEntityManager()
            ->createQuery('SELECT a  FROM MerchantBundle:User a where name like '.$value);
        try {
            return $query->getResult();
        } catch (\Doctrine\ORM\NoResultException $e) { 
            return null;
        }
    }

  

}