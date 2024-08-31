import '../../styles/post_list_page/PostList.scss';

const PostItem = ({ post }) => {
  return (
    <div className="post-item">
      <div className="post-type">{post.category}</div>
      <div className="post-question">{post.title}</div>
    </div>
  );
};

export default PostItem;
