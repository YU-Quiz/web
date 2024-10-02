import React from "react";
import "../../styles/post/postview/postComment.scss";

const PostComment = ({
  comments,
  newComment,
  setNewComment,
  handleCommentSubmit,
  editingCommentId,
  editedComment,
  setEditedComment,
  handleUpdateComment,
  handleEditComment,
  handleDeleteComment,
}) => {
  // 새 댓글 변화 감지
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleEditingCommentChange = (e) => {
    setEditedComment(e.target.value);
  };

  // console.log(comments);

  return (
    <div className="comments-section">
      <h3>댓글</h3>
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

      <ul className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <p className="comment-writer">작성자: {comment.writerName}</p>
              
              {editingCommentId === comment.id ? (
                <>
                  <textarea
                    value={editedComment}  // 수정된 댓글 상태로 연결
                    onChange={handleEditingCommentChange}
                  />
                  <button onClick={() => handleUpdateComment(comment.id)}>
                    수정 완료
                  </button>
                </>
              ) : (
                <>
                  <p className="comment-content">{comment.content}</p>
                  {/* 현재 사용자가 작성한 댓글만 수정, 삭제 버튼 표시 */}
                  {comment.isWriter && (
                    <>
                      <button onClick={() => handleEditComment(comment.id, comment.content)}>
                        수정
                      </button>
                      <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
                    </>
                  )}
                </>
              )}
              <p className="comment-date">
                작성일: {new Date(comment.createdAt).toLocaleString()}
              </p>
              {comment.modified && <p className="comment-modified">(수정됨)</p>}
            </li>
          ))
        ) : (
          <li>댓글이 없습니다.</li>
        )}
      </ul>
    </div>
  );
};

export default PostComment;
