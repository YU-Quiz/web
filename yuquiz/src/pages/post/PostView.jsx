import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { showPost, removePost } from "../../services/post/postService";
import { postLike, postLikeCancel } from "../../services/post/postMetaService";
import { createComment, editComment, removeComment } from "../../services/post/commentService";
import PostContent from "../../components/postview/postContent";
import PostComment from "../../components/postview/postComment";
import "../../styles/post/PostView.scss";

const PostView = () => {
  const { postId } = useParams(); // 게시글 id
  const navigate = useNavigate();

  const [post, setPost] = useState(null); // 게시글 객체
  const [comments, setComments] = useState([]); // 댓글 리스트
  const [newComment, setNewComment] = useState(""); // 새로 작성할 댓글
  const [editingCommentId, setEditingCommentId] = useState(null); // 현재 수정중인 댓글 id
  const [editedContent, setEditedContent] = useState(""); // 수정된 댓글

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await showPost(postId);
        setPost(postData.post);
        setComments(postData.comments || []);
      } catch (error) {
        console.error("게시물을 불러오는 중 오류가 발생했습니다:", error);
      }
    };

    fetchPost();
  }, [postId]);

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
        navigate("/posts/list");
      } catch (error) {
        console.error("게시물 삭제 중 오류 발생:", error);
      }
    }
  };

  // 댓글 제출
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        const addedComment = await createComment(postId, newComment);
        setComments([...comments, addedComment]);
        setNewComment("");
      } catch (error) {
        console.error("댓글 작성 중 오류 발생:", error);
      }
    }
  };

  // 댓글 수정 감지 및 변화
  const handleEditComment = (commentId, content) => {
    setEditingCommentId(commentId);
    setEditedContent(content);
  };

  // 댓글 수정 제출
  const handleUpdateComment = async (commentId) => {
    try {
      const updatedComment = await editComment(commentId, editedContent);
      setComments(
        comments.map((comment) =>
          comment.id === commentId ? { ...comment, content: updatedComment.content, modified: true } : comment
        )
      );
      setEditingCommentId(null);
    } catch (error) {
      console.error("댓글 수정 중 오류 발생:", error);
    }
  };

  // 댓글 삭제 제출
  const handleDeleteComment = async (commentId) => {
    if (window.confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      try {
        await removeComment(commentId);
        setComments(comments.filter((comment) => comment.id !== commentId));
      } catch (error) {
        console.error("댓글 삭제 중 오류 발생:", error);
      }
    }
  };

  return (
    <div className="postview-container">
      {post && (
        <PostContent post={post} postId = {postId} onLikeToggle={handleLikeToggle} onDelete={handleDelete} />
      )}

      <PostComment
        comments={comments}
        newComment={newComment}
        setNewComment={setNewComment}
        handleCommentSubmit={handleCommentSubmit}
        editingCommentId={editingCommentId}
        setEditedContent={setEditedContent}
        handleUpdateComment={handleUpdateComment}
        handleEditComment={handleEditComment}
        handleDeleteComment={handleDeleteComment}
      />
      <Link to="/posts/list" className="back-btn">목록으로</Link>
    </div>
  );
};

export default PostView;
