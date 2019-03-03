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
if(window.location.href == "http://localhost/sih/FrontEnd/views/sponsor-allprojects.html")
{
  var param = new URLSearchParams();

  param.append('action',"viewAllProjects");

  var key = localStorage.getItem("tempKey");

  console.log(key);

  // console.log(window.location.href);

  firebase.database().ref().child('users').child(key).once('value').then(function (snapshot) {

    param.append("studentID", id = "ID1"/*snapshot.val().id*/);

    param.append("sponsor_name", name = "Tanmay"/*snapshot.val().name*/);

    param.append("role", role = snapshot.val().role);

    var xhttp1 = new XMLHttpRequest();

    xhttp1.onreadystatechange = function () {

      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var myob = JSON.parse(this.responseText);




        var tab = document.getElementById("projTable");
        for (var i = 0; i < Object.keys(myob['finances']).length; i++) {
          console.log(i);
          var tr = tab.insertRow();
          var td0 = tr.insertCell(0);
          td0.appendChild(document.createTextNode(project_ID = myob['finances'][i]['project_ID']));
          
          var td1 = tr.insertCell(1);
          td1.appendChild(document.createTextNode(myob['finances'][i]['project_name']));
          
          var td2 = tr.insertCell(2);
          td2.appendChild(document.createTextNode(myob['finances'][i]['derived_from']));
          
          var td3 = tr.insertCell(3);
          td3.appendChild(document.createTextNode(myob['finances'][i]['feasible']));

          var td4 = tr.insertCell(4);
          td4.appendChild(document.createTextNode(myob['finances'][i]['date_of_start']));

          var td5 = tr.insertCell(5);
          td5.appendChild(document.createTextNode(myob['finances'][i]['date_of_completion']));

          var td6 = tr.insertCell(6);
          td6.appendChild(document.createTextNode(myob['finances'][i]['completed']));

          var td7 = tr.insertCell(7);
          td7.appendChild(document.createTextNode(myob['finances'][i]['project_price']));

          var td8 = tr.insertCell(8);
          td8.appendChild(document.createTextNode(myob['finances'][i]['guide_ID']));

          var td9 = tr.insertCell(9);
          td9.appendChild(document.createTextNode(myob['finances'][i]['budget_proposed']));

          }
      }
      }
    xhttp1.open("POST","../../Backend/controllers/controller-sponsors.php", true);

    xhttp1.send(param);
  });

}else 

if(window.location.href == "http://localhost/sih/FrontEnd/views/sponsor-projects.html")
{
  var param = new URLSearchParams();

  param.append('action',"viewProjects");

  var key = localStorage.getItem("tempKey");

  console.log(key);

  // console.log(window.location.href);

  firebase.database().ref().child('users').child(key).once('value').then(function (snapshot) {

    param.append("studentID", id = "ID1"/*snapshot.val().id*/);

    param.append("sponsor_name", name = "Tanmay"/*snapshot.val().name*/);

    param.append("role", role = snapshot.val().role);

    var xhttp1 = new XMLHttpRequest();

    xhttp1.onreadystatechange = function () {

      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var myob = JSON.parse(this.responseText);




        var tab = document.getElementById("projTable");
        for (var i = 0; i < Object.keys(myob['finances']).length; i++) {
          console.log(i);
          var tr = tab.insertRow();
          var td0 = tr.insertCell(0);
          td0.appendChild(document.createTextNode(project_ID = myob['finances'][i]['project_ID']));
          
          var td1 = tr.insertCell(1);
          td1.appendChild(document.createTextNode(myob['finances'][i]['project_name']));
          
          var td2 = tr.insertCell(2);
          td2.appendChild(document.createTextNode(myob['finances'][i]['derived_from']));
          
          var td3 = tr.insertCell(3);
          td3.appendChild(document.createTextNode(myob['finances'][i]['feasible']));

          var td4 = tr.insertCell(4);
          td4.appendChild(document.createTextNode(myob['finances'][i]['date_of_start']));

          var td5 = tr.insertCell(5);
          td5.appendChild(document.createTextNode(myob['finances'][i]['date_of_completion']));

          var td6 = tr.insertCell(6);
          td6.appendChild(document.createTextNode(myob['finances'][i]['completed']));

          var td7 = tr.insertCell(7);
          td7.appendChild(document.createTextNode(myob['finances'][i]['project_price']));

          var td8 = tr.insertCell(8);
          td8.appendChild(document.createTextNode(myob['finances'][i]['guide_ID']));

          var td9 = tr.insertCell(9);
          td9.appendChild(document.createTextNode(myob['finances'][i]['budget_proposed']));

          }
      }
      }
    xhttp1.open("POST","../../Backend/controllers/controller-sponsors.php", true);

    xhttp1.send(param);
  });

}
else 

