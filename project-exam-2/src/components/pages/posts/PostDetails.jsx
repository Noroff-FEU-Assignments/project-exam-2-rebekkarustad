import { Link } from "react-router-dom";
import profile from "../../../images/profile.jpg";
import Emoji from "../../ui/Emoji";
import { onImageError } from "../../../constants/onImageError";
import Moment from "react-moment";

const getName = window.localStorage.getItem("name");

export default function PostDetails({
  id,
  author,
  media,
  title,
  body,
  reactions,
  tags,
  created,
}) {
  return (
    <div className="post__container--detail">
      {author.avatar === null ? (
        <img src={profile} alt={author.name} className="feed__post--avatar" />
      ) : (
        <img
          src={author.avatar}
          alt={author.name}
          className="feed__post--avatar"
          onError={onImageError}
        />
      )}
      <Link to={`/profile/${author.name}`} className="feed__post--author">
        {author.name}
      </Link>
      <div className="feed__post--edit">
        {author.name === getName && (
          <Link to={`/editpost/${id}`}>
            <button className="button button-sml button-drk">Edit post</button>
          </Link>
        )}
      </div>
      {media === null || media === "" ? null : (
        <img src={media} alt={title} className="post--image" />
      )}

      <Emoji data={reactions} />

      <h1>{title}</h1>
      <div className="post__created">
        <Moment format="MMMM Do, YYYY">{created}</Moment>
      </div>

      <p>{body}</p>

      {tags.length === 0 ? null : (
        <ul className="tag__container">
          Tags:
          {tags.map((tag, i) => (
            <li key={i} className="tags">
              {tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
