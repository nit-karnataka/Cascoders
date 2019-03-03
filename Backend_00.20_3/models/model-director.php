<?php

require_once '../database/connection.php';

class ModelDirector
{ 

    public function viewProposals()
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="select * from documents where document_description like 'proposal' and document_status = 3;";
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
    
    #this is the function where we have to deal with the budget form
    
    public function approveProjects($studentID)
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="update documents set document_Status = 4 where student_ID like '$studentID' and document_description like 'proposal';";
        $result=$conn->query($sql);
        if($result === TRUE)
        {
            $data=array('status1'=>'true');
        }
        else{
        }
        return $data;
    }


}
