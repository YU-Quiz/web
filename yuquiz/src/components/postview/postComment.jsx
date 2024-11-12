import React from "react";
import styled from "styled-components";

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
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleEditingCommentChange = (e) => {
    setEditedComment(e.target.value);
  };

  return (
    <CommentsSection>
      <Title>댓글</Title>
      <CommentForm onSubmit={handleCommentSubmit}>
        <CommentInput
          placeholder="댓글을 작성하세요..."
          value={newComment}
          onChange={handleCommentChange}
          required
        />
        <SubmitCommentButton type="submit">댓글 남기기</SubmitCommentButton>
      </CommentForm>

      <CommentsList>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem key={comment.id}>
              <CommentWriter>작성자: {comment.writerName}</CommentWriter>

              {editingCommentId === comment.id ? (
                <>
                  <CommentEditInput
                    value={editedComment}
                    onChange={handleEditingCommentChange}
                  />
                  <CommentActionButton onClick={() => handleUpdateComment(comment.id)}>
                    수정 완료
                  </CommentActionButton>
                </>
              ) : (
                <>
                  <CommentContent>{comment.content}</CommentContent>
                  {comment.isWriter && (
                    <ActionButtons>
                      <CommentActionButton onClick={() => handleEditComment(comment.id, comment.content)}>
                        수정
                      </CommentActionButton>
                      <CommentActionButton onClick={() => handleDeleteComment(comment.id)}>
                        삭제
                      </CommentActionButton>
                    </ActionButtons>
                  )}
                </>
              )}
              <CommentDate>
                작성일: {new Date(comment.createdAt).toLocaleString()}
              </CommentDate>
              {comment.modified && <CommentModified>(수정됨)</CommentModified>}
            </CommentItem>
          ))
        ) : (
          <NoComments>댓글이 없습니다.</NoComments>
        )}
      </CommentsList>
    </CommentsSection>
  );
};

export default PostComment;

// Styled Components
const CommentsSection = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const CommentInput = styled.textarea`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  resize: vertical;
`;

const SubmitCommentButton = styled.button`
  align-self: flex-end;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const CommentsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CommentItem = styled.li`
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
`;

const CommentWriter = styled.p`
  font-weight: bold;
  margin: 0 0 5px;
`;

const CommentContent = styled.p`
  margin: 5px 0;
`;

const CommentDate = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin: 5px 0;
`;

const CommentModified = styled.p`
  font-size: 0.875rem;
  color: #888;
  font-style: italic;
`;

const CommentEditInput = styled.textarea`
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 10px 0;
  resize: vertical;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const CommentActionButton = styled.button`
  padding: 5px 10px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background-color: #5a6268;
  }
`;

const NoComments = styled.li`
  color: #888;
  font-size: 1rem;
  padding: 10px 0;
  text-align: center;
`;
