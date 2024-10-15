import { Link } from "react-router-dom";
import "../../styles/mypage/ListBox.scss";

const PostListBox = ({ title, items, handleModalOpen }) => {
  const openModal =  ()=>{
    handleModalOpen(items, title, "post");
  };

//   console.log(items.content);
    return (
      <div className="list-box">
        <h3 onClick={openModal}>{title} <span>더보기</span></h3>
        <ul>
          {items.content.slice(0, 10).map((item, index) => (
            <li key={index}>
                <Link to={`/posts/view/${item.postId}`}>
                    {item.postTitle}
                </Link>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default PostListBox;