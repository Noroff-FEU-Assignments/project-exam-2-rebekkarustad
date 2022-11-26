import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PostList from "../posts/PostList";

import Nav from "../../layout/Nav";
import { FULL_API } from "../../../constants/api";
import { OPTIONS } from "../../../constants/options";
import axios from "axios";

export default function PostFeed() {
  const [postData, setPostData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const limit = 5;

  const url = FULL_API + `&limit=${limit}&offset=${offset}`;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(url, OPTIONS);

      setPostData((prev) => {
        return [...prev, ...response.data];
      });
      setLoading(false);
    };
    fetchData();
  }, [url]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setOffset((prev) => prev + 5);
    }
  };

  return (
    <div>
      <Nav />
      <div className="feedWrapper">
        <h1>Explore</h1>

        <Link to="/profile" className="profileButton">
          Profiles
        </Link>

        <PostList postData={postData} />
      </div>
    </div>
  );
}
