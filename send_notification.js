// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging,getToken } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4zH6QdwAPnGNVHq6wwxDW-I4q6EPM-1U",
  authDomain: "fptl-4872d.firebaseapp.com",
  databaseURL: "https://fptl-4872d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fptl-4872d",
  storageBucket: "fptl-4872d.appspot.com",
  messagingSenderId: "708234360469",
  appId: "1:708234360469:web:97be8be047c86606d7cd9c"
};
// Initialize Firebase Cloud Messaging and get a reference to the service


// Initialize Firebase

function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
    getToken(messaging, {vapidKey: "BIQSQCNjMiLQIAW6P2L7FJ1IihVorFxkEJLpB4CU2zSf9j8H8VrtQFN2p5G3i2y_EebnS9OFiwbyhMHae6mSfJk"})
    .then((currentToken) =>{
        if(currentToken){
            console.log('currentToken: ',currentToken);
        }else {
            console.log('Can not get token');
        }
    });
      }else{
        console.log('Do not have permission');
      }});}
requestPermission();