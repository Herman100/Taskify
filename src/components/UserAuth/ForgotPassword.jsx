import styles from "./styles/login.module.css";
import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContextProvider";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();

  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your email for further instructions");
      emailRef.current.value = "";
    } catch (error) {
      setError("Account login failed");
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form_container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.heading}>FORGOT PASSWORD</h1>
            <div className={styles.input_container}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                ref={emailRef}
                required
              />
            </div>

            <button
              type="button"
              disabled={loading}
              text="Reset Passwq"
              onClick={handleSubmit}
            >
              Reset Password
            </button>
            <div className={styles.renavigation}>
              <p className={styles.account_status}>
                Have an account? <Link to="/login">Login</Link>
              </p>
              <p className={styles.account_status}>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
              {error && <p className={styles.error}>⚠️🔴 {error}</p>}
              {message && <p className={styles.message}>✅ {message}</p>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
