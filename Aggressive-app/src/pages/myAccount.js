// myAccount.js

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, removeUser } from "../redux/bazarSlice";
import { getAuth, deleteUser } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { saveAddressToFirebase, db, useDeleteUserData } from "../FirebaseDb";
import { iconUser } from "../assets/index.js";

const MyAccount = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = useSelector((state) => state.bazar.userInfo);
  const deleteUserDataFromFirebase = useDeleteUserData();

  const [address, setAddress] = useState({
    country: "",
    state: "",
    city: "",
    street: "",
    number: "",
    postcode: "",
  });

  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDocRef = doc(db, "users", currentUser.providerData[0].uid);
          const userDocSnapshot = await getDoc(userDocRef);

          const userDocData = userDocSnapshot.data();
          const updatedUser = {
            _id: currentUser.uid,
            name: currentUser.displayName || "",
            email: currentUser.email || "",
            image: currentUser.photoURL || "",
            address: userDocData?.address || {},
          };

          dispatch(updateUser(updatedUser));
          setAddress(updatedUser.address);

          // Check if the user has an account in the Firestore database
          setHasAccount(userDocSnapshot.exists());
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [auth, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleUpdateAddress = async () => {
    try {
      const user = auth.currentUser;

      // Save the address to Firebase
      await saveAddressToFirebase(user.providerData[0].uid, address);

      // Fetch the updated user details from Firestore
      const userDocRef = doc(db, "users", user.providerData[0].uid);
      const userDocSnapshot = await getDoc(userDocRef);
      const updatedUser = {
        _id: user.uid,
        name: user.displayName || "",
        email: user.email || "",
        image: user.photoURL || "",
        address: userDocSnapshot.exists()
          ? userDocSnapshot.data().address || {}
          : {},
      };

      // Update the Redux store with the updated user details
      dispatch(updateUser(updatedUser));

      console.log("Address updated successfully");
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await deleteUser(currentUser);
        dispatch(removeUser());

        const userId = currentUser.uid;
        if (userId) {
          await deleteUserDataFromFirebase(userId);
          console.log("User data deleted successfully");
        }

        console.log("User account deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting user account:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">My Account</h2>
      <div className="flex items-center gap-4 mb-4">
        <img
          className="w-10 h-10 rounded-full"
          src={user?.image || iconUser}
          alt="Profile"
        />
        <span className="text-lg font-semibold">{user?.name || ""}</span>
      </div>
      <form className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="country" className="mb-1 text-sm font-semibold">
            Country:
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={address.country}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="state" className="mb-1 text-sm font-semibold">
            State:
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={address.state}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="city" className="mb-1 text-sm font-semibold">
            City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="street" className="mb-1 text-sm font-semibold">
            Street:
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={address.street}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="number" className="mb-1 text-sm font-semibold">
            Number:
          </label>
          <input
            type="text"
            id="number"
            name="number"
            value={address.number}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="postcode" className="mb-1 text-sm font-semibold">
            Postcode:
          </label>
          <input
            type="text"
            id="postcode"
            name="postcode"
            value={address.postcode}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        {/* ... (other address fields) */}
        {/* Conditionally render the button text based on whether the user has an account */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          type="button"
          onClick={handleUpdateAddress}
        >
          {hasAccount ? "Update Address" : "Create Account"}
        </button>
      </form>
      <button
        className="mt-5 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        type="button"
        onClick={handleDeleteAccount}
      >
        Delete Account
      </button>
    </div>
  );
};

export default MyAccount;
