<?php

use Symfony\Component\Config\Loader\LoaderInterface;

use Oro\Bundle\DistributionBundle\OroKernel;

class AppKernel extends OroKernel
{
    public function registerBundles()
    {
        $bundles = array(
        //bundles,
            new Smiled\Bundle\MerchantBundle\MerchantBundle(),
           // new Dusan\Bundle\SimpleBundle\SimpleBundle(),
            new OroCRM\Bundle\TaskBundle\OroCRMTaskBundle(),
            new Dusan\Bundle\SimpleBundle\DusanSimpleBundle(),
        );

        if ('dev' === $this->getEnvironment()) {
            $bundles[] = new Symfony\Bundle\WebProfilerBundle\WebProfilerBundle();
            $bundles[] = new Sensio\Bundle\DistributionBundle\SensioDistributionBundle();
            if (class_exists('Sensio\Bundle\GeneratorBundle\SensioGeneratorBundle')) {
                $bundles[] = new Sensio\Bundle\GeneratorBundle\SensioGeneratorBundle();
            }
        }

        if ('test' === $this->getEnvironment()) {
            $bundles[] = new Oro\Bundle\TestFrameworkBundle\OroTestFrameworkBundle();
            $bundles[] = new Oro\Bundle\TestFrameworkCRMBundle\OroTestFrameworkCRMBundle();
        }

        return array_merge(parent::registerBundles(), $bundles);
    }

    public function registerContainerConfiguration(LoaderInterface $loader)
    {
        $loader->load(__DIR__.'/config/config_'.$this->getEnvironment().'.yml');
    }
}
