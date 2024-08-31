// src/pages/QuizListPage.jsx

import React, { useState } from 'react';
import QuizList from '../components/quizlist/QuizList';
import SearchBar from '../components/quizlist/SearchBar';
import SubjectDropdown from '../components/quizlist/SubjectDropdown'; // 드롭다운 컴포넌트로 변경
import '../styles/quiz_list_page/QuizListPage.scss';

const QuizListPage = () => {
  const quizzesData = [
    { id: 1, type: 'O/X', question: 'What is the capital city of France?', subject: 'Geography' },
    { id: 2, type: '선다형', question: 'Who was the first president of the United States?', subject: 'History' },
    { id: 3, type: '단답형', question: 'What is the chemical symbol for gold?', subject: 'Chemistry' },
    { id: 4, type: 'O/X', question: 'What is the capital city of France?', subject: 'Geography' },
    // 추가 데이터...
  ];

  const [subjects] = useState(['All', 'Geography', 'History', 'Chemistry']);

  const handleSearch = (query) => {
    // 검색 로직 작성
  };

  const handleSelectSubject = (subject) => {
    // 과목 선택 로직 작성
  };

  return (
    <div className="quiz-list-page-container">
      <nav className="navbar">
        <button className="nav-button">홈으로</button>
        <button className="nav-button">마이페이지</button>
      </nav>
      <div className='controls-container'>
        <SearchBar onSearch={handleSearch} />
        <SubjectDropdown subjects={subjects} onSelectSubject={handleSelectSubject} />
      </div>
      <QuizList currentQuizzes={quizzesData} />
    </div>
  );
};

export default QuizListPage;
