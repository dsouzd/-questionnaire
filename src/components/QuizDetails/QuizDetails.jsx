import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/QuizDetails.css';
import { useTranslation } from 'react-i18next';

export const QuizDetails = () => {
  const [isProceedEnabled, setIsProceedEnabled] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation(); // Initialize translation hook

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProceedEnabled(true);
    }, 10000); // 10 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const handleProceed = () => {
    navigate('/exam');
  };

  return (
    <div className="quiz-details-container">
      <h2>{t('quizDetails.title')}</h2>
      <div className="instructions">
        <p>{t('quizDetails.welcome')}</p>
        <ul>
          <li>{t('quizDetails.instructions.questionTypes')}</li>
          <li>{t('quizDetails.instructions.timeLimit')}</li>
          <li>{t('quizDetails.instructions.connection')}</li>
          <li>{t('quizDetails.instructions.timer')}</li>
          <li>{t('quizDetails.instructions.refreshWarning')}</li>
          <li>{t('quizDetails.instructions.scoreFeedback')}</li>
          <li>{t('quizDetails.instructions.support')}</li>
        </ul>
      </div>

      <button
        onClick={handleProceed}
        className="proceed-button"
        disabled={!isProceedEnabled}
      >
        {isProceedEnabled ? t('quizDetails.proceedButtonEnabled') : t('quizDetails.proceedButtonDisabled')}
      </button>
    </div>
  );
};

export default QuizDetails;
