import React from "react";
import "../../styles/post/postview/postComment.scss";

const PostComment = ({
  comments,
  newComment,
  setNewComment,
  handleCommentSubmit,
  editingCommentId,
  setEditedContent,
  handleUpdateComment,
  handleEditComment,
  handleDeleteComment,
}) => {
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  return (
    <div className="comments-section">
      <h3>댓글</h3>
      <ul className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.id} className="comment-item">
              <p className="comment-writer">작성자: {comment.writerName}</p>
              {editingCommentId === comment.id ? (
                <>
                  <textarea
                    value={comment.content}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                  <button onClick={() => handleUpdateComment(comment.id)}>
                    수정 완료
                  </button>
                </>
              ) : (
                <>
                  <p className="comment-content">{comment.content}</p>
                  <button onClick={() => handleEditComment(comment.id, comment.content)}>
                    수정
                  </button>
                  <button onClick={() => handleDeleteComment(comment.id)}>삭제</button>
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
  );
};

export default PostComment;
