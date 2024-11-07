import React, { useState } from 'react';
import PostItem from './PostItem';


const PostsList = ({ posts, onDelete }) => {


  return (
    <div className="users-info-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>PostTitle</th>
            <th>Nickname</th>
            <th>CategoryName</th>
            <th>Created At</th>
            <th>LikeCount</th>
            <th>ViewCount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <PostItem 
              key={post.postId} 
              post={post} 
              onDelete = {onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostsList;
