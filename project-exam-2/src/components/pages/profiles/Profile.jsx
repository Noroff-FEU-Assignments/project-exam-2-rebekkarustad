import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import Nav from "../../layout/Nav";
import profile from "../../../images/profile.jpg";
import { BASE_API, PROFILE_PATH } from "../../../constants/api";
import Heading from "../../layout/Heading";
import { OPTIONS } from "../../../constants/options";
import { onImageError, onBannerError } from "../../../constants/onImageError";
import LoadingSpinner from "../../layout/LoadingSpinner";
import { FollowButton } from "../../ui/FollowButtons";
import { UnfollowButton } from "../../ui/UnfollowButton";

const getName = window.localStorage.getItem("name");

export default function Profile() {
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [follow, setFollow] = useState([]);

  const followName = follow.map((follower) => follower.name);

  let { name } = useParams();

  const url =
    BASE_API + PROFILE_PATH + name + `?_following=true&_followers=true`;
  const postUrl = BASE_API + PROFILE_PATH + name + `/posts`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(url, OPTIONS);
        const posts = await axios(postUrl, OPTIONS);

        console.log("response", response.data);
        console.log("post", posts.data);

        setData(response.data);
        setPosts(posts.data);
        setFollow(response.data.followers);
      } catch (error) {
        console.log("error", error);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [postUrl, url]);

  return (
    <div>
      <Nav />
      {loading ? (
        <div className="spinner">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="myProfileWrapper">
          <div className="profileImageWrapper">
            {data.banner === null || data.banner === "" ? (
              <span className="blankBanner"></span>
            ) : (
              <img
                src={data.banner}
                alt={data.author}
                className="profileBanner"
                onError={onBannerError}
              />
            )}

            {data.avatar === null || data.avatar === "" ? (
              <img src={profile} alt={data.name} className="profileAvatar" />
            ) : (
              <img
                src={data.avatar}
                alt={data.name}
                className="profileAvatar"
                onError={onImageError}
              />
            )}
          </div>
          <div className="profileDetail">
            <Heading title={data.name} />
            <p>{data._count.followers} followers</p>
            <p>{data._count.following} following</p>
          </div>
          <div className="profileButtons">
            {followName.includes(getName) ? (
              <UnfollowButton className="unfollowBtn">Unfollow</UnfollowButton>
            ) : (
              <FollowButton className="profileBtn">Follow</FollowButton>
            )}

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
      )}
      {error && <div>Error</div>}
    </div>
  );
}
