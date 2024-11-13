import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { questions } from "../../questions";
import "../../assets/TakeExam.css";

const TakeExam = () => {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes for example
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    if (timeLeft === 0) {
      calculateScore();
      setShowResults(true);
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerChange = (answer) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: answer }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (question.type === "multiple-choice" || question.type === "true-false") {
        if (answers[index] === question.correctAnswer) {
          newScore += 1;
        }
      }
    });
    setScore(newScore);
  };

  const handleSubmit = () => {
    calculateScore();
    setShowResults(true);
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    if (question.type === "multiple-choice") {
      return (
        <>
          <h5>{question.questionText}</h5>
          {question.options.map((option, index) => (
            <div key={index} className="option">
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={option}
                checked={answers[currentQuestion] === option}
                onChange={() => handleAnswerChange(option)}
              />
              <label>{option}</label>
            </div>
          ))}
        </>
      );
    } else if (question.type === "true-false") {
      return (
        <>
          <h5>{question.questionText}</h5>
          <div className="option">
            <input
              type="radio"
              name={`question-${currentQuestion}`}
              value="True"
              checked={answers[currentQuestion] === "True"}
              onChange={() => handleAnswerChange("True")}
            />
            <label>True</label>
          </div>
          <div className="option">
            <input
              type="radio"
              name={`question-${currentQuestion}`}
              value="False"
              checked={answers[currentQuestion] === "False"}
              onChange={() => handleAnswerChange("False")}
            />
            <label>False</label>
          </div>
        </>
      );
    } else if (question.type === "short-answer") {
      return (
        <>
          <h5>{question.questionText}</h5>
          <textarea
            value={answers[currentQuestion] || ""}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder={t("takeExam.placeholder")}
            rows="3"
            className="form-control"
          />
        </>
      );
    }
  };

  return (
    <div className="take-exam-container">
      {!showResults ? (
        <>
          <div className="timer">
            {t("takeExam.timerLabel")}: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}{timeLeft % 60}
          </div>
          <div className="question-section">
            <h4>
              {t("takeExam.questionLabel")} {currentQuestion + 1} {t("takeExam.ofLabel")} {questions.length}
            </h4>
            {renderQuestion()}
          </div>
          <div className="navigation-buttons">
            <button className="prev-btn" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
              {t("takeExam.prevButton")}
            </button>
            <button className="next-btn" onClick={handleNextQuestion} disabled={currentQuestion === questions.length - 1}>
              {t("takeExam.nextButton")}
            </button>
            <button className="submit-btn" onClick={handleSubmit}>
              {t("takeExam.submitButton")}
            </button>
          </div>
        </>
      ) : (
        <div className="results-section">
          <h3>{t("takeExam.resultsTitle")}</h3>
          <p>{t("takeExam.scoreText")}: {score} / {questions.length}</p>
        </div>
      )}
    </div>
  );
};

export default TakeExam;
