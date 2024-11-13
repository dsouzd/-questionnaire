import React from "react";
import exam from "../../assets/exam.svg";
import { useTranslation } from "react-i18next";
import "../../assets/Home.css";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="hero-section">
      <div className="hero-left">
        <h1 dangerouslySetInnerHTML={{ __html: t("home.title") }}></h1>
        <p>{t("home.description")}</p>
        <button className="hero-btn">{t("home.button")}</button>
      </div>
      <div className="hero-right">
        <img src={exam} alt="hero-img" />
      </div>
    </div>
  );
};

export default Home;
