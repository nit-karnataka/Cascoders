<?php

require_once '../database/connection.php';

class ModelStudent
{
    public function addProposals($document,$documentname,$studentID)
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="insert into documents values('$document','$documentname',0,'proposal',CURRENT_TIMESTAMP,'PD0','$studentID',NULL);";
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
        $sql="select document,document_name,document_status,submission_time from documents where student_ID like '$studentID' and document_description = 'proposal';";
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
        $sql="insert into documents values('$document','$documentname',0,'$description',CURRENT_TIMESTAMP,'$projectID','$studentID',NULL);";
        $result = $conn->query($sql);
        if ($result === TRUE) {
            $data=array('status'=>'true');
            return $data;
        } else {
            return $data;
        }
    }

    public function getMaterials()
    {
        global $conn;
        $data = array('status1' => 'false');
        $sql = "select * from materials;";
        $result = $conn->query($sql);
        
        if ($result->num_rows > 0) {
            $arr = [];
            while($row = $result->fetch_assoc())
            {
                array_push($arr,$row['materials']);
            }
            $data=array('status1'=>'true');
            $dataval = array('materials'=>$arr);
            #Check if Tanmay wants to merge dataval or arr directly
            return array_merge($data,$dataval);    
        } else{
            $dataval = array('result'=>'No Entries Found');
            return array_merge($data,$dataval);
        }
    }

    public function addBudget($document,$documentname,$studentID)
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="insert into documents values('$document','$documentname',0,'budget',CURRENT_TIMESTAMP,'PD0','$studentID');";
        $result = $conn->query($sql);
        if ($result === TRUE) {
            $data=array('status'=>'true');
            return $data;
        } else {
            return $data;
        }
    }

    #function
    function fetchProjects($projectID)
    {
        global $conn;
        $data = array('status'=>'false');

        $sql = "select * from projects where projects.project_ID like '$projectID';";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $arr = [];
            while($row = $result->fetch_assoc())
            {
                array_push($arr,$row);
            }
            $data=array('status'=>'true');
            $dataval=array('deadlines'=>$arr);
            #Check if Tanmay wants to merge dataval or arr directly
            return array_merge($data,$dataval);
        } else{
            $dataval = array('result'=>'No Entries Found');
            return array_merge($data,$dataval);
        }
    }

    function viewDocuments($projectID)
    {
        global $conn;
        $data = array('status'=>'false');

        $sql = "select * from documents where project_ID like '$projectID';";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $arr = [];
            while($row = $result->fetch_assoc())
            {
                array_push($arr,$row);
            }
            $data=array('status'=>'true');
            $dataval=array('documents'=>$arr);
            #Check if Tanmay wants to merge dataval or arr directly
            return array_merge($data,$dataval);
        } else{
            $dataval = array('result'=>'No Entries Found');
            return array_merge($data,$dataval);
        }
    }

    public function viewBudget($studentID)
    {
        global $conn;
        $data = array('status'=>'false');

        $sql = "select DOCUMENT from documents where student_ID like '$studentID' and document_description like 'budget'; ";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $arr = [];
            while($row = $result->fetch_assoc())
            {
                array_push($arr,$row);
            }
            $data=array('status'=>'true');
            $dataval=array('documents'=>$arr);
            #Check if Tanmay wants to merge dataval or arr directly
            return array_merge($data,$dataval);
        } else{
            $dataval = array('result'=>'No Entries Found');
            return array_merge($data,$dataval);
        }
    }

    public function viewQueryLetters($projectID)
    {
        global $conn;
        $data = array('status'=>'false');

        $sql = "select * from documents where project_ID like '$projectID' and document_desription like 'Query Letter';";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $arr = [];
            while($row = $result->fetch_assoc())
            {
                array_push($arr,$row);
            }
            $data=array('status'=>'true');
            $dataval=array('documents'=>$arr);
            #Check if Tanmay wants to merge dataval or arr directly
            return array_merge($data,$dataval);
        } else{
            $dataval = array('result'=>'No Entries Found');
            return array_merge($data,$dataval);
        }
    }

    public function viewSubmittedProposalwithTime($studentID,$submission_time)
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="select document,document_name,document_status,submission_time from documents where student_ID like '$studentID' and document_description = 'proposal' and submission_time like '$submission_time';";
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



    
}