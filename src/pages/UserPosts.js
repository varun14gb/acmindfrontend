import React from "react";
import AddPost from "../components/AddPost";
import Header from "../components/Header";
import UPosts from "../components/UPosts";
import Sidebar from "../components/Sidebar";

var styles = {
  container: {
    minWidth: "100%",
    minHeight: "100vh",
    backgroundColor: "#121212",
    color: "white",
  },
};

const UserPosts = () => {
  return (
    <div style={styles.container}>
      <Header />
      <Sidebar />
      <AddPost />
      <UPosts />
    </div>
  );
};

export default UserPosts;
