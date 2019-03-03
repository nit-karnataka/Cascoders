<?php
$studentID = $_REQUEST['studentID'];

require_once '../models/model-student.php';

$studentObject = new ModelStudent;

/*$documentID='drive.google.com/link_href?=bad_example';
$documentname='example_document';
$studentID='2';
$guideID = '10001';*/

$action = $_REQUEST['action'];
//$action = 'viewOwnGuides';
    switch($action){
        case 'addProposals':
            $document = $_REQUEST['document'];
            $documentname = $_REQUEST['documentname'];
            $var1 = $studentObject->addProposals($document,$documentname,$studentID);
            echo json_encode($var1);
            break;

        case 'viewSubmittedProposals':
            $var1 = $studentObject->viewSubmittedProposals($studentID);
            echo json_encode($var1);
            break;

        case 'viewProjects':
            $var1 = $studentObject->viewProjects($studentID);
            echo json_encode($var1);
            break;

        case 'viewGuides':
            $var1 = $studentObject->viewGuides($studentID);
            echo json_encode($var1);
            break;
        

        case 'addPrincipleGuide':
            $var1 = $studentObject->addPrincipleGuide($guideID,$studentID);
            echo json_encode($var1);
            break;

        case 'addOtherGuides':
            $var1 = $studentObject->addOtherGuides($guideID,$studentID);
            echo json_encode($var1);
            break;
        
        case 'viewOwnGuides':
            $var1 = $studentObject->viewOwnGuides($studentID);
            echo json_encode($var1);
            break;

        case 'addDocuments':
            $document = $_REQUEST['document'];
            $documentname = $_REQUEST['documentname'];
            $var1 = $studentObject->addBudget($document,$documentname,$studentID);
            echo json_encode($var1);
            break;

        case 'getProposal':
            $var1 = $studentObject->getProposal($studentID);
            echo json_encode($var1);
            break;
        
        
        
    }