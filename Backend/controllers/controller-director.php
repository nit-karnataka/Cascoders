<?php
//$directorID = $_REQUEST['DirectorID'];

require_once '../models/model-director.php';
/*
$studentID='2';
/*$studentName='Jane Doe';
$degree='MD';
$email='jdoe93@gmail.com';
$guideID='10000';
$guideName='Madhav Mukund';
$guide_email = 'mmukund@gmail.com';
$projectID='PD2016';
$projectname='Brain research';
$guideID = '10000';
$guideID = '10001';
$guideName= 'Prakash Suraj';
$guide_email = 'psuraj78@gmail.com';
*/

$directorObject = new ModelDirector;

$action = $_REQUEST['action'];
//$action = 'viewIndividualBudget';
    switch($action){
        
        case 'viewProposals':
            $var = $directorObject->viewProposals();
            echo json_encode($var);
            break;

        case 'viewBudgets':
            $var1 = $directorObject->viewBudgets();
            echo json_encode($var1);
            break;
        
        case 'approveProjects':
            $studentID = $_REQUEST['studentID'];
            $var1 = $directorObject->approveProjects($studentID);
            echo json_encode($var1);
            break;

        case 'disapproveProjects':
            $studentID = $_REQUEST['studentID'];
            $var1 = $directorObject->disapproveProject($studentID);
            echo json_encode($var1);
            break;

        case 'viewIndividualProposal':
            $studentID = $_REQUEST['studentID'];
            $var1 = $directorObject->viewIndividualProposal($studentID);
            echo json_encode($var1);
            break;
        
        case 'viewIndividualBudget':
            $studentID = $_REQUEST['studentID'];
            $var1 = $directorObject->viewIndividualBudget($studentID);
            echo json_encode($var1);
            break;
                
            

    }
        
        