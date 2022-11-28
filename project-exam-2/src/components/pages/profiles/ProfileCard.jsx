import { Link } from "react-router-dom";
import { onImageError, onBannerError } from "../../../constants/onImageError";
import blankProfile from "../../../images/profile.jpg";
import blankBanner from "../../../images/banner.jpg";

export default function ProfileCard({ name, avatar, banner, followers }) {
  return (
    <div className="allprofiles__card">
      <Link to={`/profile/${name}`}>
        <div key={name} className="feedCards">
          {banner === null || banner === "" ? (
            <img
              src={blankBanner}
              alt={name}
              className="profileFeedBanner"
              onError={onBannerError}
            />
          ) : (
            <img
              src={banner}
              alt={name}
              className="profileFeedBanner"
              onError={onBannerError}
            />
          )}

          {avatar === null || avatar === "" ? (
            <img
              src={blankProfile}
              alt={name}
              className="profileFeedAvatar"
              onError={onImageError}
            />
          ) : (
            <img
              src={avatar}
              alt={name}
              className="profileFeedAvatar"
              onError={onImageError}
            />
          )}
          <h3>{name}</h3>
          <p>{followers} followers</p>
        </div>
      </Link>
    </div>
  );
}
