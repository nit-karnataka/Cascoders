function approveProjects(btn){
  var params=new URLSearchParams();
  params.append("studentID",btn.id);
  params.append("action","approveProjects")
  var xhttp1 = new XMLHttpRequest();

  xhttp1.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    console.log(this.responseText)
  }
}
xhttp1.open('POST',"../../Backend/controllers/controller-director.php")  
xhttp1.send(params)  ;
}

function disapproveProject(btn){
  var params=new URLSearchParams();
  params.append("action","disapproveProjects")
  var xhttp1 = new XMLHttpRequest();

  xhttp1.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    console.log(this.responseText)
  }
}
xhttp1.open('POST',"../../Backend/controllers/controller-director.php")  
xhttp1.send(params)  ;
}

if(window.location.href == "http://localhost/sih/FrontEnd/views/director-allproposal.html"){

    var param = new URLSearchParams();
    //param.append("guideID", "ID1");
  	param.append('action',"viewProposals");
  	var key = localStorage.getItem("tempKey");
    console.log(key);
    var xhttp1 = new XMLHttpRequest();
    xhttp1.onreadystatechange = function () {

      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var myob = JSON.parse(this.responseText);

        if(myob.status1 == "true"){
        var tab = document.getElementById("table1");
        for (var i = 0; i < Object.keys(myob['documents']).length; i++) {
          console.log(i);
          var tr = tab.insertRow();
          var td0 = tr.insertCell(0);
         
          td0.appendChild(document.createTextNode(project_ID = myob['documents'][i]['document_name']));
          
          var td1 = tr.insertCell(1);
          td1.appendChild(document.createTextNode(myob['documents'][i]['submission_time']));
          
          var td2 = tr.insertCell(2);
		      td2.appendChild(document.createTextNode(myob['documents'][i]['student_ID']));
		  
		      var td3 = tr.insertCell(3);
          var btn1 = document.createElement("button");
          btn1.innerHTML = "View";
          btn1.setAttribute('onclick', 'view(this)')
          btn1.setAttribute('id', myob['documents'][i]['student_ID']);
          td3.appendChild(btn1);  

          var td4 = tr.insertCell(4);
          var btn2 = document.createElement("button");
          btn2.innerHTML = "Approve";
          btn2.setAttribute('onclick', 'approveProjects(this)')
          btn2.setAttribute('id', myob['documents'][i]['student_ID']);
          td4.appendChild(btn2);  

          var td5 = tr.insertCell(5);
          var btn3 = document.createElement("button");
          btn3.innerHTML = "Disapprove";
          btn3.setAttribute('onclick', 'disapproveProject(this)')
          btn3.setAttribute('id', myob['documents'][i]['student_ID']);
          td5.appendChild(btn3);  
        }
      }
     }
    }
    xhttp1.open("POST","../../Backend/controllers/controller-director.php", true);

  xhttp1.send(param);

	function view(btn){
		var sid = btn.id;
		localStorage.setItem("tempid",sid);
		window.location.href = "http://localhost/sih/FrontEnd/views/viewprop.html"
	  }

}
else if(window.location.href == "http://localhost/sih/FrontEnd/views/director-budget.html"){

    var param = new URLSearchParams();
   // param.append("guideID", "ID1");
  	param.append('action',"viewBudgets");
  	var key = localStorage.getItem("tempKey");
    console.log(key);
    
    var xhttp1 = new XMLHttpRequest();
    xhttp1.onreadystatechange = function () {
      
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var myob = JSON.parse(this.responseText);
        if(myob['status1']=="true"){
        var tab = document.getElementById("table2");
        for (var i = 0; i < Object.keys(myob['documents']).length; i++) {
          console.log(i);
          var tr = tab.insertRow();
          var td0 = tr.insertCell(0);
         
          td0.appendChild(document.createTextNode(project_ID = myob['documents'][i]['document_name']));
          
          var td1 = tr.insertCell(1);
          td1.appendChild(document.createTextNode(myob['documents'][i]['submission_time']));
          
          var td2 = tr.insertCell(2);
          td2.appendChild(document.createTextNode(myob['documents'][i]['student_ID']));

          var td3 = tr.insertCell(3);
          var btn1 = document.createElement("button");
          btn1.innerHTML = "View";
          btn1.setAttribute('onclick', 'view(this)')
          btn1.setAttribute('id', myob['documents'][i]['student_ID']);
          td3.appendChild(btn1);  

          var td4 = tr.insertCell(4);
          var btn2 = document.createElement("button");
          btn2.innerHTML = "Approve";
          btn2.setAttribute('onclick', 'approveProjects(this)')
          btn2.setAttribute('id', myob['documents'][i]['student_ID']);
          td4.appendChild(btn2);  

          var td5 = tr.insertCell(5);
          var btn3 = document.createElement("button");
          btn3.innerHTML = "Disapprove";
          btn3.setAttribute('onclick', 'disapproveProject(this)')
          btn3.setAttribute('id', myob['documents'][i]['student_ID']);
          td5.appendChild(btn3)
          
          
          xhttp1.open("POST","../../Backend/controllers/controller-director.php", true);
          xhttp1.send(param);
        }
            
        }
      }
     }
    }
    function view(btn){
      var sid = btn.id;
      localStorage.setItem("tempid",sid);
      window.location.href = "http://localhost/sih/FrontEnd/views/viewprop.html"
      }

   

if(window.location.href == "http://localhost/sih/FrontEnd/views/viewprop.html"){
  var key = localStorage.getItem("tempKey");

  console.log(key);
  firebase.database().ref().child('users').child(key).once('value').then(function (snapshot) {
 /* for(var i = 1; i <= 69; i++){
      
      console.log(document.getElementById(i).value)
  }*/
  //param = JSON.stringify(param);
  /*console.log(param);*/
  var param1 = new URLSearchParams();
  param1.append("guideID","10001");
  param1.append("action",'viewProposals');
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

  xhttp1.open("POST","../../Backend/controllers/controller-guide.php", true);
  xhttp1.send(param1);
});
}