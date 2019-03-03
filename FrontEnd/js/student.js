firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;

    console.log(displayName);

    if(window.location.href == "http://localhost/sih/FrontEnd/views/user.html")
    {

      document.getElementById("userName").innerHTML = displayName;
      firebase.database().ref().child('users').child(uid).once('value').then(function (snapshot) {
        role = snapshot.val().role;

        document.getElementById("role").innerHTML = role;
      });
      

      }
    // ...
  } else {
    // User is signed out.
    // ...
    window.location.href = "login.html";
  }
});

function logout(){
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
  window.location.href = "login.html";
}).catch(function(error) {
  // An error happened.
});
}






//SEPERATION BETWEEN PAGES

function viewDocuments(pid){
  localStorage.setItem("temppid",pid.name);
  window.location.href = 'http://localhost/sih/FrontEnd/views/projectdetail.html';
}
function viewproposal(pid){
  localStorage.setItem("tempdid",pid.name);
  window.location.href = 'http://localhost/sih/FrontEnd/views/proposaldetails.html';
}
console.log(window.location.href);

if(window.location.href == "http://localhost/sih/FrontEnd/views/projects.html")
{
  var param = new URLSearchParams();

  param.append('action',"viewProjects");

  var key = localStorage.getItem("tempKey");

  console.log(key);


  firebase.database().ref().child('users').child(key).once('value').then(function (snapshot) {

    param.append("studentID", id = "2"/*snapshot.val().id*/);

    param.append("name", name = snapshot.val().name);

    param.append("role", role = snapshot.val().role);


    var xhttp1 = new XMLHttpRequest();

    xhttp1.onreadystatechange = function () {

      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var myob = JSON.parse(this.responseText);
        
        if(myob['status1'] == "true"){
        var tab = document.getElementById("projTable");
        var tab1 = document.getElementById("pendprojTable");
        for (var i = 0; i < Object.keys(myob['documents']).length; i++) {
          console.log(i);
          if(myob['documents'][i]['completed']=="0"){
          var tr = tab.insertRow();
          var td = tr.insertCell(0);
          td.appendChild(document.createTextNode(project_ID = myob['documents'][i]['project_ID']));
          
          var td1 = tr.insertCell(1);
          td1.appendChild(document.createTextNode(myob['documents'][i]['project_name']));
       
          
          var td2 = tr.insertCell(2);
          td2.appendChild(document.createTextNode(myob['documents'][i]['guide_ID']));

          var td3 = tr.insertCell(3);
          td3.appendChild(document.createTextNode(myob['documents'][i]['budget_proposed']));

          var td4 = tr.insertCell(4);
          td4.appendChild(document.createTextNode(myob['documents'][i]['collaboration']));

          var td5 = tr.insertCell(5);
          var btn = document.createElement('button');
          //btn.setAttribute("id",`btn${i}`);
          btn.type = "button";
          btn.className = "waves-effect waves-light btn teal";
          btn.appendChild(document.createTextNode("View"));
          btn.setAttribute("onclick","viewDocuments(this)");
          btn.setAttribute("name",project_ID);
          btn.setAttribute("data-pid",project_ID);
          td5.appendChild(btn);

          }
        
          else{
          console.log(i);
          var tr = tab1.insertRow();
          var td = tr.insertCell(0);
          
          td.appendChild(document.createTextNode(myob['documents'][i]['project_name']));
          var td1 = tr.insertCell(1);
          td1.appendChild(document.createTextNode(project_ID = myob['documents'][i]['project_ID']));
        
          var td2 = tr.insertCell(2);
          td2.appendChild(document.createTextNode(myob['documents'][i]['budget_proposed']));
          
          var td3 = tr.insertCell(3);
          td3.appendChild(document.createTextNode(myob['documents'][i]['guide_ID']));

          var td4 = tr.insertCell(4);
          td4.appendChild(document.createTextNode(myob['documents'][i]['collaboration']));

        }
      }
    }
  }
}
       
    xhttp1.open("POST","../../Backend/controllers/controller-student.php", true);

    xhttp1.send(param);


    
    /*{"status":"true","finances":[{"invoice_number":"69","sponsor_name":"Tanmay","amount_donated_by_sponsor":"9500","project_ID":"PD1"},{"invoice_number":"HDFC0002314","sponsor_name":"Hanoz","amount_donated_by_sponsor":"69","project_ID":"PD1"}]}*/
    
    
    param.delete('action','viewApprovedProjects')
    param.append("action","viewFinances");

    var xhttp1 = new XMLHttpRequest();

    xhttp1.onreadystatechange = function () {

      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var myob = JSON.parse(this.responseText);
        if(myob['status'] == "true"){

        var tab = document.getElementById("finTable");
        for (var i = 0; i < Object.keys(myob['finances']).length; i++) {
          console.log(i);
          var tr = tab.insertRow();
          var td = tr.insertCell(0);
          td.appendChild(document.createTextNode(project_ID = myob['finances'][i]['project_ID']));
          
          var td1 = tr.insertCell(1);
          td1.appendChild(document.createTextNode(myob['finances'][i]['invoice_number']));
          
          var td2 = tr.insertCell(2);
          td2.appendChild(document.createTextNode(myob['finances'][i]['sponsor_name']));
          
          var td3 = tr.insertCell(3);
          td3.appendChild(document.createTextNode(myob['finances'][i]['amount_donated_by_sponsor']));
          

          }
        }
      }
      }
    xhttp1.open("POST","../../Backend/controllers/controller-student.php", true);

    xhttp1.send(param);
    param = new URLSearchParams;
    param.append("action",'viewSubmittedProposals');
    param.append("studentID", id = "1"/*snapshot.val().id*/);

    param.append("name", name = snapshot.val().name);

    param.append("role", role = snapshot.val().role);


    var xhttp1 = new XMLHttpRequest();

    xhttp1.onreadystatechange = function () {

      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var myob = JSON.parse(this.responseText);
        
        if(myob['status1'] == "true"){
        var tab = document.getElementById("subpro");
        for (var i = 0; i < Object.keys(myob['documents']).length; i++) {
          console.log(i);
          var tr = tab.insertRow();
          var td = tr.insertCell(0);
          td.appendChild(document.createTextNode(project_ID = myob['documents'][i]['submission_time']));
          
          var td1 = tr.insertCell(1);
          td1.appendChild(document.createTextNode(myob['documents'][i]['document_name']));
       
          
          var td2 = tr.insertCell(2);
          td2.appendChild(document.createTextNode(myob['documents'][i]['document_status']));

          var td3 = tr.insertCell(3);
          var btn = document.createElement('button');
          //btn.setAttribute("id",`btn${i}`);
          btn.type = "button";
          btn.className = "waves-effect waves-light btn teal";
          btn.appendChild(document.createTextNode("View"));
          btn.setAttribute("onclick","viewproposal(this)");
          btn.setAttribute("name",myob['documents'][i]['submission_time']);
          btn.setAttribute("data-pid",project_ID);
          td3.appendChild(btn);
        }
      }
    }
  }
  xhttp1.open("POST","../../Backend/controllers/controller-student.php", true);

    xhttp1.send(param);



    param.delete("action","viewSubmittedProposals");
    param.append('action','viewDeadlines');
    var xhttp1 = new XMLHttpRequest();

    xhttp1.onreadystatechange = function () {
      /*{"status":"true","deadlines":[{"project_ID":"PD104","proposal":null,"progress_report_1":null,"progress_report_2":null,"progress_report_3":null,"progress_report_4":null,"progress_report_5":null,"progress_report_6":null,"progress_report_7":null,"progress_report_8":null,"progress_report_9":null,"progress_report_10":null,"progress_report_11":null,"progress_report_12":null,"final_submission_date":null}]}*/
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var myob = JSON.parse(this.responseText);
        if(myob['status'] == "true"){

        var tab = document.getElementById("appTable");
        for (var i = 0; i < Object.keys(myob['deadlines']).length; i++) {
          
          var projID = myob['deadlines'][i]['project_ID'];
          if(projID == document.getElementById('projID').innerHTML){
            break;
          }
          console.log(i);
          var tr = tab.insertRow();
          var td = tr.insertCell(0);
          td.appendChild(document.createTextNode("dates"));
          
          //YOU HAVE TO ADD PROPOSAL'S INPUT OVER HERE
          var td1 = tr.insertCell(1);
          if  (myob['deadlines'][i].hasOwnProperty('progress_report_1')){myob['deadlines'][i]['progress_report_1']="--";}
          td1.appendChild(document.createTextNode(myob['deadlines'][i]['progress_report_1']));
          
          var td2 = tr.insertCell(2);
          if ( myob['deadlines'][i]['progress_report_2'] == null){myob['deadlines'][i]['progress_report_2']="--";}
          td2.appendChild(document.createTextNode(myob['deadlines'][i]['progress_report_2']));
          
          var td3 = tr.insertCell(3);
          if ( myob['deadlines'][i]['progress_report_3'] == null){myob['deadlines'][i]['progress_report_3']="--";}
          td3.appendChild(document.createTextNode(myob['deadlines'][i]['progress_report_3']));

          var td4 = tr.insertCell(4);
          if ( myob['deadlines'][i]['progress_report_4'] == null){myob['deadlines'][i]['progress_report_4']="--";}
          td4.appendChild(document.createTextNode(myob['deadlines'][i]['progress_report_4']));

          var td5 = tr.insertCell(5);
          if ( myob['deadlines'][i]['progress_report_5'] == null){myob['deadlines'][i]['progress_report_5']="--";}
          td5.appendChild(document.createTextNode(myob['deadlines'][i]['progress_report_5']));
          
          var td6 = tr.insertCell(6);
          if ( myob['deadlines'][i]['progress_report_6'] == null){myob['deadlines'][i]['progress_report_6']="--";}
          td6.appendChild(document.createTextNode(myob['deadlines'][i]['progress_report_6']));

          var td7 = tr.insertCell(7);
          if ( myob['deadlines'][i]['progress_report_7'] == null){myob['deadlines'][i]['progress_report_7']="--";}
          td7.appendChild(document.createTextNode(myob['deadlines'][i]['progress_report_7']));

          var td8 = tr.insertCell(8);
          if ( myob['deadlines'][i]['progress_report_8'] == null){myob['deadlines'][i]['progress_report_8']="--";}
          td8.appendChild(document.createTextNode(myob['deadlines'][i]['progress_report_8']));

          var td9 = tr.insertCell(9);
          if ( myob['deadlines'][i]['progress_report_9'] == null){myob['deadlines'][i]['progress_report_9']="--";}
          td9.appendChild(document.createTextNode(myob['deadlines'][i]['progress_report_9']));

          var td10 = tr.insertCell(10);
          if ( myob['deadlines'][i]['progress_report_10'] == null){myob['deadlines'][i]['progress_report_10']="--";}
          td10.appendChild(document.createTextNode(myob['deadlines'][i]['progress_report_10']));

          var td11 = tr.insertCell(11);
          if ( myob['deadlines'][i]['progress_report_11'] == null){myob['deadlines'][i]['progress_report_11']="--";}
          td11.appendChild(document.createTextNode(myob['deadlines'][i]['progress_report_11']));

          var td12 = tr.insertCell(12);
          if ( myob['deadlines'][i]['progress_report_12'] == null){myob['deadlines'][i]['progress_report_12']="--";}
          td12.appendChild(document.createTextNode(myob['deadlines'][i]['progress_report_12']));

          var td13 = tr.insertCell(13);
          if ( myob['deadlines'][i]['final_submission_date'] == null){myob['deadlines'][i]['final_submission_date']="--";}
          td13.appendChild(document.createTextNode(myob['deadlines'][i]['final_submission_date']));


          

          }
      }
    }
      }
    xhttp1.open("POST","../../Backend/controllers/controller-student.php", true);

    xhttp1.send(param);


  });

}





