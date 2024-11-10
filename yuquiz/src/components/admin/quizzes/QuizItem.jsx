import "../../../styles/admin/UserItem.scss";

const QuizItem = ({
  quiz,
  onDelete,
}) => {
  const { quizId, quizTitle, nickname, createdAt, likeCount, viewCount } = quiz;

  const handleDeleteClick = () => {
    onDelete(quizId);

  };

  return (
    <tr className="post-item">
      <td>{quizId}</td>
      <td>{quizTitle}</td>
      <td>{nickname}</td>
      <td>{new Date(createdAt).toLocaleString()}</td>
      <td>{likeCount}</td>
      <td>{viewCount}</td>
      <td className="dropdown-cell">
        <button onClick={handleDeleteClick}>삭제</button>
      </td>
    </tr>
  );
};

export default QuizItem;