import React from "react";
import "./footer.css";

function Footer() {
  return (
    <div className="footer">
      Copyright © {new Date().getFullYear()} taskify. All rights reserved.
    </div>
  );
}

export default Footer;
