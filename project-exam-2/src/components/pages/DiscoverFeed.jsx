import { useState, useEffect } from "react";
import { FULL_API } from "../../constants/api";
import { Link } from "react-router-dom";

import Nav from "../layout/Nav";
import profile from "../../images/profile.jpg";

const url = FULL_API;

export default function DiscoverFeed() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const getToken = window.localStorage.getItem("token");

      try {
        const options = {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        };

        const response = await fetch(url, options);
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

  if (loading) return <div>Loading</div>; //add a spinner
  if (error) return <div>error</div>;

  console.log(data);

  return (
    <div className="feedPage">
      <Nav />
      <div className="feedWrapper">
        <h1>Explore</h1>

        <Link to="/myprofile" className="profileButton">
          Profiles
        </Link>

        <div className="feedCard">
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
                  />
                )}

                <p className="authorName">{post.author.name}</p>
              </div>

              {post.media === null || post.media === "" ? (
                <span></span>
              ) : (
                <img src={post.media} alt={post.author} className="postImage" />
              )}
              <div className="postHeading">
                <Link to={`/post/${post.id}`}>
                  <h2>{post.title}</h2>
                </Link>
              </div>
              <p className="postBody">{post.body}</p>
              <div className="replyWrapper">
                <div className="reactWrapper">
                  {post.reactions.map((reaction) => (
                    <div key={reaction.postId}>
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
