import { setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { questionsData } from "./Question";
import "../../assets/Exam.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../../assets/Result.css";
import { useUser } from "../context/UserContext";
import { doc } from "firebase/firestore";
import { db } from "../../firebase";

const TakeExam = () => {
  const [selLanguage, setSelLanguage] = useState("");
  const [questions, setQuestions] = useState(questionsData.react);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [time, setTime] = useState(600);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [examComplete, setExamComplete] = useState(false);
  const { userDetails } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const examCompleted = localStorage.getItem("examCompleted");
    if (examCompleted === "true") {
      setExamComplete(true);
      return;
    }

    const examTime = localStorage.getItem("examTime");
    if (examTime) {
      const savedTime = parseInt(examTime);
      setTime(savedTime);
    }

    const interval = setInterval(() => {
      if (time > 0) {
        setTime((prevTime) => {
          const countdown = prevTime - 1;
          localStorage.setItem("examTime", countdown);
          return countdown;
        });
      } else {
        clearInterval(interval);
        setisSubmitted(true);
        handleSubmit();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  const timer = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleLanguage = (e) => {
    const language = e.target.value;
    setSelLanguage(language);
    setQuestions(questionsData[language]);
    setAnswers({});
    setScore(0);
    setCurrentQuestion(0);
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleAnswer = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = async () => {
    console.log(userDetails);
    if (!userDetails) {
      alert("Please log in to submit the exam.");
      return;
    }
    let marks = 0;
    questions.forEach((question) => {
      const selectedOption = answers[question.id];
      if (selectedOption === question.correctAnswer) {
        marks++;
      }
    });
    setScore(marks);

    try {
      const userDoc = doc(db, "users", userDetails.uid);
      await updateDoc(userDoc, {
        score: marks,
        examDate: new Date(),
      });
    } catch (error) {
      console.log(error);
    }

    localStorage.setItem("examCompleted", "true");
    navigate("/result");
    console.log(userDetails);
  };
  return examComplete ? (
    <div className="exam-complete">
      <h2>You have already completed your exam!!!!</h2>
    </div>
  ) : (
    <div className="exam-container">
      <div className="exam-nav">
        <select
          className="language-select"
          onChange={handleLanguage}
          value={selLanguage}
        >
          <option value="react">React.js</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>

        <div className="timer">
          <p>
            <FontAwesomeIcon icon={faStopwatch} style={{ color: "#8b0000" }} />{" "}
            {timer(time)}
          </p>
        </div>
      </div>

      <div className="question">
        <p>
          Question {currentQuestion + 1}of {questions.length}
        </p>
        <p>{questions[currentQuestion].question}</p>
        <ul className="questions">
          {questions[currentQuestion].options.map((option) => (
            <li key={option.id}>
              <input
                type="radio"
                name={`question-${questions[currentQuestion].id}`}
                value={option.id}
                checked={answers[questions[currentQuestion].id] === option.id}
                onChange={() =>
                  handleAnswer(questions[currentQuestion].id, option.id)
                }
              />
              {option.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="nav-buttons">
        <button
          onClick={handlePrev}
          className="prev"
          disabled={currentQuestion == 0}
        >
          Prev
        </button>
        <button className="submit" onClick={handleSubmit}>
          Submit Exam
        </button>
        <button
          onClick={handleNext}
          className="next"
          disabled={currentQuestion == questions.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TakeExam;
