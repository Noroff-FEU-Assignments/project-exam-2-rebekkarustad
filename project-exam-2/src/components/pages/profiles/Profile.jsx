import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Nav from "../../layout/Nav";
import { BASE_API, PROFILE_PATH } from "../../../constants/api";
import { OPTIONS } from "../../../constants/options";
import LoadingSpinner from "../../layout/LoadingSpinner";
import ProfileInfo from "./ProfileInfo";
import ProfilePosts from "./ProfilePosts";
import useTitle from "../../../hooks/useTitle";
import Error from "../../layout/Error";
import useToken from "../../../hooks/useToken";

export default function Profile() {
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [follow, setFollow] = useState([]);

  const followName = follow.map((follower) => follower.name);

  let { name } = useParams();

  useTitle(name);
  useToken();

  const url =
    BASE_API + PROFILE_PATH + name + `?_following=true&_followers=true`;
  const postUrl = BASE_API + PROFILE_PATH + name + `/posts`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(url, OPTIONS);
        const posts = await axios(postUrl, OPTIONS);

        setData(response.data);
        setPosts(posts.data);
        setFollow(response.data.followers);
      } catch (error) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [postUrl, url]);

  console.log(data);
  console.log(posts);

  return (
    <div>
      <Nav />
      {loading ? (
        <div className="spinner">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="profile__container">
          {error && <Error />}

          <ProfileInfo
            name={data.name}
            avatar={data.avatar}
            banner={data.banner}
            followers={data._count.followers}
            following={data._count.following}
            followname={followName}
          />
          <div className="profile__container--posts">
            {posts.map((post) => {
              return (
                <ProfilePosts
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  media={post.media}
                  comments={post._count.comments}
                  reactions={post._count.reactions}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
