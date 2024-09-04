import React from 'react';
import '../../styles/root/PostCard.scss';
import { Link } from 'react-router-dom';

const PostCard = ({ title, category }) => {
    return (
        <div className="post-card">
            <div className="post-content">
                <h4>{category}</h4>
                <h2>{title}</h2>
                <Link to='/posts/view/123'>더보기</Link>
            </div>
        </div>
    );
}

export default PostCard;
