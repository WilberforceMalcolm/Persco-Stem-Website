
  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";





// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {

apiKey: "AIzaSyBYCL3-J-EaHPBKpfGh4r86q9ylAm7DyKA",
authDomain: "perscostemloginsignup.firebaseapp.com",
projectId: "perscostemloginsignup",
storageBucket: "perscostemloginsignup.firebasestorage.app",
messagingSenderId: "305349372287",
appId: "1:305349372287:web:863ca78a6e5406225a124a",
measurementId: "G-F2D2D4668K"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function showMessage(){
    const messageDiv = document.getElementById("signUpMessage");
    messageDiv.style.display = "block"; 
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000)
}


const signUp = document.getElementById("submitSignUp");

signUp.addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const firstName = document.getElementById("Fname").value;
    const lastName = document.getElementById("Lname").value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
            email: email,
            firstName: firstName,
            lastName: lastName  
        }
        showMessage();
        const docRef = doc(db, "users", user.uid) 
        setDoc(docRef, userData)
        .then(()=> {
            window.location.href = "./documentation.html";
        }) 
        .catch((error) => {
            console.error("error writing document", error);
        });

    })
    .catch((error) =>{
        const errorCode = error.code;
        if(errorCode  == "auth/email-already-in-use") {
            showMessage();
        }else {
            showMessage();
        }
    })
})