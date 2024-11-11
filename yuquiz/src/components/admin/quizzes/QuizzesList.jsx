import QuizItem from "./QuizItem";

const QuizzesList = ({ quizzes, onDelete }) => {


  return (
    <div className="users-info-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>QuizTitle</th>
            <th>Nickname</th>
            <th>Created At</th>
            <th>LikeCount</th>
            <th>ViewCount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <QuizItem 
              key={quiz.quizId} 
              quiz={quiz} 
              onDelete = {onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizzesList;
