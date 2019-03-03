<?php
$guideID = $_REQUEST['guideID'];

//$guideID = '10000';

require_once '../models/model-guide.php';

$guideObject = new ModelGuide;

require_once '../PHPMailer/mail.php';
global $mail;


$action = $_REQUEST['action'];
//$action = 'viewPrincipleProjects';
    switch($action){
        case 'viewProposals':
            $var1 = $guideObject->viewProposals($guideID);
            echo json_encode($var1);
            break;

        case 'approveProposals':
            $var1 = $guideObject->approveProposals($guideID);

            $sql = "select DISTINCT student_email from students;";
            $result=$conn->query($sql);
            if ($result->num_rows > 0) {
                $arr = [];
                while($row = $result->fetch_assoc())
                {
                    array_push($arr,$row['student_email']);
                }
            } 
            
            
            $mail->isHTML(true);
            $mail->Subject = "Proposal Approval";
            $mail->Body = "Your Proposal was disapproved by IRB .";
            $mail->AltBody = "This is the plain text version of the email content";
            foreach($arr as $value)
            {
                //$value = (string)$value;
                //echo $value."<br>";
                $mail->addAddress($value);
                $mail->send();
            }

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
        
}