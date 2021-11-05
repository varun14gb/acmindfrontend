import React, { useState, useEffect } from "react";
import UserPost from "./UserPost";
import styles from "./UPosts.module.css";
import { useNavigate } from "react-router-dom";
import isAuthenticated from "../auth";

const Posts = () => {
  const [data, setData] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated()) {
      fetch(`/userblogs`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success === false) {
            if (res.message === "Not Found") {
              alert("You have 0 posts");
            } else {
              alert(JSON.stringify(res.message));
            }
          } else {
            setData(res.data);
          }
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Not Authenticated!");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/");
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  }, [navigate]);
  return (
    <div className={styles.main}>
      {data.map((element) => (
        <UserPost element={element} key={element._id} />
      ))}
    </div>
  );
};

export default Posts;
