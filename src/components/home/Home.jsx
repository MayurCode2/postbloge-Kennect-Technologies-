import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  getAllPosts,
  searchPostsAndComments,
} from "../home/postSlice";
import { addComment } from "../home/commentSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [postMessage, setPostMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Use an object to store comment messages for each post
  const [commentMessages, setCommentMessages] = useState({});

  // Redux state selectors
  const posts = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.post.loading);
  const error = useSelector((state) => state.post.error);

  const handleCreatePost = () => {
    dispatch(createPost({ message: postMessage }));
    setPostMessage(""); // Clear the input after posting
  };

  const handleAddComment = (postId) => {
    dispatch(addComment({ message: commentMessages[postId], postId }));
    // Clear the input for the specific post
    setCommentMessages({ ...commentMessages, [postId]: "" });
  };

  const handleSearch = () => {
    dispatch(searchPostsAndComments(searchQuery));
  };

  useEffect(() => {
    // Fetch all posts on component mount
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <div>
      {/* Post creation section */}
      <div>
        <h2>Create a new post</h2>
        <input
          type="text"
          placeholder="Type your post here..."
          value={postMessage}
          onChange={(e) => setPostMessage(e.target.value)}
        />
        <button onClick={handleCreatePost}>Post</button>
      </div>

      {/* Post search section */}
      <div>
        <h2>Search Posts</h2>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Display posts */}
      <div>
        <h2>Posts</h2>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {posts.map((post) => (
          <div key={post._id}>
            <p>{post.message}</p>
            {/* Display comments for each post */}
            {post.comments.map((comment) => (
              <div key={comment._id}>
                <p>{comment.message}</p>
              </div>
            ))}
            {/* Add comment section */}
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentMessages[post._id] || ""}
              onChange={(e) =>
                setCommentMessages({
                  ...commentMessages,
                  [post._id]: e.target.value,
                })
              }
            />
            <button onClick={() => handleAddComment(post._id)}>
              Add Comment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
