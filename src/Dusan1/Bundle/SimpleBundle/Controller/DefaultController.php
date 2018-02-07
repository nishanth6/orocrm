<?php

namespace Dusan\Bundle\SimpleBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;


class DefaultController extends Controller
{
    /**
     * @Route("/index", name="dusan_simple_index")
     */
    public function indexAction($name)
    {
        return new Response('Hello world');
    }
}