//SEPERATION BETWEEEN PAGES









if((window.location.href) == "http://localhost/sih/FrontEnd/views/projectdetail.html")
{ var i=0;
  var pidkey = localStorage.getItem("temppid");


  console.log(key);
 var commentsRef = firebase.database().ref('messages/PD104').limitToLast(10);
commentsRef.on('child_added', function(data) {
  i = i+1;
  var div = document.createElement("DIV");
          div.classList.add("containerchat");
          if(data.val().byWhom!="guide"){
            div.classList.add("darker");
          }
          var p = document.createElement("P");
          p.innerHTML ="<b>"+data.val().name+"</b>"+": " + data.val().message;
          div.appendChild(p);
          div.setAttribute("data-index",i);
          document.getElementById("chat").appendChild(div);

        
  //console.log(data.val().message);
  //addCommentElement(postElement, data.key, data.val().text, data.val().author);
});


  //CODE FOR FILLING A SINGLE PROJECT INFORMATION

  

  var key = localStorage.getItem("tempKey");

  console.log(key);


  firebase.database().ref().child('users').child(key).once('value').then(function (snapshot) {
    var param = new URLSearchParams();

  param.append('action',"fetchProjects");

    param.append("studentID", id = "2"/*snapshot.val().id*/);

    param.append("name", name = snapshot.val().name);

    param.append("role", role = snapshot.val().role);

    param.append("projectID",proj_ID = pidkey);

    var xhttp1 = new XMLHttpRequest();

    xhttp1.onreadystatechange = function () {

      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var myob = JSON.parse(this.responseText);

        var pname = document.getElementById("projName");
        var pid = document.getElementById("projID");
        var gid = document.getElementById("gID");
        var bused = document.getElementById("bused");
        var cs = document.getElementById("cs");
        var budPro = document.getElementById("budPro");

        pname.innerHTML = myob['deadlines'][0]['project_name'];
        pid.innerHTML = myob['deadlines'][0]['project_ID'];
        gid.innerHTML = myob['deadlines'][0]['guide_ID'];
        budPro.innerHTML =myob['deadlines'][0]['budget_proposed'];
        bused.innerHTML = myob['deadlines'][0]['budget_used'];
        cs.innerHTML = myob['deadlines'][0]['collaboration'];
        
      }
    }
  xhttp1.open("POST","../../Backend/controllers/controller-student.php", true);

  xhttp1.send(param);



  
  //CODE FOR FILLING DOCUMENTS
  var param = new URLSearchParams();

  param.append('action',"viewDocuments");
  param.append('projectID',pidkey);

  param.append("studentID", id = "2"/*snapshot.val().id*/);
  var xhttp1 = new XMLHttpRequest();

  var tab = document.getElementById("projTable");
  xhttp1.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var myob = JSON.parse(this.responseText);
      for (var i = 0; i < Object.keys(myob['documents']).length; i++) {
    console.log(i);
    var tr = tab.insertRow();
    
    var td0 = tr.insertCell(0);
    td0.appendChild(document.createTextNode(myob['documents'][i]['document_name']));
    
    var td1 = tr.insertCell(1);
    td1.appendChild(document.createTextNode(myob['documents'][i]['document_description']))

    
    var td2 = tr.insertCell(2);
    td2.appendChild(document.createTextNode(myob['documents'][i]['submission_time']));

    var td3 = tr.insertCell(3);
    var downloadURL = myob['documents'][i]['document'];
    var anc = document.createElement("a");
    anc.setAttribute("href",downloadURL);
    anc.innerHTML = "Download";
    td3.append(anc);
    
    
  }

      
    }
  }
