import React, { useState } from "react";
import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute";
import styles from "./settings.module.css";
import Footer from "../Footer/Footer";
import { useAuth } from "../../contexts/AuthContextProvider";

function Settings() {
  const [error, setError] = useState("");
  const [messages, setMessages] = useState("");
  const { currentUser, reauthenticate, updateUserPassword } = useAuth();

  function updateUser() {
    const oldPasswordInput = document.getElementById("oldPassword");
    const newPasswordInput = document.getElementById("newPassword");
    const credential = oldPasswordInput.value;

    if (newPasswordInput.value === "" || oldPasswordInput.value === "") {
      setError("Please fill in the required fields");
      return;
    }

    reauthenticate(credential)
      .then(() => {
        const newPassword = newPasswordInput.value;
        updateUserPassword(newPassword)
          .then(() => {
            setMessages("Password updated successfully");
            oldPasswordInput.value = "";
            newPasswordInput.value = "";
          })
          .catch((error) => {
            console.log(error);
            setError(error.message);
          });
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  }

  return (
    <>
      <ProtectedRoute>
        <div className={styles.settings}>
          <h1 className={styles.heading}>Settings</h1>
          <div className={styles.account}>
            <form className={styles.form}>
              <div className={styles.form_group}>
                <label htmlFor="currentEmail">Current Email</label>
                <input
                  type="email"
                  id="currentEmail"
                  placeholder={currentUser.email}
                  disabled
                  className={styles.disabled}
                />
                {/* <label htmlFor="newEmail">New Email</label>
                <input
                  type="email"
                  id="newEmail"
                  placeholder="update email address"
                /> */}
              </div>
              <div className={styles.form_group}>
                <label htmlFor="oldpassword">Old Password</label>
                <input type="password" id="oldPassword" required />
                <label htmlFor="newPassword"> New Password</label>
                <input type="password" id="newPassword" required />
              </div>
              <button type="button" onClick={updateUser}>
                Save
              </button>
              {error && <p className={styles.error}>{error}</p>}
              {messages && <p className={styles.messages}>{messages}</p>}
            </form>
          </div>
          <Footer />
        </div>
      </ProtectedRoute>
    </>
  );
}

export default Settings;
