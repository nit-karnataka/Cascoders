if(window.location.href == "http://localhost/sih/FrontEnd/views/sec-viewprop.html"){

    var param = new URLSearchParams();
    param.append('action',"viewProposalBeforeDirector");
    var key = localStorage.getItem("tempKey");
    console.log(key);
    
    var xhttp1 = new XMLHttpRequest();
    xhttp1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var myob = JSON.parse(this.responseText);
            if(myob['status1']=="true"){
              var tab = document.getElementById("projTable");
        for (var i = 0; i < Object.keys(myob['documents']).length; i++) {
          console.log(i);
          var tr = tab.insertRow();
          var td0 = tr.insertCell(0);
          td0.appendChild(document.createTextNode(myob['documents'][i]['document_name']));
          
          var td1 = tr.insertCell(1);
          td1.appendChild(document.createTextNode(myob['documents'][i]['document_status']));

          var td2 = tr.insertCell(2);
          td2.appendChild(document.createTextNode(myob['documents'][i]['document_description']));

          var td3 = tr.insertCell(3);
          td3.appendChild(document.createTextNode(myob['documents'][i]['submission_time']));
          
          var td4 = tr.insertCell(4);
          td4.appendChild(document.createTextNode(myob['documents'][i]['student_ID']));

          var td5 = tr.insertCell(5);
          var btn1 = document.createElement("button");
          btn1.innerHTML = "View";
          btn1.setAttribute('onclick', 'view(this)')
          btn1.setAttribute('id', myob['documents'][i]['student_ID']);
          var btn2 = document.createElement("button");
          btn2.innerHTML = "Forward";
          btn2.setAttribute('onclick', 'forward(this)')
          btn2.setAttribute('id', myob['documents'][i]['student_ID']);
          td5.appendChild(btn1);
          td5.appendChild(btn2);
        }
      }
     }
    }
    xhttp1.open("POST","../../Backend/controllers/controller-secretariat.php", true);

    xhttp1.send(param);
    function view(btn){
      var sid = btn.id;
      localStorage.setItem("tempid",sid);
      window.location.href = "http://localhost/sih/FrontEnd/views/secretarait-proposal.html"
    }
    function forward(btn){
      var sid = btn.id;
      console.log(sid);
      var param = new URLSearchParams();
      param.append('action',"approveDocumentsBeforeDirector");
      param.append('studentID',sid);
      var key = localStorage.getItem("tempKey");
      console.log(key);
    
      var xhttp1 = new XMLHttpRequest();
      xhttp1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var myob = JSON.parse(this.responseText);    
        }
      }
      xhttp1.open("POST","../../Backend/controllers/controller-secretariat.php", true);
      xhttp1.send(param);
    }
}
else if(window.location.href == "http://localhost/sih/FrontEnd/views/sec-viewpropdirec.html"){

    var param = new URLSearchParams();
  	param.append('action',"viewProposalAfterDirector");
  	var key = localStorage.getItem("tempKey");
  	console.log(key);
    var xhttp1 = new XMLHttpRequest();
    xhttp1.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var myob = JSON.parse(this.responseText);
        if(myob['status1']=="true"){
        var tab = document.getElementById("projTable");
        for (var i = 0; i < Object.keys(myob['documents']).length; i++) {
          console.log(i);
          var tr = tab.insertRow();
          var td0 = tr.insertCell(0);
          td0.appendChild(document.createTextNode(project_ID = myob['documents'][i]['document_name']));

          var td1 = tr.insertCell(1);
          td1.appendChild(document.createTextNode(myob['documents'][i]['document_status']));
          
          var td2 = tr.insertCell(2);
          td2.appendChild(document.createTextNode(myob['documents'][i]['document_description']));
          
          var td3 = tr.insertCell(3);
          td3.appendChild(document.createTextNode(myob['documents'][i]['submission_time']));
          
          var td4 = tr.insertCell(4);
          td4.appendChild(document.createTextNode(myob['documents'][i]['student_ID']));
          
          var td5 = tr.insertCell(5);
          var i1 = document.createElement("input")
          i1.type = "text";
          td5.appendChild(i1);
          
          var td6 = tr.insertCell(6);
          var i2 = document.createElement("input")
          i2.type = "text";
          td6.appendChild(i2);
          
          var td7 = tr.insertCell(7);
          var i3 = document.createElement("input")
          i3.type = "text";
          td7.appendChild(i3);
          
          var td8 = tr.insertCell(8);
          var btn = document.createElement('button');
          btn.innerHTML = "Add";
          btn.setAttribute('onclick', 'add(this)')
          btn.setAttribute('id', myob['documents'][i]['student_ID']);
          td8.appendChild(btn);


        }
      }
     }
    }
    xhttp1.open("POST","../../Backend/controllers/controller-secretariat.php", true);

    xhttp1.send(param);
    function add(btn){
      var pid = btn.parentNode.parentNode.childNodes[5].childNodes[0].value;
      var gid = btn.parentNode.parentNode.childNodes[7].childNodes[0].value;
      var pname = btn.parentNode.parentNode.childNodes[6].childNodes[0].value;
      
      var param = new URLSearchParams();
      param.append('action',"addProjects");
      param.append('studentID', btn.id);
      param.append('projectID', pid);
      param.append('guideID', gid);
      param.append('projectname', pname);
      var key = localStorage.getItem("tempKey");
      console.log(key);
    
      var xhttp1 = new XMLHttpRequest();
      xhttp1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var myob = JSON.parse(this.responseText);
            
          }
    }
    xhttp1.open("POST","../../Backend/controllers/controller-secretariat.php", true);
    xhttp1.send(param);
    }

    
    
} else if(window.location.href == "http://localhost/sih/FrontEnd/views/secretarait-proposal.html"){
    var sid = localStorage.getItem('tempid');
    console.log(sid);
    var param = new URLSearchParams();
    param.append('action',"viewDocument");
    param.append('studentID',sid);
    var key = localStorage.getItem("tempKey");
    console.log(key);
    
    var xhttp1 = new XMLHttpRequest();
    xhttp1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var myob = JSON.parse(this.responseText);
            if(myob['status1']=="true"){
              var a = (myob['documents'][0]['document'].split('&'));
              for( var i=0; i<58; i++){
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
            }
          }
    }
    xhttp1.open("POST","../../Backend/controllers/controller-secretariat.php", true);
    xhttp1.send(param);
}