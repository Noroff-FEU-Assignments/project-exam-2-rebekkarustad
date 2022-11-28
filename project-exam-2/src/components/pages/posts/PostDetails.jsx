import { Link } from "react-router-dom";
import profile from "../../../images/profile.jpg";
import Emoji from "../../ui/Emoji";
import { onImageError } from "../../../constants/onImageError";

const getName = window.localStorage.getItem("name");

export default function PostDetails({
  id,
  author,
  media,
  title,
  body,
  reactions,
  tags,
}) {
  return (
    <div className="profileInfoPost">
      <div className="authorInfo">
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
        <Link to={`/profile/${author.name}`} className="authorName">
          {author.name}
        </Link>
        <div className="editPost">
          {author.name === getName && (
            <Link to={`/editpost/${id}`}>
              <button className="button button-drk">Edit post</button>
            </Link>
          )}
        </div>
        {media === null || media === "" ? null : (
          <img src={media} alt={title} className="postImage" />
        )}
      </div>
      <div className="reactWrapper">
        <Emoji data={reactions} />
      </div>
      <h1>{title}</h1>
      <p>{body}</p>
      <ul className="tagWrapper">
        {tags.map((tag, i) => (
          <li key={i} className="tags">
            Tags: {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}
