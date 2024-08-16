import React from 'react';
import '../../styles/root/QuizCard.scss';

const QuizCard = ({ title, quizType }) => {
    return (
        <div className="quiz-card">
            <h4>{quizType}</h4>
            <h3>{title}</h3>
            <button className="quiz-enter-btn" >퀴즈 풀기</button>
        </div>
    );
}

export default QuizCard;
