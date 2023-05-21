import Post from "../routes/Post"
import Comment from "./Comment"
import { useContext, useState } from "react";

function CommentTree() {
  const [comments, setComments] = useState([])
  console.log(comments, "tree")
 
  const renderComment = (comment) => {
    return (
      <div>
        <Comment comment={comment} />
        {comment.children && (
          <div>
            {comment.children.map((child) => {
              return renderComment(child);
            })}
          </div>
        )}
      </div>
    );
  };

  return <div>{comments.map((comment) => renderComment(comment))}</div>;
}

export default CommentTree;