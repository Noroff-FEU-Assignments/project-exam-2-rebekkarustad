import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function FeedToggle() {
  const [exploreClass, setExploreClass] = useState(null);
  const [profileClass, setProfileClass] = useState(null);

  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/postfeed") {
      setExploreClass("button button-lrg button-wht active-toggle");
      setProfileClass("button button-lrg button-wht");
    } else {
      setExploreClass("button button-lrg button-wht");
      setProfileClass("button button-lrg button-wht active-toggle");
    }
  }, [location.pathname]);

  const profileClick = () => {
    navigate("/profilefeed");
  };
  const exploreClick = () => {
    navigate("/postfeed");
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
