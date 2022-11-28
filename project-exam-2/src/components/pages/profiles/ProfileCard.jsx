import { Link } from "react-router-dom";
import { onImageError, onBannerError } from "../../../constants/onImageError";
import blankProfile from "../../../images/profile.jpg";
import blankBanner from "../../../images/banner.jpg";

export default function ProfileCard({ name, avatar, banner, followers }) {
  return (
    <Link to={`/profile/${name}`}>
      <div key={name} className="feed__container--profiles-cards">
        {banner === null || banner === "" ? (
          <img
            src={blankBanner}
            alt={name}
            className="feed__profile--banner"
            onError={onBannerError}
          />
        ) : (
          <img
            src={banner}
            alt={name}
            className="feed__profile--banner"
            onError={onBannerError}
          />
        )}

        {avatar === null || avatar === "" ? (
          <img
            src={blankProfile}
            alt={name}
            className="feed__profile--avatar"
            onError={onImageError}
          />
        ) : (
          <img
            src={avatar}
            alt={name}
            className="feed__profile--avatar"
            onError={onImageError}
          />
        )}
        <h3>{name}</h3>
        <p>{followers} followers</p>
      </div>
    </Link>
  );
}
