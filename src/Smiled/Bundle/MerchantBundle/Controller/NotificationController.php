<?php

namespace Smiled\Bundle\MerchantBundle\Controller;

//use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use FOS\RestBundle\Util\Codes;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Smiled\Bundle\MerchantBundle\Entity\SmiledMoment;
use Smiled\Bundle\MerchantBundle\Entity\SystemNotification;
use Smiled\Bundle\MerchantBundle\Entity\SystemNotificationWeeklySchedule;
use Smiled\Bundle\MerchantBundle\Service\ImageUploadService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Description of NotificationController
 *
 *
 * @Route("/")
 */
class NotificationController extends Controller
{

    /**
     * @Route("/notification/list", name="notification_index")
     * @Template()
     */
    /*public function indexAction() {
    return $this->render('MerchantBundle:Notification:index.html.twig');
    }*/
    public function indexAction(Request $request)
    {
        $baseurl = $request->getScheme() . '://' . $request->getHttpHost() . $request->getBasePath().'/';
       // var_dump($baseurl); exit; 
        $em = $this->getDoctrine()->getEntityManager();
         $query = $em->createQueryBuilder();
            $notifications =  $query->select('sn','sm')
              ->from('MerchantBundle:SystemNotification', 'sn')
              ->leftJoin('MerchantBundle:SmiledMoment', 'sm', 'WITH', 'sn.smiled_moment_id = sm.smiled_id')
              ->groupBy('sn.id')
              ->getQuery()
             ->getScalarResult();
 
        $data['notifications'] = array();
        foreach ($notifications as  $notification) { 
            $notification_weekly_scheduled = $em->getRepository('MerchantBundle:SystemNotificationWeeklySchedule')->findBy(array('sc_system_notification_id' =>$notification['sn_id']));
           
            $data['notifications'][] = array(
                'id' => $notification['sn_id'],
                'name' => $notification['sn_name'],
                'smiled_moment_id' => $notification['sn_smiled_moment_id'],
                'sc_campaign_id' => $notification['sn_sc_campaign_id'],
                'merchant_id' => $notification['sn_sc_merchant_id'],
                'user_id' => $notification['sm_user_id'],
                'campaign_name' => $em->getRepository('MerchantBundle:Campaign')->find($notification['sn_sc_campaign_id']),
                //'name' => $notification['sm_username'],
                'image' =>  $baseurl.$notification['sn_notification_image'],
                'short_description' => $notification['sn_short_description'],
                'long_description' => $notification['sn_long_description'],
                'notification_start_date' => $notification['sn_notification_start_date'],
                'notification_end_date' => $notification['sn_notification_end_date'],
                'image_thumb' => $baseurl.$notification['sn_notification_image_thumb'],
                'distance' => $notification['sn_distance'],
                'hours' => $notification['sn_hours'],
                'username' => $notification['sm_username'],
                'title' => $notification['sm_title'],
                'media' => $notification['sm_media'],
                'media_thumb' => $notification['sm_media_thumb'],
                'location_name' => $notification['sm_location_name'],
                'lat' => $notification['sm_lat'],
                'lon' => $notification['sm_lon'],
                'merchant_ids' => $notification['sm_merchant_ids'],
                'weekly_scheduled' => $notification_weekly_scheduled,   
            );
 
        }  

       
      
        return $this->render('MerchantBundle:Notification:list.html.twig', $data);
    }

    /**
     * @Route("/notification/create", name="notification_create")
     * @Template("MerchantBundle:Notification:update.html.twig")
     */
    public function createAction()
    {
        return $this->render('MerchantBundle:Notification:update.html.twig');
    }

