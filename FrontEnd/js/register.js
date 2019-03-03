firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    if (user != null) {
      key = user.uid;
      var role;
      var name;
      var id;
      var param = new URLSearchParams();
      firebase.database().ref().child('users').child(key).once('value').then(function (snapshot) {
        param.append("studentID", id = snapshot.val().id)
        param.append("studentName", name = snapshot.val().name);
        param.append("role", role = snapshot.val().role);
        param.append("action", 'addStudents');
        document.getElementById("myForm").reset();

        var xhttp1 = new XMLHttpRequest();
        xhttp1.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            var myob = JSON.parse(this.responseText);
            console.log(this.responseText);
            if(myob['status'] == 'true'){
              window.alert(`New ${role} created successfully`);
            }

          }
        };
        xhttp1.open("POST", "../../Backend/controllers/controller-HR.php", true);
        xhttp1.send(param);
        logout();

        // User is signed in.
      });
    }
  } else{}
});



function create(){
  var email=document.getElementById("email").value;
  var password=document.getElementById("password").value;
  var name=document.getElementById("name").value;
  var phone=document.getElementById("phone").value;
  var role=document.getElementById("role").value;
  var id=document.getElementById("id").value;
  /*firebase.database().ref().set(email1);
  firebase.database().ref().child(email1).set(name);*/
/*firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
  var user = firebase.auth().currentUser;
  firebase.database().ref('users/' + user.uid).set({
    id:id,
    name: name,
    email: email,
    phone: phone,
    role: role
  });
  user.updateProfile({displayName: name, email: email});
}).catch(function(error) {
  console.log(error);
});*/
admin.auth().createUser({
  email: "user@example.com",
  emailVerified: false,
  phoneNumber: "+11234567890",
  password: "secretPassword",
  displayName: "John Doe",
  photoURL: "http://www.example.com/12345678/photo.png",
  disabled: false
})
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    window.alert("Successfully created new user:", userRecord.uid);
  })
  .catch(function(error) {
    window.alert("Error creating new user:", error);
  });

  }

function logout(){
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
}