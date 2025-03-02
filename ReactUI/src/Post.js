import React, { useState } from 'react';

const Post = ({ post, loggedInUser }) => {
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState(''); // Track comment input text
    const [error, setError] = useState(null);

    const fetchComments = async () => {
        const response = await fetch(`http://192.168.1.100:5005/api/comments/${post._id}`);
        const data = await response.json();
        setComments(data);
    };

    const toggleComments = async () => {
        if (showComments) {
            setShowComments(false);
        } else {
            await fetchComments(); // Fetch comments when shown
            setShowComments(true);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) {
            alert("Comment cannot be empty!");
            return;
        }

        try {
            const response = await fetch(`http://192.168.1.100:5005/api/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    postId: post._id,
                    userId: loggedInUser._id,
                    commentText: newComment,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setNewComment('');
                await fetchComments();
                alert(data.message || 'Comment added successfully!');
            } else {
                throw new Error(data.error || 'Unable to add comment');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while adding the comment');
        }
    };

    return (
        <div className="post-card">
            <h5>{post.content}</h5>
            <p>Posted by User ID: {post.userId} on {new Date(post.createdAt).toLocaleString()}</p>
            <button className="btn btn-link" onClick={toggleComments}>
                {showComments ? 'Hide Comments' : 'View Comments'}
            </button>
            {showComments && (
                <div>
                    {/* Comments Section */}
                    {comments.map((comment) => (
                        <div key={comment._id} className="comment-card">
                            <p>
                                <strong>User {comment.userId}:</strong> {comment.commentText}
                            </p>
                            <p className="text-muted">
                                Commented on {new Date(comment.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))}

                    <div style={{ marginTop: '15px' }}>
                        <textarea
                            className="form-control mb-2"
                            rows="2"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                        ></textarea>
                        <button className="btn btn-secondary btn-sm" onClick={handleAddComment}>
                            Add Comment
                        </button>
                        {error && (
                            <p className="text-danger" style={{ marginTop: '10px' }}>
                                {error}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Post;