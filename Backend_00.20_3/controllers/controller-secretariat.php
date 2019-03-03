<?php
//$secretariatID = $_REQUEST['secretariat'];

require_once '../models/model-secretariat.php';
/*
$studentID = '1' ;
$studentName = 'Hanoz';
$degree = 'PHD';
$email = 'yogenyat.com';
$guideID = '10001';
*/
$secretariatObject = new ModelSecretariat;

$guideID = '10002';
$guideName= 'Joel';
$desination = 'CarWale';
$department = 'IT';
$contactNo = '222222';
$guide_email = 'joel@gmail.com';

//$action = $_REQUEST['action'];
$action = 'addGuides';
    switch($action){
        case 'viewProposalBeforeDirector':
            $var1 = $secretariatObject->viewProposalBeforeDirector();
            echo json_encode($var1);
            break;
        
        case 'viewProposalAfterDirector':
            $var1 = $secretariatObject->viewProposalAfterDirector();
            echo json_encode($var1);
            break;
        
        case 'approveDocumentsBeforeDirector':
            //$studentID = $_REQUEST['studentID'];
            $var1 = $secretariatObject->approveDocumentsBeforeDirector($studentID);
            echo json_encode($var1);
            break;
            
        case 'setMeetingsWithIRB':
            /*$studentID=$_REQUEST['studentID'];
            $projectID=$_REQUEST['projectID'];
            $projectname=$_REQUEST['projectname'];
            $guideID=$_REQUEST['guideID'];*/
            $var = $secretariatObject->setMeetingsWithIRB($studentID,$projectID,$projectname,$guideID);
            echo json_encode($var);
            break;

        case 'addStudents':
            /*$studentID = $_REQUEST['studentID'];
            $studentName = $_REQUEST['studentName'];
            $degree = $_REQUEST['degree'];
            $email = $_REQUEST['email'];*/
            $var = $secretariatObject->addStudents($studentID,$studentName,$degree,$email);
            echo json_encode($var);
            break;

        case 'addGuides':
            /*$guideID = $_REQUEST['guideID'];
            $guideName= $_REQUEST['guideName'];
            $designation = $_REQUEST['designation'];
            $department = $_REQUEST['department'];
            $contactNo = $_REQUEST['contactNo'];
            $guide_email = $_REQUEST['guide_email'];*/
            $var = $secretariatObject->addGuides($guideID,$guideName,$designation,$department,$contactNo,$guide_email);
            echo json_encode($var);
            break;

        
            
        
    }
