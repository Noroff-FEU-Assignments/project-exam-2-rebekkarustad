import { useState, useEffect } from "react";
import { FULL_API } from "../../constants/api";
import { Link } from "react-router-dom";
import { OPTIONS } from "../../constants/options";
import { onImageError } from "../../constants/onImageError";

import Nav from "../layout/Nav";
import profile from "../../images/profile.jpg";
import LoadingSpinner from "../layout/LoadingSpinner";

var url = FULL_API;

export default function DiscoverFeed() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [limit] = useState(50);
  const [offset] = useState(0);

  url = url + `&limit=${limit}&offset=${offset}`;

  console.log(url);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, OPTIONS);
        const data = await response.json();

        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return (
    <div className="feedPage">
      <Nav />
      <div className="feedWrapper">
        <h1>Explore</h1>

        <Link to="/profile" className="profileButton">
          Profiles
        </Link>

        <div className="feedCard">
          {loading && (
            <div className="spinner">
              <LoadingSpinner />
            </div>
          )}
          {error && <div>Error</div>}

          {data.map((post) => (
            <div key={post.id} className="postDetail">
              <div className="profileInfo">
                {post.author.avatar === null ? (
                  <img
                    src={profile}
                    alt={post.author.name}
                    className="blankAvatar"
                  />
                ) : (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="postAvatar"
                    onError={onImageError}
                  />
                )}

                <p className="authorName"></p>
                <Link
                  to={`/profile/${post.author.name}`}
                  className="authorName"
                >
                  {post.author.name}
                </Link>
              </div>

              {post.media === null || post.media === "" ? (
                <span></span>
              ) : (
                <img src={post.media} alt={post.title} className="postImage" />
              )}
              <div className="postHeading">
                <Link to={`/post/${post.id}`}>
                  <h2>{post.title}</h2>
                </Link>
              </div>
              <p className="postBody">{post.body}</p>
              <div className="replyWrapper">
                <div className="reactWrapper">
                  {post.reactions.map((reaction, i) => (
                    <div key={i}>
                      <p className="emoji">{reaction.symbol}</p>
                    </div>
                  ))}

                  <p>
                    {post.reactions.length < 1
                      ? `0 reactions`
                      : `${post.reactions.length}`}
                  </p>
                </div>
                <p>
                  {post.comments.length === 1
                    ? `${post.comments.length} comment`
                    : `${post.comments.length} comments`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
