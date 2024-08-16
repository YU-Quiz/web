import React from 'react';
import '../../styles/root/PostCard.scss';

const PostCard = ({ title, category }) => {
    return (
        <div className="post-card">
            <div className="post-content">
                <h4>{category}</h4>
                <h2>{title}</h2>
                <a href="#">Read More</a>
            </div>
        </div>
    );
}

export default PostCard;
