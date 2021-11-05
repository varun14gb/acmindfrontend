import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import SinglePost from "../components/SinglePost";
import Sidebar from "../components/Sidebar";

var styles = {
  container: {
    minWidth: "100%",
    minHeight: "100vh",
    backgroundColor: "#121212",
    color: "white",
  },
};

const Post = () => {
  const { id } = useParams();

  return (
    <div style={styles.container}>
      <Header />
      <Sidebar />
      <SinglePost id={id} />
    </div>
  );
};

export default Post;
