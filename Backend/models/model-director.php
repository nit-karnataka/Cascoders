<?php

require_once '../database/connection.php';

class ModelDirector
{ 

    public function viewProposals() //All which are approved by the guide and sent by secretary
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="select * from documents where document_description like 'proposal' and document_status = 2;";
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

    public function viewBudgets() //Budget of all the files which are in its initial stage
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="select * from documents where document_description like 'budget' and document_status = 0;";
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
    
    public function approveProjects($studentID) //sends the file to the secretary  (proposal is approved)
    {
        global $conn;
        $data=array('status'=>'false');
        $data1=array('status1'=>'false');
        $sql="update documents set document_status = 3 where student_ID like '$studentID' and document_description like 'proposal';";
        $sql1="update documents set document_status = 1 where student_ID like '$studentID' and document_description like 'budget';";
        $result=$conn->query($sql);
        if($result === TRUE)
        {
            $data=array('status'=>'true');
        }
        else{
        }
        $result1=$conn->query($sql1);
        if($result1 === TRUE)
        {
            $data1=array('status1'=>'true');
        }
        else{
        }
        return array_merge($data,$data1);

        /*
        INSERT CODE FOR MAILING
        */
    }

    

    public function disapproveProject($studentID) 
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="update documents set document_status = 0 where student_ID like '$studentID' and document_description like 'proposal';";
        $result=$conn->query($sql);
        if($result === TRUE)
        {
            $data=array('status1'=>'true');
        }
        else{
        }
        return $data;

        /*
        NOW SEND THE MAIL TO GUIDES AND STUDENT 
        */
    }

    public function viewIndividualProposal($studentID)
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="select document from documents where student_ID like '$studentID' and document_description like 'proposal'";
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
    public function viewIndividualBudget($studentID)
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="select document from documents where student_ID like '$studentID' and document_description like 'budget'";
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


}