xhttp1.open("POST","../../Backend/controllers/controller-student.php", true);

xhttp1.send(param);
  



//Dialogue section

       
 
      });

      function send(){
        /*var div = document.createElement("DIV");
        div.classList.add("containerchat");*/
        var p = document.createElement("P");
        var message = document.getElementById("text").value;
        /*p.innerHTML ="<b>"+name+"</b>"+": " + message;
        document.getElementById("text").value = null;
        div.appendChild(p);
        document.getElementById("chat").appendChild(div);*/
        var key = localStorage.getItem("tempKey");
        firebase.database().ref().child('users').child(key).once('value').then(function (snapshot) {
        id = snapshot.val().id;
        firebase.database().ref('messages/' + proj_ID).push({
          id: id,
          message:message,
          name:name,
          byWhom: role,
          timeStamp:Date.now()
        });
        });

        
     }

        
      
}



//SEPERATION BETWEEEN PAGES



if(window.location.href == 'http://localhost/sih/FrontEnd/views/addProj.html')
{
 
 function create(){

 var key = localStorage.getItem("tempKey");

  console.log(key);


  firebase.database().ref().child('users').child(key).once('value').then(function (snapshot) {
    var param = new URLSearchParams();
    var projName = document.getElementById("projName").value;
    var derFrom = document.getElementById("derFrom").value;
    var budPro = document.getElementById("budPro").value;

    param.append('projectname',projName);
    param.append('derived_from',derFrom);
    param.append('budget_proposed',budPro);

  param.append('action',"addProjects");

    param.append("studentID", id = "ID1"/*snapshot.val().id*/);

    param.append("name", name = snapshot.val().name);

    param.append("role", role = snapshot.val().role);

    var xhttp1 = new XMLHttpRequest();

    xhttp1.onreadystatechange = function () {

      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var myob = JSON.parse(this.responseText);

        if(myob['status1'] == 'true'){
          window.alert("Project created successfully");
        }
      }
    }
  xhttp1.open("POST","../../Backend/controllers/controller-student.php", true);

  xhttp1.send(param);


 
 });
}
}

