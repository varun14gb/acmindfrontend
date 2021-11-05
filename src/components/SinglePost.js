import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import isAuthenticated from "../auth";
import styles from "./SinglePost.module.css";

const SinglePost = (props) => {
  const [data, setData] = useState("");
  const id = props.id;
  let navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated()) {
      fetch(`/blog/` + id, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success === false) {
            alert(JSON.stringify(res.message));
          } else {
            setData(res.data[0]);
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
  }, [id, navigate]);
  return (
    <div className={styles.main}>
      <div className={styles.post}>
        <span>
          <h1>{data.title}</h1>
          <div className={styles.info}>
            <div>
              <p>{new Date(data.time).toLocaleDateString()}</p>
              <p>{new Date(data.time).toLocaleTimeString()}</p>
            </div>
            <div>
              <p>
                <b>{data.authorName}</b>
              </p>
              <p>{data.authorRoll}</p>
            </div>
          </div>
        </span>
        <hr style={{ width: "100%" }} />
        <span>
          <br />
          <br />
          <p className={styles.content}>{data.content}</p>
        </span>
      </div>
    </div>
  );
};

export default SinglePost;
