import React from "react";
import exam from "../../assets/exam.svg";
import "../../assets/Home.css";

const Home = () => {
  return (
    <div className="hero-section">
      <div className="hero-left">
        <h1>
          Take your <span>Exams</span> online
        </h1>
        <p>
          With the help of our online examination system, you can easily create
          and take exams online.
        </p>
        <button className="hero-btn">Get Started</button>
      </div>
      <div className="hero-right">
        <img src={exam} alt="hero-img" />
      </div>
    </div>
  );
};

export default Home;

