
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if(user!=null)
    {
    var name= user.displayName;
    var id = user.id;
    key=user.uid;
    firebase.database().ref().child('users').child(key).child('role').once('value').then(function(snapshot) {
    var role = snapshot.val();
    console.log(role);
    console.log(name);
    var param = new URLSearchParams();
    param.append('name',name);
    param.append('id',id);
    param.append('role',role);
    var xhttp1= new XMLHttpRequest();
    xhttp1.onreadystatechange = function(){
    if(this.readyState==4 && this.status== 200){
           var myob=JSON.parse(this.responseText);
           console.log(myob);
        }
    };
    xhttp1.open("POST",`student-controller.php`,true);
            xhttp1.send(param);
  	
    // User is signed in.\
  });}}
    else{
  }
  // Sign-out successful.
});
  /*else {
    // No user is signed in.
  }*/

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function create(){
  var email=document.getElementById("email").value;
  var password=document.getElementById("password").value;
  var name=document.getElementById("name").value;
  var phone=document.getElementById("phone").value;
  var role=document.getElementById("role").value;
  var id=document.getElementById("id").value;
  /*firebase.database().ref().set(email1);
  firebase.database().ref().child(email1).set(name);*/
firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
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
});

  }

/*function display(){
  firebase.database().ref().child('users').child(key).child('username').once('value').then(function(snapshot) {
  var username = snapshot.val();
  document.getElementById("size1").innerHTML="Welcome, "+username;
  // ...
});}*/

//STORAGE CODE


function store() {
  var x = document.getElementById("myFile");
  console.log(x.files[0])


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
  });
});
console.log("Okay")


/*
//DOWNLOAD


// Create a reference to the file we want to download
var Ref = firebase.storage().ref(fileName);

// Get the download URL

Ref.getDownloadURL().then(function(url) {
  // Insert url into an <img> tag to "download"
  console.log(url);
}).catch(function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/object-not-found':
      console.log("File doesn't exist");
      break;

    case 'storage/unauthorized':
      window.alert("User doesn't have permission to access the object");
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

    case 'storage/unknown':
      // Unknown error occurred, inspect the server response
      break;
  }
});
*/
}