import React, { useState } from 'react';

const CreatePost = ({ loggedInUser, onSectionChange }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://192.168.1.100:5005/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: loggedInUser._id, content }),
        });
        const data = await response.json();
        alert(data.message || 'Post created!');
        setContent('');
        onSectionChange('landingPage'); // Navigate back to dashboard
    };

    return (
        <div>
            <h2>Write a New Post</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="form-control mb-2"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="4"
                    required
                />
                <button type="submit" className="btn btn-danger">Create Post</button>
                <button type="button" className="btn btn-secondary" onClick={() => onSectionChange('landingPage')}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default CreatePost;