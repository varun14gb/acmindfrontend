import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddPost.module.css";
import Modal from "./Modal";
import isAuthenticated from "../auth";

const AddPost = () => {
  const [add, setAdd] = useState(false);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const toggle = () => {
    setAdd(!add);
  };
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleContent = (event) => {
    setContent(event.target.value);
  };

  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isAuthenticated()) {
      if (title === "") {
        alert("Title cannot be empty!!");
      } else if (content === "") {
        alert("content cannot be empty");
      } else {
        fetch("/blog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            data: {
              title,
              content,
            },
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success === false) {
              alert(JSON.stringify(data.message));
            } else {
              navigate("/post/" + data.data._id);
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
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };
  return (
    <>
      <div onClick={toggle} className={styles.add}>
        +
      </div>
      <Modal show={add} handleClose={toggle} handleSubmit={handleSubmit}>
        <h1>Add Post</h1>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <input
            name="title"
            placeholder="Title here"
            value={title}
            onChange={handleTitle}
            className={styles.input}
          />
          <textarea
            name="content"
            rows="5"
            placeholder="Content here"
            value={content}
            onChange={handleContent}
            className={styles.textarea}
          />
        </form>
      </Modal>
    </>
  );
};

export default AddPost;