if(window.location.href == "http://localhost/sih/FrontEnd/views/submitBudget.html"){
	function submit(){
      for(var i = 1; i <= 81; i++){
       
        console.log(i);
        console.log(document.getElementById(i).value);
        if(i==13){i=i+3;}
      }
			 var param = new URLSearchParams();
			 for(var i = 1; i <= 81; i++){
         param.append(i, document.getElementById(i).value);
         if(i==13){i=i+3;}
       }
       console.log(param);
			 var param1 = new URLSearchParams();
       param1.append("action", 'addBudget');
       param1.append("documentname","budget1");
      param1.append('document', param);
      param1.append('studentID','1');
			var xhttp1 = new XMLHttpRequest();
    		xhttp1.onreadystatechange = function () {

      			if (this.readyState == 4 && this.status == 200) {
        			console.log(this.responseText);
        			// var myob = JSON.parse(this.responseText);
          		}
      		}
      
    		xhttp1.open("POST","../../backend/controllers/controller-student.php", true);
    		xhttp1.send(param1);
  
}

var key = localStorage.getItem("tempKey");

  console.log(key);
  firebase.database().ref().child('users').child(key).once('value').then(function (snapshot) {

  var param = new URLSearchParams();
 /* for(var i = 1; i <= 69; i++){
      
      console.log(document.getElementById(i).value)
  }*/
  //param = JSON.stringify(param);
  /*console.log(param);*/
  var param1 = new URLSearchParams();
  param1.append("studentID","1");
  param1.append("action", 'viewBudget');
  var xhttp1 = new XMLHttpRequest();
  xhttp1.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
           var myob = JSON.parse(this.responseText);
          // myob.replace("%2C", ", ");
          //var a = (myob['documents'][0]['document'].split('&'));
          // var a = myob['documents'][0]['document'];
          // console.log(a);
          var a = (myob['documents'][0]['DOCUMENT'].split('&'));
          console.log(a[1]);
          for( var i=0; i<78; i++)
          {
            console.log(i);
            var b = a[i].split('=')[1].split('+');
            console.log(b);
            if(b.length != 1){
              var c ="";
            for(var j =0;j<b.length;j++){
              c = c + b[j] + " ";
            }
            if(i==13){i=i+3;}
            document.getElementById(i+1).value = c;
          }else{
            if(i==13){i=i+3;}
            document.getElementById(i+1).value = b[0];
          }
          //   console.log(b);
          // }
        }
    }}

  xhttp1.open("POST","../../Backend/controllers/controller-student.php", true);
  xhttp1.send(param1);
});
}

