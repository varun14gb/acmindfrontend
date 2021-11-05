/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import avatar from "../assets/avatar.png";
import Modal from "./Modal";
import isAuthenticated from "../auth";

const Sidebar = () => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(null);
  const [roll, setRoll] = useState(null);
  const [pass, setPass] = useState(null);
  const [ntoggle, setNtoggle] = useState(false);

  const toggle = () => {
    setEdit(!edit);
  };
  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleRoll = (event) => {
    setRoll(event.target.value);
  };
  const handlePass = (event) => {
    setPass(event.target.value);
  };

  let user;
  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  } else {
    user = {
      name: "name",
      roll: "12345678",
    };
  }

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isAuthenticated()) {
      if (name == null && roll == null && pass == null) {
        alert("Edit atleast one field or otherwise close!");
      } else {
        let data = {};
        if (name != null) {
          data["name"] = name;
        }
        if (roll != null) {
          data["roll"] = roll;
        }
        if (pass != null) {
          data["pass"] = pass;
        }
        fetch(`/user/${user.roll}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            data,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success === false) {
              alert(JSON.stringify(data.message));
            } else {
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
    } else {
      alert("Not Authenticated!");
      logout();
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();
    if (isAuthenticated()) {
      fetch(`/user/` + user.roll, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === false) {
            console.log(data);
            alert(JSON.stringify(data.message));
          } else {
            logout();
          }
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Not Authenticated!");
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <>
      <div
        style={{
          display: screen.width < 768 ? (ntoggle ? "flex" : "none") : "flex",
        }}
        className={styles.Sidebar}
      >
        <div>
          <h1>{user.name}</h1>
          <p>{user.roll}</p>
        </div>
        <img className={styles.img} alt="avatar" src={avatar} />
        <div>
          <h4 onClick={() => navigate("/posts")}>Your Posts &#10024;</h4>
          <h4 onClick={toggle}>Edit Profile &#9997;</h4>
          <h4 onClick={handleDelete}>Delete &#9940;</h4>
          <h4 onClick={logout}>Logout &#9995;</h4>
          <br></br>
          <br></br>
        </div>
      </div>
      <div onClick={() => setNtoggle(!ntoggle)} className={styles.toggle}>
        {ntoggle ? "X" : "="}
      </div>
      <Modal show={edit} handleClose={toggle} handleSubmit={handleSubmit}>
        <h1>Edit Profile Info</h1>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <input
            name="name"
            placeholder="To edit name"
            value={name}
            onChange={handleName}
            className={styles.input}
          />
          <input
            name="roll"
            placeholder="To edit Roll"
            type="number"
            value={roll}
            onChange={handleRoll}
            className={styles.input}
          />
          <input
            name="pass"
            placeholder="To edit password"
            type="password"
            value={pass}
            onChange={handlePass}
            className={styles.input}
          />
        </form>
      </Modal>
    </>
  );
};

export default Sidebar;
