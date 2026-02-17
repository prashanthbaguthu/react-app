import React from "react";

const Header = () => {
  return (
    <header style={styles.header}>
      <h1>My React App</h1>
      <nav>
        <a href="/" style={styles.link}>Home</a>
        <a href="/about" style={styles.link}>About</a>
        <a href="/contact" style={styles.link}>Contact</a>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    marginLeft: "15px",
    textDecoration: "none",
  },
};

export default Header;
