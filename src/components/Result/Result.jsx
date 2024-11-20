import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Result = () => {
  return (
    <div className="result-container">
      <div className="result-content">
        <FontAwesomeIcon
          icon={faCheckCircle}
          style={{ color: "green", fontSize: "50px" }}
              />
              <h2>Thankyou! Your results have been Submitted</h2>
      </div>
    </div>
  );
}

export default Result