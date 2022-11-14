import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import Nav from "../layout/Nav";
import profile from "../../images/profile.jpg";
import { BASE_API, PROFILE_PATH } from "../../constants/api";
import Heading from "../layout/Heading";

export default function Profile() {
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  let { name } = useParams();

  const url = BASE_API + PROFILE_PATH + name;
  const postUrl = url + `/posts`;

  useEffect(() => {
    const fetchData = async () => {
      const getToken = window.localStorage.getItem("token");

      try {
        const options = {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        };
        const response = await axios(url, options);
        const posts = await axios(postUrl, options);

        console.log("response", response.data);
        console.log("response", posts.data);

        setData(response.data);
        setPosts(posts.data);
      } catch (error) {
        console.log("error", error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [postUrl, url]);

  if (loading) return <div>Loading</div>; //add a spinner
  if (error) return <div>error</div>;

  return (
    <div>
      <Nav />
      <div className="myProfileWrapper">
        <div className="profileImageWrapper">
          {data.banner === null || data.banner === "" ? (
            <span className="blankBanner"></span>
          ) : (
            <img
              src={data.banner}
              alt={data.author}
              className="profileBanner"
            />
          )}

          {data.avatar === null || data.avatar === "" ? (
            <img src={profile} alt={data.name} className="profileAvatar" />
          ) : (
            <img src={data.avatar} alt={data.name} className="profileAvatar" />
          )}
        </div>
        <div className="profileDetail">
          <Heading title={data.name} />
          <p>{data._count.followers} followers</p>
          <p>{data._count.following} following</p>
        </div>
        <div className="profileButtons">
          <button className="profileBtn">Follow</button>
          <button className="profileBtn">Contact</button>
        </div>
        <div className="profilePosts">
          {posts.map((post) => (
            <Link to={`/post/${post.id}`} key={post.id}>
              <div className="profilePostsCards">
                {post.media === null || post.media === "" ? (
                  <span></span>
                ) : (
                  <img
                    src={post.media}
                    alt={post.title}
                    className="profileBanner"
                  />
                )}
                <h2>{post.title}</h2>
                <p>{post._count.reactions} reactions</p>
                <p>{post._count.comments} comments</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
