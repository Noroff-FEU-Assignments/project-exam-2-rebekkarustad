import Moment from "react-moment";
import CommentForm from "./CommentForm";

import profile from "../../../images/profile.jpg";
import { onImageError } from "../../../constants/onImageError";

export default function Comments({
  comment,
  replies,
  activeComment,
  setActiveComment,
  addComment,
  replyToId = null,
}) {
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const replyId = replyToId ? replyToId : comment.id;

  function toggleReplyPannel() {
    setActiveComment({ id: comment.id, type: "replying" });
  }

  return (
    <div className="comment__container">
      <div className="comment--image">
        {comment.author.avatar === null ? (
          <img
            src={profile}
            alt={comment.author.name}
            className="feed__post--avatar"
          />
        ) : (
          <img
            src={comment.author.avatar}
            alt={comment.author.name}
            className="feed__post--avatar"
            onError={onImageError}
          />
        )}
      </div>
      <div className="comment--right">
        <div className="comment--content">
          <div className="comment--author">
            {comment.owner}
            <div className="comment--date">
              <Moment format="MMMM Do, YYYY">{comment.created}</Moment>
            </div>
          </div>
          <div className="comment--text">{comment.body}</div>

          <div className="comment--action" onClick={toggleReplyPannel}>
            Reply
          </div>
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}

        {replies.length > 0 && (
          <div className="comment--replies">
            {replies.map((reply) => (
              <Comments
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                addComment={addComment}
                replyToId={comment.id}
                replies={[]}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
