// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, deleteDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsISR7B_T0WTEqIgmpTw09Go26ltzVOVM",
  authDomain: "aggressapp.firebaseapp.com",
  projectId: "aggressapp",
  storageBucket: "aggressapp.appspot.com",
  messagingSenderId: "783302765461",
  appId: "1:783302765461:web:ebfc9f010154bab728a49c",
};

export const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

const saveAddressToFirebase = async (userId, address) => {
  console.log("Saving address to Firebase");
  try {
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, { address }, { merge: true });
    console.log("Address saved to Firebase profile successfully");
  } catch (error) {
    console.error("Error saving address to Firebase profile:", error);
  }
};

const deleteUserDataFromFirebase = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId); // Replace 'users' with your Firestore collection name
    await deleteDoc(userDocRef);

    console.log("User data deleted from Firebase successfully");
  } catch (error) {
    console.error("Error deleting user data from Firebase:", error);
  }
};

export { saveAddressToFirebase, deleteUserDataFromFirebase, auth, db };
