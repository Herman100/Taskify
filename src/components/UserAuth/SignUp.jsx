import styles from "./styles/login.module.css";
import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContextProvider";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { signup } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      passwordRef.current.value = "";
      passwordConfirmRef.current.value = "";
      emailRef.current.value = "";
      navigate("/login");
    } catch (error) {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  // console.log(currentUser && currentUser.email);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form_container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.heading}>SIGN UP</h1>
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
            <div className={styles.input_container}>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                ref={passwordRef}
                min={8}
                required
              />
            </div>
            <div className={styles.input_container}>
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                placeholder="Confirm Password"
                ref={passwordConfirmRef}
                min={8}
                required
              />
            </div>
            <button
              type="button"
              disabled={loading}
              text="Sign Up"
              onClick={handleSubmit}
            >
              Sign Up
            </button>

            <p className={styles.account_status}>
              Already have an account? <Link to="/login">Login</Link>
            </p>

            {error && <p className={styles.error}>{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
