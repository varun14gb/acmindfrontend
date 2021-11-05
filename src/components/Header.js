import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className={styles.link}>
          <img className={styles.img} alt="logo" src={logo} />
        </div>
      </Link>
    </div>
  );
};

export default Header;
