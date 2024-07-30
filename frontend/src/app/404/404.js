import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404</h1>
      <p style={styles.message}>
        Page not found....contact admin at{" "}
        <a href="mailto:fahad-asim2001@live.com">fahad-asim2001@live.com</a> or
        try logging in again.
      </p>
      <Link to="/login" style={styles.link}>
        Go to Login Page
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
  },
  header: {
    fontSize: "72px",
    margin: "0",
  },
  message: {
    fontSize: "24px",
    margin: "20px 0",
  },
  link: {
    fontSize: "20px",
    color: "#007bff",
    textDecoration: "none",
  },
};

export default NotFound;
