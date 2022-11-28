import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import PostCard from "../posts/PostCard";

import Nav from "../../layout/Nav";
import FeedToggle from "../../layout/FeedToggle";
import { FULL_API } from "../../../constants/api";
import { OPTIONS } from "../../../constants/options";
import LoadingSpinner from "../../layout/LoadingSpinner";

export default function DiscoverFeed() {
  const [postData, setPostData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeClass, setActiveClass] = useState(null);

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
      <FeedToggle className={activeClass} />

      <div className="feeds__container feed__container--posts">
        {postData.map((data, index) => {
          return (
            <PostCard
              key={index}
              id={data.id}
              author={data.author}
              title={data.title}
              body={data.body}
              media={data.media}
              reactions={data.reactions}
              comments={data.comments}
            />
          );
        })}
        {loading && <LoadingSpinner />}
        {error && <div>Error...</div>}
      </div>
    </div>
  );
}
