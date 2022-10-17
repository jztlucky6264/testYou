import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import logo from "../image/PLAYPOWERlogo.webp";
import styles from "./Home.module.css";
const Home = ({ setWelcomeUser }) => {
  const [name, setName] = useState("");
  const history = useHistory();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleClick = () => {
    if (name === "") {
      alert("please fill your name");
    } else {
      history.push("/quiz");
    }
    setWelcomeUser(name);
    setName("");
  };

  return (
    <>
      <div className={styles.pageWrapper}>
        <div className={styles.area}>
          <ul className={styles.circles}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>

          <div id={styles.header} className="w-100 pt-4 pb-4">
            <img className={`ms-3 ${styles.brandLogo}`} src={logo} alt="logo" />
            <h1 className="text-center  text-info">TECHY QUIZ APP</h1>
          </div>

          <div
            id={styles.quizPreRequistes}
            className="info_div container mt-5 text-center pt-4 pb-5  d-flex justify-content-between align-items-centerd flex-column "
          >
            <div id={styles.input_wrapper} className=" mb-5">
              <TextField
                className={styles.inputField}
                value={name}
                onChange={handleName}
                id="standard-basic"
                label="Name"
                variant="standard"
              />
            </div>
            <div className="mt-5 ">
              <Button
                className={styles.nextBtn}
                disabled={!name}
                onClick={handleClick}
                variant="contained"
              >
                Take Quiz
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
