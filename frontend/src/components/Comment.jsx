import React from "react";

function Comment({ comment }) {
  console.log(comment, "com")
  return (
    <div className="comment">
      <div className="comment-content">{comment.text}</div>
      <div className="comment-details">
        <span>Created by: {comment.createdBy}</span>
      </div>
    </div>
  );
}

export default Comment;