     /**
     * @Route("/notification/edit/{id}", name="notification_edit")
     * @Template("MerchantBundle:Notification:update.html.twig")
     */
    public function editAction($id,Request $request)
    { 
        $notification_id = $request->get('id');
        $em = $this->getDoctrine()->getManager();
        $notification = $em->getRepository('MerchantBundle:SystemNotification')->find($notification_id);         
        $smiled_moment_id = $notification->getSmiledMomentId();  
        $smiled_moment = $em->getRepository('MerchantBundle:SmiledMoment')->find($smiled_moment_id);
        $notification_weekly_scheduled = $em->getRepository('MerchantBundle:SystemNotificationWeeklySchedule')->findBy(array('sc_system_notification_id' => $notification_id));
        $weekly_scheduled = array(); 
        foreach($notification_weekly_scheduled as $schedule){
            if($schedule->getWeekday()=='1'){
                $weekname = 'Sunday'; 
            } else if($schedule->getWeekday()=='2'){
                $weekname = 'Monday'; 
            } else if($schedule->getWeekday()=='3'){
                $weekname = 'Tuesday'; 
            } else if($schedule->getWeekday()=='4'){
                $weekname = 'Wednesday'; 
            } else if($schedule->getWeekday()=='5'){
                $weekname = 'Thursday'; 
            } else if($schedule->getWeekday()=='6'){
                $weekname = 'Friday'; 
            } else if($schedule->getWeekday()=='7'){
                $weekname = 'Saturday'; 
            }
            $weekly_scheduled[] = array(
                'weekday' => $schedule->getWeekday(),
                'start_time' => $schedule->getStartTime(), 
                'weekname' => $weekname 
            );
           $daytimes[] =   $schedule->getWeekday().'-'.$schedule->getStartTime();  
        }   

        $weekdaytimes = implode(',',$daytimes);
  
        $merchant_name1 =  $em->getRepository('MerchantBundle:Merchant')->find($notification->getScMerchantId());
        $merchant_name2 =  $em->getRepository('MerchantBundle:Merchant')->find($smiled_moment->getMerchantIds());
        $data['notification'] = array(
           'name' => $notification->getName(),
           'id' => $notification->getId(),
           'smiled_moment_id' => $smiled_moment_id,
           'sc_campaign_id' => $notification->getScCampaignId(),
           'short_description' => $notification->getShortDescription(),
           'long_description' => $notification->getLongDescription(),
           'notiifcation_image' => $notification->getNotificationImage(),
           'merchant_name1' => $merchant_name1->getName(),
           'notiifcation_image_thumb' => $notification->getNotificationImageThumb(),
           'has_weekly_schedule' => $notification->getHasWeeklySchedule(),
           'start_date' => $notification->getNotificationStartDate(),
           'end_date' => $notification->getNotificationEndDate(),
           'distance' => $notification->getDistance(),
           'hours' => $notification->getHours(),
           'merchant_id' => $notification->getScMerchantId(),
           'user_id' => $smiled_moment->getUserId(),
           'username' => $smiled_moment->getUsername(),
           'title' => $smiled_moment->getTitle(),
           'media' => $smiled_moment->getMedia(),
           'media_thumb' => $smiled_moment->getMediaThumb(),
           'location_name' => $smiled_moment->getLocationName(),
           'lat' => $smiled_moment->getLat(),
           'lon' => $smiled_moment->getLon(),
           'merchant_name2' => $merchant_name2->getName(),
           'merchant_ids' => $smiled_moment->getMerchantIds(),
           'weekly_scheduled' => $weekly_scheduled,
           'weekdaytimes' =>  $weekdaytimes
        ); 
        return $this->render('MerchantBundle:Notification:update.html.twig',$data);
    }

