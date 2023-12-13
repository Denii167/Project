// myAccount.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, removeUser } from "../redux/bazarSlice";
import { getAuth, deleteUser } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import {
  saveAddressToFirebase,
  deleteUserDataFromFirebase,
  db,
} from "../FirebaseDb";

const MyAccount = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const user = useSelector((state) => state.bazar.userInfo);

  const [address, setAddress] = useState({
    country: user?.address?.country || "",
    state: user?.address?.state || "",
    city: user?.address?.city || "",
    street: user?.address?.street || "",
    number: user?.address?.number || "",
    postcode: user?.address?.postcode || "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnapshot = await getDoc(userDocRef);

          const userDocData = userDocSnapshot.data();
          const updatedUser = {
            _id: currentUser.uid,
            name: currentUser.displayName,
            email: currentUser.email,
            image: currentUser.photoURL,
            address: userDocData?.address || {}, // Ensure to fetch address data from Firestore
          };

          dispatch(updateUser(updatedUser));
          setAddress(updatedUser.address);
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
      await saveAddressToFirebase(user.uid, address);

      // Fetch the updated user details from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      const updatedUser = {
        _id: user.uid,
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
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
      await deleteUser(auth.currentUser);
      dispatch(removeUser());
      deleteUserDataFromFirebase(user.uid);
      console.log("User account deleted successfully");
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
          src={user.image}
          alt="Profile"
        />
        <span className="text-lg font-semibold">{user.name}</span>
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
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          type="button"
          onClick={handleUpdateAddress}
        >
          Update Address
        </button>
      </form>
      <button
        className="mt-5 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        type="button"
        onClick={handleDeleteAccount}
      >
        Delete My Account
      </button>
    </div>
  );
};

export default MyAccount;
