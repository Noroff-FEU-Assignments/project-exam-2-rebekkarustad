import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Nav from "../layout/Nav";
import profile from "../../images/profile.jpg";
import { BASE_API, PROFILE_PATH } from "../../constants/api";
import Heading from "../layout/Heading";
import { OPTIONS } from "../../constants/options";

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
        const response = await axios.get(url, OPTIONS);
        const result = await axios.get(postUrl, OPTIONS);
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
          {info.banner === null || info.banner === "" ? (
            <span className="blankBanner"></span>
          ) : (
            <img
              src={info.banner}
              alt={info.author}
              className="profileBanner"
            />
          )}

          {info.avatar === null || info.avatar === "" ? (
            <img src={profile} alt={info.name} className="profileAvatar" />
          ) : (
            <img src={info.avatar} alt={info.name} className="profileAvatar" />
          )}
        </div>
        <div className="profileDetail">
          <Heading title={info.name} />
          <p>{info._count.followers} followers</p>
          <p>{info._count.following} following</p>
        </div>
        <div className="profileButtons">
          <Link to="/editprofile">
            <button className="profileBtn">Edit profile</button>
          </Link>
          <Link to="/editprofile">
            <button className="profileBtn">Share</button>
          </Link>
        </div>
        <div className="profilePosts">
          {posts.map((post) => (
            <Link to={`/post/${post.id}`} key={post.id}>
              <div className="profilePostsCards">
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
