import { Link } from "react-router-dom";
import "../../styles/mypage/ListBox.scss";

const QuizListBox = ({ title, items, setModalOpen }) => {
  const handleModalOpen =  ()=>{
    setModalOpen(true);
  };

  // console.log(items);
    return (
      <div className="list-box">
        {/* <button onClick={handleModalOpen}>더보기</button> */}
        <h3 onClick={handleModalOpen}>{title} <span>더보기</span></h3>
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