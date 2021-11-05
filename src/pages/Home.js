import React, { useState } from "react";

import Signup from "../components/Signup";
import Login from "../components/Login";
import styles from "./Home.module.css";

const Home = () => {
  const [signup, setsup] = useState(true);
  return (
    <div className={styles.container}>
      <div className={styles.jumbo}>
        {signup ? <Signup setsup={setsup} /> : <Login setsup={setsup} />}
      </div>
    </div>
  );
};

export default Home;
