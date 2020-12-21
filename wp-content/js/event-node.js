
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyD5kGvUWOxOHJRs1qeogsP1A9yofzGnr4Y",
    authDomain: "fosscell-website-734f1.firebaseapp.com",
    projectId: "fosscell-website-734f1",
    storageBucket: "fosscell-website-734f1.appspot.com",
    messagingSenderId: "428566382480",
    appId: "1:428566382480:web:b140ecc4aa6d934e971515",
    measurementId: "G-HFRQZTNGPY"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 
 // Reference messages collection
var messagesRef = firebase.database().ref('event_registration');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var college = getInputVal('college');
  var semester = getInputVal('semester');
  var department = getInputVal('department');
   var foss = getInputVal('foss');
 
  

  // Save message
  saveMessage(name,email, phone, college, department,semester,foss);
  
  getData();

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
 document.getElementById('contactForm').reset();
 
  
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name,email, phone, college, department,semester,foss){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    email:email,
    phone:phone,
	college:college,
	department:department,
	foss:foss,
	semester:semester,
    
  });
}

function getData() 
{
	firebase.database().ref('event_registration').once('value', function (snapshot)
	{	snapshot.forEach(function(childSnapshot)
		{
			var childKey = childSnapshot.key;
			var childData = childSnapshot.val();
			document.getElementById('data').insertAdjacentHTML('beforeend',childData['name'] + "\t"+childData['email'] + "\t"+childData['phone'] + "   "+childData['college'] + "   "+childData['department'] + "   "+childData['semester'] + "   "+childData['foss']+"\n" );
			//document.getElementById("data").innerHTML = childData['name'] + "\t"+childData['email'] + "\t"+childData['phone'] + "   "+childData['college'] + "   "+childData['department'] + "   "+childData['semester'] + "   "+childData['foss'] ;
		})
	})
}
