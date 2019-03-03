<?php
//$directorID = $_REQUEST['DirectorID'];

require_once '../models/model-director.php';

$studentID='1';
/*$studentName='Jane Doe';
$degree='MD';
$email='jdoe93@gmail.com';
$guideID='10000';
$guideName='Madhav Mukund';
$guide_email = 'mmukund@gmail.com';
$projectID='PD2016';
$projectname='Brain research';
$guideID = '10000';*/
$guideID = '10001';
$guideName= 'Prakash Suraj';
$guide_email = 'psuraj78@gmail.com';


$directorObject = new ModelDirector;

//$action = $_REQUEST['action'];
$action = 'addGuides';
    switch($action){
        
        case 'viewProposals':
            //$studentID = $_REQUEST['student_ID'];
            $var = $directorObject->viewProposals($studentID);
            echo json_encode($var);
            break;

        case 'addProjects':
            /*$studentID=$_REQUEST['studentID'];
            $projectID=$projectname=$REQUEST['projectID'];
            $guideID=$_REQUEST['guideID'];*/
            $var = $directorObject->addProjects($studentID,$projectID,$projectname,$guideID);
            echo json_encode($var);
            break;
        

    }
        
        