if(window.location.href == 'http://localhost/sih/FrontEnd/views/proposal.html')
{
console.log("hello");
  function submitpro(){
    var key = localStorage.getItem("tempKey");

    console.log(key);
    firebase.database().ref().child('users').child(key).once('value').then(function (snapshot) {

    var param = new URLSearchParams();
    
    for(var i = 1; i <= 58; i++){
        param.append(i, document.getElementById(i).value);
        console.log(document.getElementById(i).value)
    }
    //param = JSON.stringify(param);
    console.log(param);
    var param1 = new URLSearchParams();
    param1.append("studentID","1");
    param1.append("action", 'addProposals');
    param1.append('document', param);
    param1.append("documentname","proposal1");
    var xhttp1 = new XMLHttpRequest();
    xhttp1.onreadystatechange = function () {

          if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            // var myob = JSON.parse(this.responseText);
            
          }
      }


    xhttp1.open("POST","../../Backend/controllers/controller-student.php", true);
    xhttp1.send(param1);
    });

    var x = document.getElementById("myFile");
   var desc ='inside_proposal'; 
   
   file = x.files[0];
       fileName = file.name;
       storageRef = firebase.storage().ref("files/" + fileName);
       uploadTask = storageRef.put(file);
   
   
   
   
       uploadTask.on('state_changed', function(snapshot){
     // Observe state change events such as progress, pause, and resume
     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     console.log('Upload is ' + progress + '% done');
     switch (snapshot.state) {
       case firebase.storage.TaskState.PAUSED: // or 'paused'
         console.log('Upload is paused');
         break;
       case firebase.storage.TaskState.RUNNING: // or 'running'
         console.log('Upload is running');
         break;
     }
   }, function(error) {
     // Handle unsuccessful uploads
   }, function() {
     // Handle successful uploads on complete
     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
     uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
       console.log('File available at', downloadURL);
       param = new URLSearchParams();
   
       param.append("document",downloadURL);
       param.append("action","addDocuments");
       param.append("documentname",fileName+"form");
       param.append("description",desc);
       param.append("projectID",'PD0');
       if (firebase.auth().currentUser !== null) 
           var key = firebase.auth().currentUser.uid;
       firebase.database().ref().child('users').child(key).once('value').then(function (snapshot) {
         param.append("studentID", id = "2"/*snapshot.val().id*/);
   
         param.append("name", name = snapshot.val().name);
   
         param.append("role", role = snapshot.val().role);
   
   
         var xhttp1 = new XMLHttpRequest();
   
         xhttp1.onreadystatechange = function () {
   
         if (this.readyState == 4 && this.status == 200) {
           console.log(this.responseText);
           var myob = JSON.parse(this.responseText);
           if(myob['status'] =='true'){
             window.alert("File Uploaded Successfully");
             //window.location.reload();
           }
           else{
             window.alert("File Upload Failed");
           }
         }
       }
       xhttp1.open("POST","../../Backend/controllers/controller-student.php", true);
   
       xhttp1.send(param);
     });
   });
   });
   
}
if(window.location.href == "http://localhost/sih/FrontEnd/views/proposaldetails.html"){
  var key = localStorage.getItem("tempKey");

  console.log(key);
  firebase.database().ref().child('users').child(key).once('value').then(function (snapshot) {
 /* for(var i = 1; i <= 69; i++){
      
      console.log(document.getElementById(i).value)
  }*/
  //param = JSON.stringify(param);
  /*console.log(param);*/
  var submission_time= localStorage.getItem("tempdid");
  var param1 = new URLSearchParams();
  param1.append("studentID","1");
  param1.append("submission_time",submission_time);
  param1.append("action",'viewSubmittedProposalwithTime')
  var xhttp1 = new XMLHttpRequest();
  xhttp1.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
           var myob = JSON.parse(this.responseText);
          // myob.replace("%2C", ", ");
          //var a = (myob['documents'][0]['document'].split('&'));
          // var a = myob['documents'][0]['document'];
          // console.log(a);
          var a = (myob['documents'][0]['document'].split('&'));
          // console.log(a[1]);
          for( var i=0; i<58; i++)
          {
            console.log(i);
            var b = a[i].split('=')[1].split('+');
            console.log(b);
            if(b.length != 1){
              var c ="";
            for(var j =0;j<b.length;j++){
              c = c + b[j] + " ";
            }
            document.getElementById(i+1).value = c;
          }else{
            document.getElementById(i+1).value = b[0];
          }
          //   console.log(b);
          // }
        }
    }}

  xhttp1.open("POST","../../Backend/controllers/controller-student.php", true);
  xhttp1.send(param1);
});
}

}
/*if(window.location.href == "http://localhost/sih/FrontEnd/views/proposaldetails.html"){
  var myob= localStorage.getItem("tempdid");
  console.log(myob);
  var a = (myob[0]['document'].split('&'));
  console.log(a);
  // console.log(a[1]);
  for( var i=1; i<58; i++)
  {
    console.log(i);
    var b = a[i].split('=')[1].split('+');
    console.log(b);
    if(b.length != 1){
      var c ="";
    for(var j =0;j<b.length;j++){
      c = c + b[j] + " ";
    }
    document.getElementById(i+1).value = c;
  }else{
    document.getElementById(i+1).value = b[0];
  }
}
}*/