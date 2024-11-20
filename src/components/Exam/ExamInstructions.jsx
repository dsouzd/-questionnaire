import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/ExamInstruction.css";
import { toast } from "react-toastify";

const ExamInstructions = () => {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      if (localStorage.getItem("userDetails") === null) {
        toast.error("Please log in to take the exam.", {
          position: "top-center",
          autoClose: 2000,
        });
      navigate("/login");
    }
  });

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  const handleSubmit = () => {
    if (checked) {
      navigate("/exam");
    }
  };

  return (
    <div className="exam-instructions">
      <h1>Welcome to the exam</h1>
      <p>Please read the following instructions before taking the exam</p>

      <div className="instructions">
        <ul className="instruction-lists">
          <li>You must be logged in to take the exam.</li>
          <li>
            The exam has a strict time limit of{" "}
            <span className="time">10 minutes</span>.
          </li>
          <li>The exam consists of multiple-choice questions (MCQs).</li>
          <li>
            Select one option for each question. You can change your answer at
            any time.
          </li>
          <li>
            Use the "Next" and "Previous" buttons to navigate between questions.
          </li>
          <li>
            The exam will be automatically submitted once the time limit is
            reached.
          </li>
          <li>
            Refreshing or closing the browser will cause you to lose progress.
          </li>
          <li>Any form of cheating will lead to disqualification.</li>
        </ul>
      </div>

      <div className="checks">
        <input type="checkbox" checked={checked} onChange={handleCheckbox} />
        <label>I have read and understood all the instructions</label>
      </div>

      <button className="start-exam" disabled={!checked} onClick={handleSubmit}>
        Start Exam
      </button>
    </div>
  );
};

export default ExamInstructions;