if(window.location.href == "http://localhost/sih/FrontEnd/views/sponsor-finance.html")
{
  var param = new URLSearchParams();

  param.append('action',"viewFinances");

  var key = localStorage.getItem("tempKey");

  console.log(key);

  // console.log(window.location.href);

  firebase.database().ref().child('users').child(key).once('value').then(function (snapshot) {

    param.append("studentID", id = "ID1"/*snapshot.val().id*/);

    param.append("sponsor_name", name = "Tanmay"/*snapshot.val().name*/);

    param.append("role", role = snapshot.val().role);

    var xhttp1 = new XMLHttpRequest();

    xhttp1.onreadystatechange = function () {

      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var myob = JSON.parse(this.responseText);




        var tab = document.getElementById("projTable");
        for (var i = 0; i < Object.keys(myob['finances']).length; i++) {
          console.log(i);
          var tr = tab.insertRow();
          var td0 = tr.insertCell(0);
          td0.appendChild(document.createTextNode(project_ID = myob['finances'][i]['invoice_number']));
          
          var td1 = tr.insertCell(1);
          td1.appendChild(document.createTextNode(myob['finances'][i]['sponsor_name']));
          
          var td2 = tr.insertCell(2);
          td2.appendChild(document.createTextNode(myob['finances'][i]['amount_donated_by_sponsor']));
          
          var td3 = tr.insertCell(3);
          td3.appendChild(document.createTextNode(myob['finances'][i]['project_ID']));

          

          }
      }
      }
    xhttp1.open("POST","../../Backend/controllers/controller-sponsors.php", true);

    xhttp1.send(param);
  });

}

    document.getElementById("submit").addEventListener("click", myFunction);

     function myFunction() {
       var tranno = document.getElementById("transactionno");
       var projectid = document.getElementById("projectid");
       var amount = document.getElementById("amount");
       if(tranno.value == "" || projectid.value == "" || amount.value == ""){
        alert("Please Fill All The Details");
       }else{
                //CODE FOR FILLING A SINGLE PROJECT INFORMATION
                var param = new URLSearchParams();

                param.append('action','addFinances');
                param.append('invoiceNumber',tranno.value);
                param.append('amount',amount.value);
                param.append('projectID',projectid.value);
                tranno.value = "";
                projectid.value = "";
                amount.value = "";

                var key = localStorage.getItem("tempKey");

                console.log(key);


                firebase.database().ref().child('users').child(key).once('value').then(function (snapshot) {

                param.append("sponsor_name", name = "Tanmay"/*snapshot.val().name*/);

                param.append("role", role = snapshot.val().role);

                var xhttp1 = new XMLHttpRequest();

                xhttp1.onreadystatechange = function () {

                  if (this.readyState == 4 && this.status == 200) {
                    console.log(this.responseText);
                    //var myob = JSON.parse(this.responseText);
                  }
                }
                xhttp1.open("POST","../../Backend/controllers/controller-sponsors.php", true);

                xhttp1.send(param);
              }
              );
      }
    }