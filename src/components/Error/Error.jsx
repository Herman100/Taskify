import React from "react";
import { Link } from "react-router-dom";
import "./error.css";
import svg from "./assets/error.svg";

function Error() {
  return (
    <>
      <div className="wrapper">
        <div className="error-text">
          <h1>Ooops 404 🤖</h1>
          <h1>Page Not Found</h1>
          <p>
            The page you are looking for does not exist. Please check the URL
            and try again.
          </p>
          <button>
            <Link className="link" to="/">
              Home
            </Link>
          </button>
        </div>
        <div className="error-image">
          <img src={svg} alt="404 Not Found" />
        </div>
      </div>
    </>
  );
}

export default Error;
