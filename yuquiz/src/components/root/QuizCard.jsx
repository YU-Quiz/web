import React from 'react';
import '../../styles/root/QuizCard.scss';
import { Link } from 'react-router-dom';

const QuizCard = ({ title, quizType }) => {
    return (
        <div className="quiz-card">
            <h4>{quizType}</h4>
            <h3>{title}</h3>
            <Link to='/quiz/play/12' className='quiz-enter-btn'>퀴즈 풀기</Link>
        </div>
    );
}

export default QuizCard;