    /**
     * @Route("/notification/duplicate/{id}", name="notification_duplicate")
     *  
     */
    public function duplicateAction($id,Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $sysNotification_data = $em->getRepository('MerchantBundle:SystemNotification')->find($id); 
        $smiledMomentData =  $em->getRepository('MerchantBundle:SmiledMoment')->find($sysNotification_data->getSmiledMomentId());
        $notification_weekly_scheduled = $em->getRepository('MerchantBundle:SystemNotificationWeeklySchedule')->findBy(array('sc_system_notification_id' => $id));
      
        $smiledMoment = new SmiledMoment();
        $microtime =  sha1(microtime());
        $referral_code= substr(str_shuffle(MD5(microtime())), 0, 5);
        $smiledMoment->setSmiledId($microtime);
        $smiledMoment->setUserId($smiledMomentData->getUserId());
        $smiledMoment->setUsername($smiledMomentData->getUsername());
        $smiledMoment->setReferralCode($referral_code);
        $smiledMoment->setIsDeleted($smiledMomentData->getIsDeleted()); 
        $smiledMoment->setMedia($smiledMomentData->getMedia());  
        $smiledMoment->setMediaThumb($smiledMomentData->getMediaThumb());  
        $smiledMoment->setImageWidth($smiledMomentData->getImageWidth());
        $smiledMoment->setMerchantIds($smiledMomentData->getMerchantIds());
        $smiledMoment->setTitle($smiledMomentData->getTitle());
        $smiledMoment->setLat($smiledMomentData->getLat());
        $smiledMoment->setLon($smiledMomentData->getLon());
        $smiledMoment->setLocationName($smiledMomentData->getLocationName());
        $smiledMoment->setCreatedValues();
        $em = $this->getDoctrine()->getManager();
        $em->persist($smiledMoment);
        $em->flush();
        if($smiledMoment){
            $sysNotification = new SystemNotification();
            $microtime2 =  sha1(microtime());
            $sysNotification->setId($microtime2);   
            $sysNotification->setName($sysNotification_data->getName());
            $sysNotification->setSmiledMomentId($microtime);
            $sysNotification->setLat($sysNotification_data->getLat());
            $sysNotification->setLon($sysNotification_data->getLon());
            $sysNotification->setScMerchantLat($sysNotification_data->getScMerchantLat());
            $sysNotification->setScMerchantLon($sysNotification_data->getScMerchantLon());
            $sysNotification->setScCampaignId($sysNotification_data->getScCampaignId());
            $sysNotification->setShortDescription($sysNotification_data->getShortDescription());
            $sysNotification->setLongDescription($sysNotification_data->getLongDescription());
            $sysNotification->setHasWeeklySchedule($sysNotification_data->getHasWeeklySchedule());
            $sysNotification->setScMerchantId($sysNotification_data->getScMerchantId());
            $sysNotification->setNotificationImage($sysNotification_data->getNotificationImage());
            $sysNotification->setNotificationImageThumb($sysNotification_data->getNotificationImageThumb());
            $sysNotification->setNotificationStartDate($sysNotification_data->getNotificationStartDate());
            $sysNotification->setNotificationEndDate($sysNotification_data->getNotificationEndDate());
            $sysNotification->setHours($sysNotification_data->getHours());
            $sysNotification->setDistance($sysNotification_data->getDistance());
            $sysNotification->setIsDeleted($sysNotification_data->getIsDeleted()); 
            $sysNotification->setCreatedValues();
            $em->persist($sysNotification);
            $em->flush();  
            if($sysNotification){
                if ($notification_weekly_scheduled) {
                    foreach ($notification_weekly_scheduled as $schedule) {
                        $sysNotificationWeeklySchedule = new SystemNotificationWeeklySchedule();
                        $microtime3 =  sha1(microtime());
                        $sysNotificationWeeklySchedule->setId($microtime3);
                        $sysNotificationWeeklySchedule->setSystemNotificationId($microtime2);
                        $sysNotificationWeeklySchedule->setStartTime($schedule->getStartTime());
                        $sysNotificationWeeklySchedule->setWeekday($schedule->getWeekday());
                        $sysNotificationWeeklySchedule->setIsDeleted($schedule->getIsDeleted()); 
                        $sysNotificationWeeklySchedule->setCreatedValues();
                        $em3 = $this->getDoctrine()->getManager();
                        $em3->persist($sysNotificationWeeklySchedule);
                        $em3->flush();
                    }
                }
            }
        }


        return $this->redirect($this->generateUrl('notification_index'));
        

    }


    public function checkExistName($name){
        $em = $this->getDoctrine()->getManager();
        $name = $em->getRepository('MerchantBundle:SystemNotification')->findOneBy(array('name' => $name));
        if($name){
            return true;
        } else{
            return false; 
        }
    }

