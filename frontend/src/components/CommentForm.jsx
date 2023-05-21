import { useState } from "react";
import { API_BASE } from "../constants";


function CommentForm({ parentId, handleSubmit, formRef }) {
  const [commentText, setCommentText] = useState("");
  const [messages, setMessages] = useState([]);
  const [comments, setComments] = useState([]);


  const handleCommentSubmit = async (commentText, parentId, event, form) => {
    event.preventDefault();
    const comment = {
      text: commentText,
      parent: parentId,
    };
    try {

      const response = await fetch(API_BASE + `/api/comment/createComment/${parentId}`,

        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comment),
        }
      );

      const newComment = await response.json();
      if (newComment.messages) {
        setMessages(newComment.messages);
      }
      if (newComment.comment) {
        setComments((prevComments) => {
          const updatedComments = [...prevComments];
          const parentComment = updatedComments.find((comment) => {
            return comment._id === newComment.comment.parent;
          });
          if (parentComment) {
            parentComment.children.push(newComment.comment);
          } else {
            updatedComments.push(newComment.comment);
          }
       return updatedComments;
        });
        setCommentText("");
        console.log(comments)
      }
    } catch (error) {
      console.log(error);
    }
  }
console.log(comments)
  return (
    <div>
      <form ref={formRef} action="POST" onSubmit={(event) => handleCommentSubmit(commentText, parentId, event, formRef)}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Add a Comment
          </label>
          <textarea
            type="text"
            className="form-control"
            id="comment-text"
            rows="3"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          > </textarea>
        </div>
        <button type="submit" className="btn btn-primary" value="Upload">
          Submit
        </button>
      </form>

    </div>
  );
};



export default CommentForm;

// const handleCommentSubmit = (e) => {
//     e.preventDefault();
//     handleSubmit(commentText, parentId);
//     setCommentText("");
// }
