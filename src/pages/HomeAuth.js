import React from "react";
import AddPost from "../components/AddPost";
import Header from "../components/Header";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";

var styles = {
  container: {
    minWidth: "100%",
    minHeight: "100vh",
    backgroundColor: "#121212",
    color: "white",
  },
};

const HomeAuth = () => {
  return (
    <div style={styles.container}>
      <Header />
      <Sidebar />
      <AddPost />
      <Posts />
    </div>
  );
};

export default HomeAuth;
