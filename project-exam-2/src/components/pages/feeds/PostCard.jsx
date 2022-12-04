import { Link } from "react-router-dom";

import profile from "../../../images/profile.jpg";
import { onImageError } from "../../../constants/onImageError";

export default function PostCard({
  author,
  id,
  media,
  title,
  body,
  reactions,
  comments,
}) {
  return (
    <div className="feed__post--container">
      {author.avatar === null || author.avatar === "" ? (
        <img src={profile} alt={author.name} className="feed__post--avatar" />
      ) : (
        <img
          src={author.avatar}
          alt={author.name}
          onError={onImageError}
          className="feed__post--avatar"
        />
      )}

      <div className="feed__post--author">
        <Link to={`/profile/${author.name}`}>{author.name}</Link>
      </div>

      {media === null || media === "" ? null : (
        <Link to={`/post/${id}`} className="feed__post--image-container">
          <img src={media} alt={title} className="feed__post--image" />
        </Link>
      )}
      <div className="feed__post--heading">
        <Link to={`/post/${id}`}>
          <h2>{title}</h2>
        </Link>
      </div>
      <p className="feed__post--body">{body}</p>

      <div className="discover__container">
        <div className="discover__post--reactions">
          {reactions.map((reaction, i) => (
            <div key={i}>
              <p className="emoji">{reaction.symbol}</p>
            </div>
          ))}

          <p className="discover__post--reactions-number">
            {reactions.length < 1 && `0 reactions`}
          </p>
        </div>
        <p className="discover__post--comments">
          <Link to={`/post/${id}`}>
            {comments.length === 1
              ? `${comments.length} comment`
              : `${comments.length} comments`}
          </Link>
        </p>
      </div>
    </div>
  );
}
