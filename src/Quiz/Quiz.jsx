import React, { useState, useEffect } from "react";
import QuestionList from "../QuestionList";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import styles from "./Quiz.module.css";

const Quiz = ({ name }) => {
  const history = useHistory();
  if (!name) {
    history.push("/");
  }

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [select, setSelect] = useState("");
  const [lockAnswer, setLockAnswer] = useState("");
  const [click, setClick] = useState("");
  /* const [selectOptions, setSelectOptions] = useState(""); */
  /* const [array, setArray] = useState([]);
  const [indexArray, setIndexArray] = useState([]); */
  const [countDown, setCountDown] = useState(10);
  const [feedback, setFeedback] = useState("");

  /* if (countDown > 0) {
    setInterval(() => {
      setCountDown(countDown - 1);
    }, 10000);
  } else {
    handleNext();
  } */

  //console.log(countDown);
  /*  const selectOne = (e) => {
    setSelect(1);
    console.log(select);
  }; */
  /*  console.log(indexArray[0]); */
  //console.log(array);

  //quit quiz
  const quizQuit = () => {
    history.push("/");
  };

  //on click on options
  const handleAnswerButtonClick = (isCorrect, i, option) => {
    setClick(i);
    if (isCorrect === true) {
      setLockAnswer(true);
    } else {
      setLockAnswer(false);
    }
    setSelect(" ");
  };

  //lock the answers and next
  const handleNext = () => {
    setClick("");
    if (lockAnswer === true) {
      setScore(score + 1);
      console.log(score);
    }
    setLockAnswer(false);
    const nextQuetions = currentQuestion + 1;
    if (nextQuetions < QuestionList.length) {
      setCurrentQuestion(nextQuetions);
      setSelect("");
      setShowScore(false);
      setCountDown(10);
    } else {
      setShowScore(true);
      setCountDown(";");
    }
  };

  //feedback handle function
  const handleMessageChange = (event) => {
    // 👇️ access textarea value
    setFeedback(event.target.value);
  };

  let welcome = "Welcome";

  if (showScore === true && score >= 3) {
    welcome = "Congratulations";
    name = "You Won";
  } else if (showScore === true && score < 3) {
    welcome = "Well played";
    name = "Try Again";
  }

  const reTake_quiz = () => {
    history.push("/");
  };

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    const interval = setInterval(() => {
      const num = -1;
      setCountDown((countDown) => {
        if (countDown < 1) {
          return 10;
        }
        return countDown + num;
      });
    }, 2000);

    window.addEventListener("beforeunload", unloadCallback);
    return (
      () => clearInterval(interval),
      () => window.removeEventListener("beforeunload", unloadCallback)
    );
  }, []);

  return (
    <>
      <div className={styles.quiz_wrapper}>
        <div className={styles.hero}>
          <div className="quiz_page_header pb-4 pt-4">
            <h1 className={`${styles.header} text-center opacity-75`}>
              LET'S TEST YOUR KNOWLEDGE
            </h1>
          </div>
          <div className={`mt-2 mb-3 ${styles.quiz_page_welcome}`}>
            <h1 className="ms-5">{countDown < 11 ? countDown : ""} </h1>
            <h2 className="text-center">
              {welcome}, {name}
            </h2>
          </div>
          <div className="app">
            {showScore ? (
              <div className={`${styles.score_section} text-center`}>
                You scored {score} out of {QuestionList.length}
                <div className="mt-5">
                  <div className="d-flex justify-content-center  align-items-center flex-column ">
                    <label
                      htmlFor={styles.feedbackInput}
                      className={styles.feedback_label}
                    >
                      Write Feedback before Retake Quiz
                    </label>
                    <textarea
                      name="feedback"
                      id={styles.feedbackInput}
                      cols="50"
                      rows="5"
                      className="mb-3"
                      onChange={handleMessageChange}
                    ></textarea>
                  </div>
                  <Button
                    disabled={feedback === ""}
                    onClick={reTake_quiz}
                    variant="contained"
                  >
                    ReTake Quiz
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="question_section text-center">
                  <div
                    className={`${styles.question_count} d-flex justify-content-start ms-5`}
                  >
                    <span>Question {currentQuestion + 1}</span>/
                    {QuestionList.length}
                  </div>
                  <div className={styles.question_text}>
                    {QuestionList[currentQuestion].questionText}
                  </div>
                </div>
                <div className=" answer-section mt-5 d-flex justify-content-around align-items-center flex-column">
                  {QuestionList[currentQuestion].answerOptions.map(
                    (answerOptions, i) => (
                      <button
                        key={i}
                        id={`${styles.inputAnswerBtn}`}
                        style={{
                          backgroundColor: click === i ? "salmon" : "",
                          color: click === i ? "white" : "",
                        }}
                        className="me-2"
                        onClick={() =>
                          handleAnswerButtonClick(
                            answerOptions.isCorrect,
                            i,
                            answerOptions.answerText
                          )
                        }
                      >
                        {answerOptions.answerText}
                      </button>
                    )
                  )}
                </div>
                <div className="text-center mb-5">
                  <button
                    id={styles.QuitBtn}
                    className=" me-4 Lock_btn  w-25 btn mt-5 text-center btn-info"
                    onClick={quizQuit}
                  >
                    Quit
                  </button>
                  <button
                    disabled={!select}
                    id={styles.nextBtn}
                    onClick={countDown === 0 ? handleNext() : handleNext}
                    className=" Lock_btn  w-25 btn mt-5 text-center btn-info"
                    type="button"
                  >
                    Lock
                  </button>
                </div>
              </>
            )}
          </div>
          <div className={styles.cube}></div>
          <div className={styles.cube}></div>
          <div className={styles.cube}></div>
          <div className={styles.cube}></div>
          <div className={styles.cube}></div>
          <div className={styles.cube}></div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
