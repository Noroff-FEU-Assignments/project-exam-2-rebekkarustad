import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function FeedToggle() {
  const [exploreClass, setExploreClass] = useState(null);
  const [profileClass, setProfileClass] = useState(null);

  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/feed") {
      setExploreClass("button button-lrg button-wht active");
      setProfileClass("button button-lrg button-wht");
    } else {
      setExploreClass("button button-lrg button-wht");
      setProfileClass("button button-lrg button-wht active");
    }
  }, [location.pathname]);

  const profileClick = () => {
    navigate("/profile");
  };
  const exploreClick = () => {
    navigate("/feed");
  };

  return (
    <div className="feed__button--container">
      <button className={exploreClass} onClick={exploreClick}>
        Explore
      </button>
      <button className={profileClass} onClick={profileClick}>
        Profile
      </button>
    </div>
  );
}
