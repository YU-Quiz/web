import "../../styles/mypage/ListBox.scss";

const ListBox = ({ title, items }) => {
    return (
      <div className="list-box">
        <h3>{title} <span>더보기</span></h3>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };

export default ListBox;