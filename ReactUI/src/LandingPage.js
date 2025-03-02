import React, { useEffect, useState } from 'react';
import Post from './Post';

const LandingPage = ({ loggedInUser, onSectionChange }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const response = await fetch('http://192.168.1.100:5005/api/posts');
        const data = await response.json();
        setPosts(data);
    };

    return (
        <div>
            <h1 style={{ color: "#2e6be3", textAlign: "center" }}>Welcome, {loggedInUser.username}!</h1>
            <button className="btn btn-warning my-3" onClick={() => onSectionChange('createPost')}>Create New Post</button>
            <h1 style={{ color: "#065678", padding: "2px 4px 6px 8px" }}>All Posts</h1>
            {posts.map((post) => (
                <Post key={post._id} post={post} loggedInUser={loggedInUser} />
            ))}
        </div>
    );
};

export default LandingPage;