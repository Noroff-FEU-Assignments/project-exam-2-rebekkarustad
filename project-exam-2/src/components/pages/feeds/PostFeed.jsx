import { useState, useEffect } from "react";
import axios from "axios";
import useTitle from "../../../hooks/useTitle";

import PostCard from "./PostCard";

import Nav from "../../layout/Nav";
import FeedToggle from "../../ui/FeedToggle";
import { FULL_API } from "../../../constants/api";
import { OPTIONS } from "../../../constants/options";
import LoadingSpinner from "../../layout/LoadingSpinner";
import Error from "../../layout/Error";
import useToken from "../../../hooks/useToken";

export default function DiscoverFeed() {
  const [postData, setPostData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cardLoading, setCardLoading] = useState(false);
  const [error, setError] = useState(null);

  useTitle("Explore");
  useToken();

  const limit = 5;

  const url = FULL_API + `&limit=${limit}&offset=${offset}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(url, OPTIONS);
        setPostData((prev) => {
          return [...prev, ...response.data];
        });
      } catch (error) {
        setError(true);
        setLoading(false);
      } finally {
        setLoading(false);
      }
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
      setCardLoading(true);
      setOffset((prev) => prev + 5);
      setCardLoading(false);
    }
  };

  return (
    <div>
      <Nav />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="feeds__container feed__container--posts">
          <FeedToggle />
          {error && <Error />}

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
        </div>
      )}
      {cardLoading && <LoadingSpinner />}
    </div>
  );
}
