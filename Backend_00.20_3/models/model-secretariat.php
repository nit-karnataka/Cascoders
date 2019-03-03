<?php

//2 functions needed are a)viewbeforedirector b) viewAfterDirector//schedule meetings
require_once '../database/connection.php';

class ModelSecretariat
{
    public function viewProposalBeforeDirector()
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="select * from documents where document_description like 'proposal' and document_status = 2";
        $result=$conn->query($sql);
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
    public function viewProposalAfterDirector()
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="select * from documents where document_description like 'proposal' and document_status = 4";
        $result=$conn->query($sql);
        if ($result->num_rows > 0) {
            $arr = [];
            while($row = $result->fetch_assoc())
            {
                array_push($arr,$row);
            }
            $data=array('status1'=>'true');
            $dataval=array('documents'=>$arr);
            return array_merge($data,$dataval);
        } else{
            $dataval = array('result'=>'No Entries Found');
            return array_merge($data,$dataval);
        }
    }
    
    public function approveDocumentsBeforeDirector($studentID)
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="update documents set document_Status = 3 where student_ID like '$studentID' and document_description like 'proposal';";
        $result=$conn->query($sql);
        if($result === TRUE)
        {
            $data=array('status1'=>'true');
        }
        else{
        }
        return $data;
    }

    public function setMeetingsWithIRB($studentID,$projectID,$projectname,$guideID)
    {
        global $conn;
        $data=array('status'=>'false');
        $data1=array('status1'=>'false');
        $data2=array('status2'=>'false');
        
        $sql = "insert into projects values('$projectID','$projectname',NULL,NULL,0,'$guideID',NULL,NULL);";
        $sql1 = "update documents set project_ID = '$projectID',document_status = 5 where student_ID like '$studentID';";
        $sql2 = "insert into project_student_mapping values('$studentID','$projectID');";
        $result = $conn->query($sql);
    
        if ($result === TRUE) {
            $data=array('status'=>'true');
            $result1=$conn->query($sql1);
            if($result1 === TRUE) {
                $data1=array('status1'=>'true');
                $result2=$conn->query($sql2);
                if($result2 === TRUE)
                {
                    $data2=array('status2'=>'true');
                }
                return array_merge($data,$data1,$data2);
            }
        } else {
            return $data;
        }

    }

    public function addStudents($studentID,$studentName,$degree,$email)
    {
        global $conn;
        $data=array('status'=>'false');
        $sql1="insert into students values('$studentID','$studentName','$degree','$email',NULL);";
        $result = $conn->query($sql1);
    
        if ($result === TRUE) {
            $data=array('status'=>'true');
            return $data;
        } else {
            return $data;
        }
    }

    public function addGuides($guideID,$guideName,$desination,$department,$contactNo,$guide_email)
    {
        global $conn;
        $data=array('status'=>'false');
        $sql1="insert into guides values('$guideID','$guideName','$desination','$department','$contactNo','$guide_email');";
        $result = $conn->query($sql1);
    
        if ($result === TRUE) {
            $data=array('status'=>'true');
            return $data;
        } else {
            return $data;
        }
    }
}