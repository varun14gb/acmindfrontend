import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import isAuthenticated from "../auth";
import styles from "./Posts.module.css";

const Posts = () => {
  const [data, setData] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated()) {
      fetch(`/blog/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success === false) {
            if (res.message !== "Not Found") {
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
        <div
          onClick={() => navigate("/post/" + element._id)}
          key={element._id}
          className={styles.post}
        >
          <span>
            <h1>
              <i style={{ textDecoration: "underline dashed red" }}>
                {element.title}
              </i>
            </h1>
            <p>{new Date(element.time).toLocaleDateString()}</p>
            <p>{new Date(element.time).toLocaleTimeString()}</p>
          </span>
          <span>
            <br />
            <br />
            <h2>{element.authorName}</h2>
            <p>{element.authorRoll}</p>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Posts;
