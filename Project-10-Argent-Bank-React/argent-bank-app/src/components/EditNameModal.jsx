import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserProfileApi } from "./../apiServices.js";
import { updateUserProfile } from "./../redux/authSlice.js";

function EditNameModal({ user, token, onClose }) {
  const [firstName, setFirstName] = useState(user ? user.firstName : "");
  const [lastName, setLastName] = useState(user ? user.lastName : "");
  const dispatch = useDispatch();

  const handleSave = () => {
    const updatedUser = { firstName, lastName };
    dispatch(updateUserProfile({ userData: updatedUser, token }))
      .unwrap()
      .then((updatedUserData) => {
        console.log("Profile updated", updatedUserData);
        onClose(); // Ferme le modal après mise à jour
      })
      .catch((error) => {
        console.error("Failed to update profile", error);
      });
  };

  return (
    <div className="edit-modal">
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default EditNameModal;
