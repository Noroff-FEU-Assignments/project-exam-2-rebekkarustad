import Nav from "../layout/Nav";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FULL_API, BASE_API, POST_PATH, FLAG_PATH } from "../../constants/api";
import profile from "../../images/profile.jpg";

function PostPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  let { id } = useParams();

  const url = BASE_API + POST_PATH + `/${id}` + FLAG_PATH;

  console.log(url);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

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
    <div>
      <Nav />
      <div className="postWrapper">
        <div className="profileInfo">
          {data.author.avatar === null ? (
            <img src={profile} alt={data.author.name} className="blankAvatar" />
          ) : (
            <img
              src={data.author.avatar}
              alt={data.author.name}
              className="postAvatar"
            />
          )}

          <p className="authorName">{data.author.name}</p>
        </div>

        {data.media === null || data.media === "" ? (
          <span></span>
        ) : (
          <img src={data.media} alt={data.author} className="postImage" />
        )}
        <h1>{data.title}</h1>
        <p className="postBody">{data.body}</p>

        <hr />

        {data.comments.map((comment) => (
          <div key={comment.id} className="commentWrapper">
            <h3>{comment.owner}</h3>
            <p>{comment.body}</p>
          </div>
        ))}
        <div className="reactWrapper">
          {data.reactions.map((reaction) => (
            <p key={reaction.postId} className="emoji">
              {reaction.symbol}
            </p>
          ))}
          <p>
            {data.reactions.length < 1
              ? `0 reactions`
              : `${data.reactions.length}`}
          </p>
          <p>
            {data.comments.length === 1
              ? `${data.comments.length} comment`
              : `${data.comments.length} comments`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
