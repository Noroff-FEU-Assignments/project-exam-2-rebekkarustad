import { useState, useEffect } from "react";
import axios from "axios";

import useTitle from "../../../hooks/useTitle";

import { BASE_API, PROFILE_PATH } from "../../../constants/api";
import { OPTIONS } from "../../../constants/options";

import Nav from "../../layout/Nav";
import FeedToggle from "../../ui/FeedToggle";

import LoadingSpinner from "../../layout/LoadingSpinner";

import ProfileCard from "./ProfileCard";
import Error from "../../layout/Error";
import useToken from "../../../hooks/useToken";

export default function ProfileFeed() {
  const [profileData, setProfileData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cardLoading, setCardLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  useToken();

  const limit = 9;

  const url = BASE_API + PROFILE_PATH + `?limit=${limit}&offset=${offset}`;

  useTitle("Discover");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, OPTIONS);

        setProfileData((prev) => {
          return [...prev, ...response.data];
        });
      } catch (error) {
        setError(error);
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
      setOffset((prev) => prev + 9);
      setCardLoading(false);
    }
  };

  return (
    <div>
      <Nav />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="feeds__container feed__container--profiles">
          <FeedToggle />
          {error && <Error />}

          {profileData.map((data, index) => {
            return (
              <ProfileCard
                key={index}
                name={data.name}
                avatar={data.avatar}
                banner={data.banner}
                followers={data._count.followers}
              />
            );
          })}
        </div>
      )}
      {cardLoading && <LoadingSpinner />}
    </div>
  );
}
