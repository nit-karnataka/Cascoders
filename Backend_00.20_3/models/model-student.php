<?php

require_once '../database/connection.php';

class ModelStudent
{
    public function getProposal($studentID)
    {
        global $conn;
        $data = array('status1' => 'false');
        $sql = "select document from documents where document_description like 'proposal' and student_ID = '$studentID';";
        $result = $conn->query($sql);
        
        if ($result->num_rows > 0) {
            $arr = [];
            while($row = $result->fetch_assoc())
            {
                array_push($arr,$row);
            }
            $data=array('status1'=>'true');
            $dataval=array('documents'=>$arr);
            #Check if Tanmay wants to merge dataval or arr directly
            return array_merge($data,$dataval);
        } else{
            $dataval = array('result'=>'No Entries Found');
            return array_merge($data,$dataval);
        }

    }
    
    public function addProposals($document,$documentname,$studentID)
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="insert into documents values('$document','$documentname',0,'proposal',CURRENT_TIMESTAMP,'PD0','$studentID');";
        $result = $conn->query($sql);
        if ($result === TRUE) {
            $data=array('status'=>'true');
            return $data;
        } else {
            return $data;
        }
    }

    public function viewSubmittedProposals($studentID)
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="select document,document_name,document_status,submission_time from documents where student_ID like '$studentID';";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $arr = [];
            while($row = $result->fetch_assoc())
            {
                array_push($arr,$row);
            }
            $data=array('status1'=>'true');
            $dataval=array('documents'=>$arr);
            #Check if Tanmay wants to merge dataval or arr directly
            return array_merge($data,$dataval);
        } else{
            $dataval = array('result'=>'No Entries Found');
            return array_merge($data,$dataval);
        } 
    }

    public function viewProjects($studentID)
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="select * from projects where project_ID in (select project_ID from project_student_mapping where student_ID like '$studentID');";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $arr = [];
            while($row = $result->fetch_assoc())
            {
                array_push($arr,$row);
            }
            $data=array('status1'=>'true');
            $dataval=array('documents'=>$arr);
            #Check if Tanmay wants to merge dataval or arr directly
            return array_merge($data,$dataval);
        } else{
            $dataval = array('result'=>'No Entries Found');
            return array_merge($data,$dataval);
        }
    }

    public function viewGuides()
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="select * from guides;";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $arr = [];
            while($row = $result->fetch_assoc())
            {
                array_push($arr,$row);
            }
            $data=array('status1'=>'true');
            $dataval=array('documents'=>$arr);
            #Check if Tanmay wants to merge dataval or arr directly
            return array_merge($data,$dataval);
        } else{
            $dataval = array('result'=>'No Entries Found');
            return array_merge($data,$dataval);
        }
    }

    public function addPrincipleGuide($guideID,$studentID)
    {
        global $conn;
        $data=array('status1'=>'false');
        $data1= array('status'=>'false');
        $sql="UPDATE students set guide_ID = '$guideID' where student_ID like '$studentID';";
        $sql1="insert into student_guide_mapping values('$studentID','$guideID')";
        $result = $conn->query($sql);
        $result1 = $conn->query($sql1);

        if ($result === TRUE) {
            $data=array('status'=>'true');
            //return $data;
        } else {
            //return $data;
        }
        if ($result1 === TRUE) {
            $data1=array('status'=>'true');
            return array_merge($data,$data1);
        } else {
            return array_merge($data,$data1);
        }

    }

    public function addOtherGuides($guideID,$studentID)
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="insert into student_guide_mapping values('$studentID','$guideID');";
        $result = $conn->query($sql);

        if ($result === TRUE) {
            $data=array('status'=>'true');
            return $data;
        } else {
            return $data;
        }
    }

    public function viewOwnGuides($studentID)
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="select * from guides where guide_ID in (select guide_ID from student_guide_mapping where student_ID like '$studentID');";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $arr = [];
            while($row = $result->fetch_assoc())
            {
                array_push($arr,$row);
            }
            $data=array('status1'=>'true');
            $dataval=array('documents'=>$arr);
            #Check if Tanmay wants to merge dataval or arr directly
            return array_merge($data,$dataval);
        } else{
            $dataval = array('result'=>'No Entries Found');
            return array_merge($data,$dataval);
        }

    }

    public function addDocuments($document,$documentname,$studentID,$description,$projectID)
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="insert into documents values('$document','$documentname',0,'$description',CURRENT_TIMESTAMP,'$projectID','$studentID');";
        $result = $conn->query($sql);
        if ($result === TRUE) {
            $data=array('status'=>'true');
            return $data;
        } else {
            return $data;
        }
    }

    



    
}