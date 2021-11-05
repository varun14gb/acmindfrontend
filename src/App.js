import React from "react";
import { Routes, Route } from "react-router-dom";

import isAuthenticated from "./auth";

import Home from "./pages/Home";
import HomeAuth from "./pages/HomeAuth";
import Post from "./pages/Post";
import UserPosts from "./pages/UserPosts";

function App() {
  if (!isAuthenticated()) {
    return (
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route exact path="/" element={<HomeAuth />} />
        <Route path="/posts" element={<UserPosts />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    );
  }
}

export default App;
