<?php

require_once '../database/connection.php';

class ModelGuide
{ 
    public function approveProposals($guideID)
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="update documents set document_status = 2 where student_ID like (select student_ID from students where guide_ID like '$guideID') and document_description like 'proposal';";
        $result=$conn->query($sql);
        if($result === TRUE)
        {
            $data=array('status1'=>'true');
        }
        else{
        }
        return $data;
    }

    public function viewProposals($guideID)
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="select document,document_name,submission_time,student_ID from documents where student_ID in (select student_ID from students where guide_ID like '$guideID') and document_description like 'Proposal';";
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


    public function addOtherGuides($guideID,$projectID)
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="insert into project_guide_mapping values('$guideID','$projectID');";
        $result=$conn->query($sql);
        if($result === TRUE)
        {
            $data=array('status1'=>'true');
        }
        else{
        }
        return $data;
    }

    public function viewPrincipleProjects($guideID)
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="select * from projects where guide_ID like '$guideID';";
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

    public function viewParticipatingProjects($guideID)
    {
        global $conn;
        $data=array('status1'=>'false');
        $sql="select * from projects where project_ID in (select project_ID in project_guide_mapping where guide_ID like '$guideID');";
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

