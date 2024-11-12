import React, { useState } from "react";
import { useParams, useNavigate, Link, useLoaderData } from "react-router-dom";
import styled from "styled-components";
import { removePost, showPost } from "../../services/post/postService";
import { postLike, postLikeCancel } from "../../services/post/postMetaService";
import { createComment, editComment, removeComment } from "../../services/post/commentService";
import PostContent from "../../components/postview/postContent";
import PostComment from "../../components/postview/postComment";

export async function postViewLoader({ params }) {
  const { postId } = params;
  try {
    const postData = await showPost(postId);
    return {
      post: postData.post,
      comments: postData.comments || [],
    };
  } catch (error) {
    console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
    return { post: null, comments: [] };
  }
}

const PostView = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { post: initialPost, comments: initialComments } = useLoaderData();

  const [post, setPost] = useState(initialPost);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  // 좋아요 토글
  const handleLikeToggle = async () => {
    try {
      if (post.isLiked) {
        await postLikeCancel(postId);
      } else {
        await postLike(postId);
      }

      setPost((prevPost) => ({
        ...prevPost,
        isLiked: !prevPost.isLiked,
        likeCount: prevPost.isLiked ? prevPost.likeCount - 1 : prevPost.likeCount + 1,
      }));
    } catch (error) {
      console.error("좋아요 상태를 변경하는 중 오류가 발생했습니다:", error);
    }
  };

  // 게시글 삭제
  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말로 이 게시물을 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await removePost(postId);
        navigate("/posts");
      } catch (error) {
        console.error("게시물 삭제 중 오류 발생:", error);
      }
    }
  };

  // 댓글 제출
  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      try {
        await createComment(postId, newComment);
        setComments((prevComments) => [...prevComments, { content: newComment, id: Date.now() }]);
        setNewComment("");
      } catch (error) {
        console.error("댓글 작성 중 오류 발생:", error);
      }
    }
  };

  // 댓글 수정 감지 및 변화
  const handleEditComment = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditedComment(content);
  };

  // 댓글 수정 제출
  const handleUpdateComment = async (commentId) => {
    try {
      await editComment(commentId, editedComment);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? { ...comment, content: editedComment, modified: true } : comment
        )
      );
      setEditingCommentId(null);
      setEditedComment("");
    } catch (error) {
      console.error("댓글 수정 중 오류 발생:", error);
    }
  };

  // 댓글 삭제 제출
  const handleDeleteComment = async (commentId) => {
    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      try {
        await removeComment(commentId);
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
      } catch (error) {
        console.error("댓글 삭제 중 오류 발생:", error);
      }
    }
  };

  return (
    <Container>
      {post && (
        <PostContent post={post} postId={postId} onLikeToggle={handleLikeToggle} onDelete={handleDelete} />
      )}
      <BackButton to="/posts">목록으로</BackButton>
      <PostComment
        comments={comments}
        newComment={newComment}
        setNewComment={setNewComment}
        handleCommentSubmit={handleCommentSubmit}
        editingCommentId={editingCommentId}
        editedComment={editedComment}
        setEditedComment={setEditedComment}
        handleUpdateComment={handleUpdateComment}
        handleEditComment={handleEditComment}
        handleDeleteComment={handleDeleteComment}
      />
    </Container>
  );
};

export default PostView;

// Styled Components
const Container = styled.div`
  width: 100%;
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin: 15px 0;
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;

  &:hover {
    background-color: #5a6268;
  }
`;
