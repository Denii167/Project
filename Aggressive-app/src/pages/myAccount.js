// myAccount.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, removeUser } from "../redux/bazarSlice";
import { getAuth, deleteUser } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import {
  saveAddressToFirebase,
  deleteUserDataFromFirebase,
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
          dispatch(
            updateUser({
              _id: currentUser.uid,
              name: currentUser.displayName,
              email: currentUser.email,
              image: currentUser.photoURL,
              address: currentUser.address || {},
            })
          );
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
      await updateProfile(user, {
        ...user.providerData[0],
        address: { ...address },
      });

      dispatch(
        updateUser({
          ...user,
          address: { ...address },
        })
      );

      saveAddressToFirebase(user.uid, address);
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
    <div>
      <h2>My Account</h2>
      <div className="flex items-center gap-4">
        <img
          className="w-10 h-10 rounded-full"
          src={user.image}
          alt="Profile"
        />
        <span className="text-lg font-semibold">{user.name}</span>
      </div>
      <form>
        {/* labels and inputs for address fields */}

        <label>
          Country:
          <input
            type="text"
            name="country"
            value={address.country}
            onChange={handleInputChange}
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleInputChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Street:
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Number:
          <input
            type="text"
            name="number"
            value={address.number}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Postcode:
          <input
            type="text"
            name="postcode"
            value={address.postcode}
            onChange={handleInputChange}
          />
        </label>
        <button
          className="mt-5 ml-7 flex items-center gap-1 text-gray-400 hover:text-black duration-300 active:text-red-500"
          type="button"
          onClick={handleUpdateAddress}
        >
          Update Address
        </button>
      </form>
      <button
        className="mt-5 ml-7 flex items-center gap-1 text-red-600 hover:text-black duration-300 active:text-red-500"
        type="button"
        onClick={handleDeleteAccount}
      >
        Delete My Account
      </button>
    </div>
  );
};

export default MyAccount;
