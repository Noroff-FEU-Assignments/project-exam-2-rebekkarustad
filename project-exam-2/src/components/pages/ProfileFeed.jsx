import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { BASE_API, PROFILE_PATH } from "../../constants/api";
import { OPTIONS } from "../../constants/options";

import Nav from "../layout/Nav";
import blankProfile from "../../images/profile.jpg";
import blankBanner from "../../images/banner.jpg";

export default function ProfileFeed() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const getToken = window.localStorage.getItem("token");

      const url = BASE_API + PROFILE_PATH;
      // const imageUrl = BASE_API + PROFILE_PATH;

      try {
        const response = await axios.get(url, OPTIONS);

        console.log("response", response.data);

        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading</div>; //add a spinner
  if (error) return <div>error</div>;

  return (
    <div>
      <Nav />
      <div className="profileFeedWrapper">
        <Link to="/feed" className="profileButton">
          Explore
        </Link>
        <h1>Profiles</h1>

        <div className="feedCardsWrapper">
          {data.map((profile) => (
            <Link to={`/profile/${profile.name}`}>
              <div key={profile.name} className="feedCards">
                {profile.banner === null || profile.banner === "" ? (
                  <img
                    src={blankBanner}
                    alt={profile.name}
                    className="profileFeedBanner"
                  />
                ) : (
                  <img
                    src={profile.banner}
                    alt={profile.name}
                    className="profileFeedBanner"
                  />
                )}
                {profile.avatar === null || profile.avatar === "" ? (
                  <img
                    src={blankProfile}
                    alt={profile.name}
                    className="profileFeedAvatar"
                  />
                ) : (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="profileFeedAvatar"
                  />
                )}
                <h3>{profile.name}</h3>
                <p>{profile._count.followers} followers</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
