import React, { useState, useEffect } from 'react';
import '../../styles/post/PostView.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { removePost, showPost } from '../../services/post/postService';

const PostView = () => {
  const navigate = useNavigate();
  const { postId } = useParams(); // URL에서 
  const [post, setPost] = useState(null); // 게시물 데이터를 저장할 상태
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

    // 컴포넌트가 처음 렌더링될 때 게시물 데이터를 가져옵니다
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await showPost(postId); // showPost 함수로 데이터를 가져옵니다
        // console.log(response);
        setPost(postData); // 가져온 데이터를 상태에 저장
        // setComments(response.data.comments || []);
        
      } catch (error) {
        console.error('게시물을 불러오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchPost(); // 함수 호출
  }, [postId]);

  // 댓글 입력 상태처리
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  // 댓글 제출
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말로 이 게시물을 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await removePost(postId); // 게시글 삭제 API 호출
        navigate('/posts/list'); // 삭제 후 목록 페이지로 이동
      } catch (error) {
        console.error('게시물 삭제 중 오류 발생:', error);
      }
    }
  };

  return (
    <div className="postview-container">
      <div className='postview-box'>
        {/* 게시물이 존재할 경우에만 데이터를 표시 */}
        {post ? (
          <>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-category">카테고리: {post.categoryName}</p>
            <p className="post-nickname">작성자: {post.nickname}</p>
            <p className="post-date">작성일: {new Date(post.createdAt).toLocaleString()}</p>
            <div className="post-content">{post.content}</div>

            <div className="post-info">
              <p className="post-likes">좋아요: {post.likeCount}</p>
              <p className="post-views">조회수: {post.viewCount}</p>
              {post.modified && <p className="post-modified">(수정됨)</p>}
            </div>

            <div className="button-container">
              <Link to={`/posts/edit/${postId}`} className='edit-btn'>게시글 수정</Link>
              <button onClick={handleDelete} className="delete-btn">게시글 삭제</button>
              <Link to='/posts/list' className='back-btn'>목록으로</Link>
            </div>

            <div className="comments-section">
              <h3>댓글</h3>
              <ul className="comments-list">
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <li key={index} className="comment-item">
                      {comment}
                    </li>
                  ))
                ) : (
                  <li>댓글이 없습니다.</li>
                )}
              </ul>

              <form className="comment-form" onSubmit={handleCommentSubmit}>
                <textarea
                  className="comment-input"
                  placeholder="댓글을 작성하세요..."
                  value={newComment}
                  onChange={handleCommentChange}
                  required
                ></textarea>
                <button type="submit" className="submit-comment-btn">
                  댓글 남기기
                </button>
              </form>
            </div>
          </>
        ) : (
          <p>게시물을 불러오는 중입니다...</p>
        )}
      </div>
    </div>
  );
};

export default PostView;
