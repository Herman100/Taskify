import styles from "./styles/login.module.css";
import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContextProvider";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value === "" || emailRef.current.value === "") {
      return setError("Password or Email is empty");
    }

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/Taskify/");
      passwordRef.current.value = "";
      emailRef.current.value = "";
    } catch (error) {
      setError("Account login failed. Invalid email or password");
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form_container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.heading}>LOGIN</h1>
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
              <Link to="/reset" className={styles.password_forgot}>
                Forgot Password?
              </Link>
            </div>

            <button
              type="button"
              disabled={loading}
              text="Sign Up"
              onClick={handleSubmit}
            >
              Login
            </button>
            <div className={styles.renavigation}>
              <p className={styles.account_status}>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>

              {error && <p className={styles.error}>🔴 {error}</p>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
