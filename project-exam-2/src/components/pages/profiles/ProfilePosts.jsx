import { Link } from "react-router-dom";

export default function ProfilePosts({
  id,
  title,
  media,
  comments,
  reactions,
}) {
  return (
    <Link to={`/post/${id}`} key={id}>
      <div className="profile__container--posts-cards">
        {media === null || media === "" ? null : (
          <img
            src={media}
            alt={title}
            className="profile__container--info-banner"
          />
        )}
        <h2>{title}</h2>
        <p>{reactions} reactions</p>
        <p>{comments} comments</p>
      </div>
    </Link>
  );
}