    function updateNotiification(Request $request){
        $notification_id = $request->get('notification_id');
        $general_image = $request->files->get('media_image');
        $moments_image = $request->files->get('moment_image');
        $smiled_moment_id = $request->get('smiled_moment_id'); 
        $imageService = new ImageUploadService();
        if ($general_image) {
            $general_upload = $imageService->upload($general_image);
        } else {
            $general_upload = "";
        }
        if ($moments_image) {
            $moments_upload = $imageService->upload($moments_image);
        } else {
            $moments_upload = "";
        }
        if(empty($request->get('latitude')) && empty($request->get('latitude'))){
         return    $status =   array('status' => "failure", "message" =>  'Please Select the location');
          
        }
 
         $em = $this->getDoctrine()->getManager();
         $smiledMoment = $em->getRepository('MerchantBundle:SmiledMoment')->find($smiled_moment_id);
            // if ($smiledMoment === null) {
            //  return   $msg =  "Smiled $smiled_moment_id does not exist.\n";
            //     exit(1);
            // } 
         $referral_code= substr(str_shuffle(MD5(microtime())), 0, 5);
         $smiledMoment->setUserId($request->get('smiled_user_id'));
         $smiledMoment->setUsername($request->get('username'));
         $smiledMoment->setReferralCode($referral_code);
         $smiledMoment->setMerchantIds($request->get('sc_merchant_id'));
         $smiledMoment->setTitle($request->get('title'));
         $smiledMoment->setLat($request->get('latitude'));
         $smiledMoment->setLon($request->get('longitude'));
         $smiledMoment->setLocationName($request->get('location_name'));
         $smiledMoment->setCreatedValues();
         if ($moments_image) 
            {
                $smiledMoment->setMedia($moments_upload['path']);
                $smiledMoment->setMediaThumb($moments_upload['thumb_path']);
                $smiledMoment->setImageWidth($moments_upload['width']);
                $smiledMoment->setImageHeight($moments_upload['height']);
            }
         $em->flush();
         if ($smiledMoment) {
            $sysNotification = $em->getRepository('MerchantBundle:SystemNotification')->find($notification_id);
            // if ($sysNotification === null) {
            //     return $msg =  "System Notification $notification_id does not exist.\n";
            //     exit(1);
            // }
            $sysNotification->setName($request->get('name'));
            $sysNotification->setLat($request->get('latitude'));
            $sysNotification->setLon($request->get('longitude'));
            $sysNotification->setScMerchantLat($request->get('longitude'));
            $sysNotification->setScMerchantLon($request->get('longitude'));
            $sysNotification->setScCampaignId($request->get('campaign_id'));
            $sysNotification->setShortDescription($request->get('short_description'));
            $sysNotification->setLongDescription($request->get('long_description'));
            $sysNotification->setHasWeeklySchedule($request->get('has_weekly_scheduled'));
            $sysNotification->setScMerchantId($request->get('notification_dist_merchant'));
            if ($general_upload) {
                $sysNotification->setNotificationImage($general_upload['path']);
                $sysNotification->setNotificationImageThumb($general_upload['thumb_path']);
            }
            $sysNotification->setNotificationStartDate(new \DateTime($request->get('notification_start_date')));
            $sysNotification->setNotificationEndDate(new \DateTime($request->get('notification_end_date')));
            $sysNotification->setHours($request->get('hours'));
            $sysNotification->setDistance($request->get('distance'));
            $sysNotification->setCreatedValues();
            $em->flush(); 
            if($sysNotification){
 
                $sysNotificationWeeklySchedul = $em->getRepository('MerchantBundle:SystemNotificationWeeklySchedule')->findBy(array('sc_system_notification_id' => $notification_id));  
               
                foreach($sysNotificationWeeklySchedul as $snwid){
                $sn=$em->getRepository('MerchantBundle:SystemNotificationWeeklySchedule')->find($snwid->getId());
                $em->remove($sn);
                $em->flush(); 
                }
                $weekdaytimes = $request->get('weekdaytimes'); 
                if ($weekdaytimes) {
                    $weekdaytimehas = explode(',', $weekdaytimes);
                    $separate = array();
                  
                    foreach ($weekdaytimehas as $w) {
                        // $sysNotificationWeeklySchedule = $em->getRepository('MerchantBundle:SystemNotificationWeeklySchedule')->findOneBy(array('sc_system_notification_id' => $notification_id));  
                        // $em->remove($sysNotificationWeeklySchedule);
                        // $em->flush();
                      //  if ($sysNotificationWeeklySchedule === null) {
                           
                        $sysNotificationWeeklySchedule = new SystemNotificationWeeklySchedule();
                        $separate = explode('-', $w);
                        $weekday = $separate[0];
                        $time = $separate[1];
                        $microtime3 =  sha1(microtime());
                        $sysNotificationWeeklySchedule->setId($microtime3);
                        $sysNotificationWeeklySchedule->setSystemNotificationId($notification_id);
                        $sysNotificationWeeklySchedule->setStartTime($time);
                        $sysNotificationWeeklySchedule->setWeekday($weekday);
                        $sysNotificationWeeklySchedule->setCreatedValues();
                        $em->persist($sysNotificationWeeklySchedule);
                        $em->flush();
                       // }
                    }
                } 
            }
             
            $status =   array('status' => "success", "message" =>  'Updated Succefully');
         } 
 
        return $status ;
      
    }

