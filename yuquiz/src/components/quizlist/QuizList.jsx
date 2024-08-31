import '../../styles/quiz_list_page/QuizList.scss';

const QuizList = ({currentQuizzes}) =>{
    return(
        <div className="quiz-list-container">
        {currentQuizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-card">
            <div className="quiz-type">{quiz.type}</div>
            <div className="quiz-question">{quiz.question}</div>
            <button className="quiz-button">퀴즈 풀기</button>
          </div>
        ))}
      </div>
    );
}

export default QuizList;