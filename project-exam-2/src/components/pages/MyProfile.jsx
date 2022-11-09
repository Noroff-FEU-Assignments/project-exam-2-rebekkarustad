import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Nav from "../layout/Nav";
import profile from "../../images/profile.jpg";
import { BASE_API, PROFILE_PATH } from "../../constants/api";
import Heading from "../layout/Heading";

export default function MyProfile() {
  const [info, setInfo] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const getToken = window.localStorage.getItem("token");
      const getName = window.localStorage.getItem("name");

      const url = BASE_API + PROFILE_PATH + `${getName}`;
      const postUrl = url + `/posts`;

      try {
        const options = {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        };

        const response = await axios.get(url, options);
        const result = await axios.get(postUrl, options);
        console.log("response", response.data);
        console.log("response", result.data);

        setInfo(response.data);
        setPosts(result.data);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div>Loading</div>; //add a spinner
  if (error) return <div>error</div>;

  return (
    <div>
      <Nav />
      <div className="myProfileWrapper">
        <div className="profileImageWrapper">
          <img src={info.banner} alt={info.name} className="profileBanner" />
          <img src={info.avatar} alt={info.name} className="profileAvatar" />
        </div>
        <div className="profileDetail">
          <Heading title={info.name} />
          <p>{info._count.followers} followers</p>
          <p>{info._count.following} following</p>
        </div>
        <div className="profileButtons">
          <button>Edit profile</button>
          <button>Share</button>
        </div>
        <div className="profilePosts">
          {posts.map((post) => (
            <Link to={`/post/${post.id}`}>
              <div key={post.id} className="profilePostsCards">
                <img
                  src={post.media}
                  alt={post.title}
                  className="profileBanner"
                />

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