    function createNotification(Request $request){

        if(empty($request->get('name'))){
           return   $status =   array('status' => "failure", "message" =>  'Please Enter the Name');   
        }
        if(empty($request->get('latitude')) && empty($request->get('latitude'))){
           return $status = array('status' => "failure", "message" =>  'Please Select the location');   
        }
        $checkExist =  $this->checkExistName($request->get('name')); 
        if($checkExist == true){
           return $status =  array('status' => "failure", "message" =>  'Notification Name Already Exist'); 
        }  
        $general_image = $request->files->get('media_image');
        $moments_image = $request->files->get('moment_image');

        $imageService = new ImageUploadService();
        if ($general_image) {
            $general_upload = $imageService->upload($general_image);
        } else {
            $general_upload = "";
        }
        if ($moments_image) {
            $moments_upload = $imageService->upload($moments_image);
        } else {
            $moments_upload = "";
        }
 
        if(empty($request->get('latitude')) && empty($request->get('latitude'))){
          return  $status = array('status' => "failure", "message" =>  'Please Select the location');
        }

        $smiledMoment = new SmiledMoment();
        $microtime =  sha1(microtime());
        $referral_code= substr(str_shuffle(MD5(microtime())), 0, 5);
        $smiledMoment->setSmiledId($microtime);
        $smiledMoment->setUserId($request->get('smiled_user_id'));
        $smiledMoment->setUsername($request->get('username'));
        $smiledMoment->setReferralCode($referral_code);
        $smiledMoment->setIsDeleted($request->get('is_deleted'));     
        if ($moments_image) {
            $smiledMoment->setMedia($moments_upload['path']);
            $smiledMoment->setMediaThumb($moments_upload['thumb_path']);
            $smiledMoment->setImageWidth($moments_upload['width']);
            $smiledMoment->setImageHeight($moments_upload['height']);
        }
         $smiledMoment->setMerchantIds($request->get('sc_merchant_id'));
         $smiledMoment->setTitle($request->get('title'));
         $smiledMoment->setLat($request->get('latitude'));
         $smiledMoment->setLon($request->get('longitude'));
         $smiledMoment->setLocationName($request->get('location_name'));
         //$smiledMoment->setCreatedOn1(1274123617);
         $smiledMoment->setCreatedValues();
         //$smiledMoment->setCreatedValues();
        // $smiledMoment->setCreatedOn(getCreatedOn());
      // var_dump($smiledMoment); exit;
        $em = $this->getDoctrine()->getManager();
        $em->persist($smiledMoment);
        $em->flush();
       
        if ($smiledMoment) {
            $microtime2 =  sha1(microtime());
            $smiled_moment_id = $smiledMoment->getSmiledId();
            $sysNotification = new SystemNotification();
            $sysNotification->setId($microtime2); 
            $sysNotification->setSmiledMomentId($microtime);
            $sysNotification->setName($request->get('name'));
            $sysNotification->setLat($request->get('latitude'));
            $sysNotification->setLon($request->get('longitude'));
            $sysNotification->setIsDeleted($request->get('is_deleted'));    
            $sysNotification->setScMerchantLat($request->get('latitude'));
            $sysNotification->setScMerchantLon($request->get('longitude'));
            $sysNotification->setScCampaignId($request->get('campaign_id'));
            $sysNotification->setShortDescription($request->get('short_description'));
            $sysNotification->setLongDescription($request->get('long_description'));
            $sysNotification->setHasWeeklySchedule($request->get('has_weekly_scheduled'));
            $sysNotification->setScMerchantId($request->get('notification_dist_merchant'));
            if ($general_upload) {
                $sysNotification->setNotificationImage($general_upload['path']);
                $sysNotification->setNotificationImageThumb($general_upload['thumb_path']);
            }
            $sysNotification->setNotificationStartDate(new \DateTime($request->get('notification_start_date')));
            $sysNotification->setNotificationEndDate(new \DateTime($request->get('notification_end_date')));
            $sysNotification->setHours($request->get('hours'));
            $sysNotification->setDistance($request->get('distance'));
            $sysNotification->setCreatedValues();
            
            $em2 = $this->getDoctrine()->getManager();
            $em2->persist($sysNotification);
            $em2->flush();
            if ($sysNotification) {
                $notification_id = $sysNotification->getId();
                $weekdaytimes = $request->get('weekdaytimes');
                
                if ($weekdaytimes) {
                    $weekdaytimehas = explode(',', $weekdaytimes);
                    $separate = array();
                    foreach ($weekdaytimehas as $w) {
                        $sysNotificationWeeklySchedule = new SystemNotificationWeeklySchedule();
                        $separate = explode('-', $w);
                        $weekday = $separate[0];
                        $time = $separate[1];
                        $microtime3 =  sha1(microtime());
                        $sysNotificationWeeklySchedule->setId($microtime3);
                        $sysNotificationWeeklySchedule->setSystemNotificationId($microtime2);
                        $sysNotificationWeeklySchedule->setStartTime($time);
                        $sysNotificationWeeklySchedule->setWeekday($weekday);
                        $sysNotificationWeeklySchedule->setCreatedValues();
                        $sysNotificationWeeklySchedule->setIsDeleted($request->get('is_deleted')); 
                        $em3 = $this->getDoctrine()->getManager();
                        $em3->persist($sysNotificationWeeklySchedule);
                        $em3->flush();
                    }
                }
            }
            $status = array('status' => "success", "message" =>  'Saved Data Successfully');
        } else {
            $status = array('status' => "failure", "message" =>  'Saved Data Unsuccessfully');
        }

        return $status; 
    
    }


