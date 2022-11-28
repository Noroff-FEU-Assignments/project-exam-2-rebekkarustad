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
    <div className="comment">
      <div className="comment-image-container">
        {comment.author.avatar === null ? (
          <img
            src={profile}
            alt={comment.author.name}
            className="blankAvatar"
          />
        ) : (
          <img
            src={comment.author.avatar}
            alt={comment.author.name}
            className="postAvatar"
            onError={onImageError}
          />
        )}
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.owner}</div>
          <div className="comment-text">{comment.body}</div>
          <div className="comment-date">
            <Moment format="MMMM Do, YYYY">{comment.created}</Moment>
          </div>
          <div className="comment-actions">
            <div className="comment-action" onClick={toggleReplyPannel}>
              Reply
            </div>
          </div>
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}

        {replies.length > 0 && (
          <div className="replies">
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
