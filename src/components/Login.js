import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import anar from "../assets/anar.png";
import styles from "./Login.module.css";

const Login = (props) => {
  const [roll, setRoll] = useState();
  const [password, setPassword] = useState();

  const handleRoll = (event) => {
    setRoll(event.target.value);
  };
  const handlePass = (event) => {
    setPassword(event.target.value);
  };

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (roll < 100000000 || roll > 999999999) {
      alert("roll no. must be 9 digits!!");
    } else if (password === "") {
      alert("password cannot be empty");
    } else {
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            roll,
            password,
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === false) {
            alert(JSON.stringify(data.message));
          } else {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.data));
            navigate("/");
            // eslint-disable-next-line no-restricted-globals
            location.reload();
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.c2}>
        <form className={styles.form}>
          <h1 className={`${styles.h1} ${styles.color}`}>Login</h1>
          <input
            className={styles.input}
            name="roll"
            type="number"
            minLength="9"
            maxLength="9"
            placeholder="Enter Roll No. Here"
            value={roll}
            onChange={handleRoll}
          />
          <input
            className={styles.input}
            name="password"
            type="password"
            placeholder="Enter Password Here"
            value={password}
            onChange={handlePass}
          />
          <button onClick={handleSubmit} className={styles.button}>
            Sign In
          </button>
          <p>
            Not Registered?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => props.setsup(true)}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
      <div className={styles.c1}>
        <div style={{ textAlign: "center", marginBottom: 0 }}>
          <h1 className={styles.h1}>
            <b>Welcome</b>
          </h1>
          <p className={styles.p}>
            Share your diwali experiences and spread joy
          </p>
        </div>
        <img className={styles.img} alt="anar" src={anar} />
      </div>
    </div>
  );
};

export default Login;
