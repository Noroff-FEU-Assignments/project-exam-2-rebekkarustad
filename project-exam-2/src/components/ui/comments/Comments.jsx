import Moment from "react-moment";
import CommentForm from "./CommentForm";

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
  return (
    <div className="comment">
      <div className="comment-image-container">
        {/* <img src={userIcon} alt="profile" /> */}
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.owner}</div>
          <div className="comment-date">
            <Moment format="L">{comment.created}</Moment>
          </div>
        </div>
        <div className="comment-text">{comment.body}</div>
        <div className="comment-actions">
          <div
            className="comment-action"
            onClick={() =>
              setActiveComment({ id: comment.id, type: "replying" })
            }
          >
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

/*
<h2>
    {data.comments.length === 1
    ? `${data.comments.length} comment`
    : `${data.comments.length} comments`}
</h2>

{data.comments.map((comment) => (
<div key={comment.id} className="commentWrapper">
    <h3>{comment.owner}</h3>
    <p>{comment.body}</p>
    <button onClick={reply}>Reply</button>
    {replyToggle && (
    <div>
        {submitted && (
        <p className="success">Your message was sent</p>
        )}
        <form className="createForm" onSubmit={handleSubmit(onReply)}>
        <div className="loginInfo">
            {errors.body && (
            <FormError>{errors.body.message}</FormError>
            )}
            <label className="labelText">Comment</label>
            <textarea rows="3" {...register("body")} />

            <button className="signButton">
            {submitting ? "Commenting..." : "Comment"}
            </button>
        </div>
        </form>
    </div>
    )}
</div>
))} 
*/
