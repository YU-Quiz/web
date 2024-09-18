import '../../styles/post_list_page/PostList.scss';
import PostItem from './PostItem';

const PostList = ({posts}) =>{
  // console.log(posts);
    return (
        <div className="post-list">
          {posts.map(post => (
            <PostItem key={post.postId} post={post} />
          ))}
        </div>
      );
}

export default PostList;