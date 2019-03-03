<?php
//$guideID = $_REQUEST['guideID'];

$guideID = '10000';

require_once '../models/model-guide.php';

$guideObject = new ModelGuide;

//$action = $_REQUEST['action'];
$action = 'viewPrincipleProjects';
    switch($action){
        case 'viewProposals':
            $var1 = $guideObject->viewProposals($guideID);
            echo json_encode($var1);
            break;

        case 'approveProposals':
            $var1 = $guideObject->approveProposals($guideID);
            echo json_encode($var1);
            break;
        
        case 'viewPrincipleProjects':
            $var1 = $guideObject->viewPrincipleProjects($guideID);
            echo json_encode($var1);
            break;
        
        case 'viewParticipatingProjects':
            $var1 = $guideObject->viewParticipatingProjects($guideID);
            echo json_encode($var1);
            break;
        
        case 'addOtherGuides':
            //$projectID = $_REQUEST['projectID'];
            $var1 = $guideObject->addOtherGuides($guideID,$projectID);
            echo json_encode($var1);
            break;
}