    /**
     * @Route("/notification/savedata", name="notification_save")
     *
     */
    public function savedataAction(Request $request)
    {
        $response = new JsonResponse();
        $notification_id =  $request->get('notification_id');  
        if($request->get('notification_id') && $request->get('smiled_moment_id')){
           $result =  $this->updateNotiification($request); 
        } else {
            $result =  $this->createNotification($request); 
        }
        $response->setData($result);
        return $response;
    }


     /**
     * @Route("/notification/delete/{id}", name="notification_delete")
     *
     */
    public function deleteAction($id, Request $request)
    {
        
        $em = $this->getDoctrine()->getManager();
        $notification = $em->getRepository('MerchantBundle:SystemNotification')->find($id);
        if (!$notification) {
        throw $this->createNotFoundException('Not found for ID:'.$id);
        }
        $smiled_moment_id = $notification->getSmiledMomentId();
        $smiled_moment = $em->getRepository('MerchantBundle:SmiledMoment')->find($smiled_moment_id);
        $notification_weekly_scheduled = $em->getRepository('MerchantBundle:SystemNotificationWeeklySchedule')->findBy(array('sc_system_notification_id' => $id));
       // var_dump(  $notification_weekly_scheduled);
        $em->remove($notification);
        $em->remove($smiled_moment);
        foreach($notification_weekly_scheduled as $nw){
 
            $em->getRepository('MerchantBundle:SystemNotificationWeeklySchedule')->find($nw->getId());
            $em->remove($nw);
        }

        $em->flush();
        return $this->redirect($this->generateUrl('notification_index'));
        //return $this->render('MerchantBundle:Notification:update.html.twig', $data);
    }


