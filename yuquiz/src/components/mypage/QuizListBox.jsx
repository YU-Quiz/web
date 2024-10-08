import { Link } from "react-router-dom";
import "../../styles/mypage/ListBox.scss";

const QuizListBox = ({ title, items }) => {
  console.log(items);
    return (
      <div className="list-box">
        <h3>{title} <span>더보기</span></h3>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
                <Link to={`/quiz/play/${item.quizId}`}>
                    {item.quizTitle}
                </Link>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default QuizListBox;