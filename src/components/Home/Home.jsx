import React from "react";
import { useTranslation } from "react-i18next"; 
import exam from "../../assets/exam.svg";
import "../../assets/Home.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Home = () => {
  const { t } = useTranslation(); 

  useGSAP(() => {
    gsap.from(".hero-left", {
      opacity: 0,
      duration: 1,
      delay: 0.5,
      y: -50,
    });
    gsap.from(".hero-right", {
      opacity: 0,
      duration: 1,
      delay: 1,
      x: 50,
    });
  })

  return (
    <div className="hero-section">
      <div className="hero-left">
        <h1>
          {t("home.home_title")} {" "}
          <span className="">{t("home.home_title2")}</span> {t("home.home_title3")}
        </h1>
        <p>{t("home.home_description")}</p>
        <button className="hero-btn">{t("home.home_get_started")}</button>
      </div>
      <div className="hero-right">  
        <img src={exam} alt="hero-img" />
      </div>
    </div>
  );
};

export default Home;