    /**
     * @Route("/getcampaigns", name="notification_getcampaigns")
     *
     */
    public function campaignsAction()
    {
        $em = $this->getDoctrine()->getManager();
        $campaigns = $em->createQuery('select c from MerchantBundle:Campaign c')
            ->getResult(\Doctrine\ORM\Query::HYDRATE_ARRAY);

        if ($campaigns) {
            foreach($campaigns as $campaign){
                $names[] = array(
                    'id' => $campaign['id'],
                    'campaign_name' => $campaign['campaign_name'],
                );
            }
            $status = Codes::HTTP_OK;
        } else {
            $status = Codes::HTTP_BAD_REQUEST;
        }
        return new JsonResponse($names, $status);
    }

    /**
     * @Route("/getmerchants", name="notification_getmerchants")
     *
     */
    public function merchantsAction()
    {
        $em = $this->getDoctrine()->getManager();
        $merchants = $em->createQuery('select m from MerchantBundle:Merchant m')
            ->getResult(\Doctrine\ORM\Query::HYDRATE_ARRAY);
        if ($merchants) {
            foreach($merchants as $merchant){
                $names[] = array(
                    'id' => $merchant['id'],
                    'name' => $merchant['name'],
                );
            }
            $status = Codes::HTTP_OK;
        } else {
            $status = Codes::HTTP_BAD_REQUEST;
        }
        return new JsonResponse($names, $status);
    }

    /**
     * @Route("/getsmiledusers", name="notification_smiledusers")
     *
     */
    public function smiledusersAction()
    {
        $em = $this->getDoctrine()->getManager();
        $smiledusers = $em->createQuery('select m from MerchantBundle:UserProfile m')
            ->getResult(\Doctrine\ORM\Query::HYDRATE_ARRAY);
        
        if ($smiledusers) {
            foreach($smiledusers as $user){
                $names[] = array(
                    'userid' => $user['user_id'],
                    'username' => $user['username'],
                );
            }
            $status = Codes::HTTP_OK;
        } else {
            $status = Codes::HTTP_BAD_REQUEST;
        }
        return new JsonResponse($names, $status);
    }

    /**
     * @Route("/autocomplete/users/search", name="notification_autocomplete_getsmiledusers")
     *
     */

    public function autocompleteuserAction(Request $request)
    {
        $names = array();
        $term = trim(strip_tags($request->get('term')));
        $em = $this->getDoctrine()->getManager();
        $entities = $em->getRepository('MerchantBundle:UserProfile')->createQueryBuilder('u')
            ->andWhere('u.username LIKE :username')
            ->setParameter('username', '%' . $term . '%')
            ->getQuery()
            ->getResult();
        foreach ($entities as $entity) {
            $names[] = array(
                'name' => $entity->getUserId(),
                'value' => $entity->getUsername(),

            );

        }
        $response = new JsonResponse();
        $response->setData($names);
        return $response;
    }

    /**
     * @Route("/autocomplete/merchant/search", name="notification_autocomplete_getmerchants")
     *
     */

    public function autocompletemerchantAction(Request $request)
    {
        $names = array();
        $term = trim(strip_tags($request->get('term')));
        $em = $this->getDoctrine()->getManager();
        $entities = $em->getRepository('MerchantBundle:Merchant')->createQueryBuilder('c')
            ->where('c.name LIKE :name')
            ->setParameter('name', '%' . $term . '%')
            ->getQuery()
            ->getResult();

        foreach ($entities as $entity) {
            //  $names[] = $entity->getName();
            $names[] = array(
                'name' => $entity->getId(),
                'value' => $entity->getName(),

            );
            //  $names[] = $entity->getName();
        }
        $response = new JsonResponse();
        $response->setData($names);
        return $response;
    }
 
}
