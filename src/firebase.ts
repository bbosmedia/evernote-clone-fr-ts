// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseApp = initializeApp ({
  apiKey: "AIzaSyAPtEVLUryNtp44P0N9a7vf1z2WDTtq75w",
  authDomain: "fir-clone-6c649.firebaseapp.com",
  projectId: "fir-clone-6c649",
  storageBucket: "fir-clone-6c649.appspot.com",
  messagingSenderId: "393845512991",
  appId: "1:393845512991:web:117b3903d7b9e1f78fee2a"
});

// Initialize Firebase

export const db = getFirestore();