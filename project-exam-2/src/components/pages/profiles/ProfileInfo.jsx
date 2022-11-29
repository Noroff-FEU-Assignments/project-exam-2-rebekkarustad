import { Link } from "react-router-dom";

import profile from "../../../images/profile.jpg";
import Heading from "../../layout/Heading";
import { onImageError, onBannerError } from "../../../constants/onImageError";
import { FollowButton } from "../../ui/FollowButtons";
import { UnfollowButton } from "../../ui/UnfollowButton";

const getName = window.localStorage.getItem("name");

export default function ProfileInfo({
  name,
  avatar,
  banner,
  followers,
  following,
  followname,
}) {
  return (
    <div className="profile__container--info">
      {banner === null || banner === "" ? (
        <span className="profile__container--info-avatar-blank"></span>
      ) : (
        <img
          src={banner}
          alt={name}
          className="profile__container--info-banner"
          onError={onBannerError}
        />
      )}

      {avatar === null || avatar === "" ? (
        <img
          src={profile}
          alt={name}
          className="profile__container--info-avatar"
        />
      ) : (
        <img
          src={avatar}
          alt={name}
          className="profile__container--info-avatar"
          onError={onImageError}
        />
      )}

      <div className="profile__container--info-detail">
        <Heading title={name} />
        <p>{followers} followers</p>
        <p>{following} following</p>
      </div>

      {name === getName ? (
        <div className="profile__container--buttons">
          <Link to="/editprofile">
            <button className="button button-lrg button-drk">
              Edit profile
            </button>
          </Link>
          <Link to="#">
            <button className="button button-lrg button-drk">Share</button>
          </Link>
        </div>
      ) : (
        <div className="profile__container--buttons">
          {followname.includes(getName) ? (
            <UnfollowButton className="button button-lrg button-wht">
              Unfollow
            </UnfollowButton>
          ) : (
            <FollowButton className="button button-lrg button-drk">
              Follow
            </FollowButton>
          )}

          <button className="button button-lrg button-drk">Contact</button>
        </div>
      )}
    </div>
  );
}
