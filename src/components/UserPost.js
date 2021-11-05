import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import isAuthenticated from "../auth";
import Modal from "./Modal";
import styles from "./UserPost.module.css";

const UserPost = (props) => {
  const [add, setAdd] = useState(false);
  const [title, setTitle] = useState(props.element.title);
  const [content, setContent] = useState(props.element.content);

  const toggle = () => {
    console.log(add);
    setAdd(!add);
    console.log(add);
  };
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleContent = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isAuthenticated()) {
      if (title === "") {
        alert("Title cannot be empty!!");
      } else if (content === "") {
        alert("content cannot be empty");
      } else {
        fetch(`/blog/` + props.element._id, {
          method: "PUT",
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

  const handleDelete = (event) => {
    event.preventDefault();
    if (isAuthenticated()) {
      if (title === "") {
        alert("Title cannot be empty!!");
      } else if (content === "") {
        alert("content cannot be empty");
      } else {
        fetch(`http://localhost:8000/blog/` + props.element._id, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success === false) {
              alert(JSON.stringify(data.message));
            } else {
              navigate("/posts");
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

  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  return (
    <>
      <div key={props.element._id} className={styles.post}>
        <div onClick={() => navigate("/post/" + props.element._id)}>
          <h1>
            <i style={{ textDecoration: "underline dashed red" }}>
              {props.element.title}
            </i>
          </h1>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>
              <p>{new Date(props.element.time).toLocaleDateString()}</p>
              <p>{new Date(props.element.time).toLocaleTimeString()}</p>
            </div>
            <div>
              <p>
                <b>{props.element.authorName}</b>
              </p>
              <p>{props.element.authorRoll}</p>
            </div>
          </div>
        </div>
        <div className={styles.handlers}>
          <span onClick={toggle}>Edit</span>
          <span onClick={handleDelete}>Delete</span>
        </div>
      </div>
      <Modal show={add} handleClose={toggle} handleSubmit={handleSubmit}>
        <h1>Edit Post</h1>
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

export default UserPost;
