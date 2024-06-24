// FirebaseDb.js
import { initializeApp } from "firebase/app";
import { getAuth, deleteUser } from "firebase/auth";
import { getFirestore, doc, setDoc, deleteDoc } from "firebase/firestore";

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

export const saveAddressToFirebase = async (userId, address) => {
  console.log("Saving address to Firebase");
  try {
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, { address }, { merge: true });
    console.log("Address saved to Firebase profile successfully");
  } catch (error) {
    console.error("Error saving address to Firebase profile:", error);
  }
};

export const useDeleteUserData = () => {
  const deleteUserDataFromFirebase = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const userDocRef = doc(db, "users", userId);

        // Delete user data from Firestore
        await deleteDoc(userDocRef);

        console.log("User data deleted from Firebase");

        // Additional: Remove user ID from auth (optional)
        await deleteUser(auth.currentUser);
      } else {
        console.warn("User ID is undefined or null. User data not deleted.");
      }
    } catch (error) {
      console.error("Error deleting user data from Firebase:", error);
    }
  };

  return deleteUserDataFromFirebase;
};

export { auth, db, deleteDoc };
