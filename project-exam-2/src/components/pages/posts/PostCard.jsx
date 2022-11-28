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
    <div className="postDetail">
      <div className="profileInfo">
        {author.avatar === null ? (
          <img src={profile} alt={author.name} className="blankAvatar" />
        ) : (
          <img
            src={author.avatar}
            alt={author.name}
            className="postAvatar"
            onError={onImageError}
          />
        )}
      </div>
      <div className="authorName">
        <Link to={`/profile/${author.name}`} className="authorName">
          {author.name}
        </Link>
      </div>
      {media === null || media === "" ? (
        <span></span>
      ) : (
        <img src={media} alt={title} className="postImage" />
      )}
      <div className="postHeading">
        <Link to={`/post/${id}`}>
          <h2>{title}</h2>
        </Link>
      </div>
      <p className="postBody">{body}</p>

      <div className="discover__wrapper">
        <div className="discover__post-reactions">
          {reactions.map((reaction, i) => (
            <div key={i}>
              <p className="emoji">{reaction.symbol}</p>
            </div>
          ))}

          <p className="reactNumber">{reactions.length < 1 && `0 reactions`}</p>
        </div>
        <p className="commentInfo">
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
