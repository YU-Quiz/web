import { Link } from 'react-router-dom';
import '../../styles/post_list_page/PostList.scss';

const PostItem = ({ post }) => {
  const {postId, postTitle, nickname, categoryName, likeCount, viewCount} = post;

  return (
    <div className="post-item">
      {/* 카테고리 */}
      <div className="post-type">[{categoryName}]</div>

      {/* 게시글 제목 */}
      <Link to={`/posts/view/${postId}`} className='post-question'>{postTitle}</Link>

      {/* 작성자, 작성일, 좋아요, 조회수 */}
      <div className="post-info">
        <span className="post-nickname">작성자: {nickname}</span>
        <span className="post-likes">좋아요: {likeCount}</span>
        <span className="post-views">조회수: {viewCount}</span>
      </div>
    </div>
  );
};

export default PostItem;
