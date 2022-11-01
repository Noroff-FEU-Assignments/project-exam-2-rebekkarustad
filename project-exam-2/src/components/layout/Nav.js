import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faUpload,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  return (
    <div className="navWrapper">
      <div className="navLeft">
        <Link to="/feed">
          <FontAwesomeIcon icon={faHouse} />
        </Link>
        <Link to="/profile">
          <FontAwesomeIcon icon={faUser} />
        </Link>
        <Link to="/upload">
          <FontAwesomeIcon icon={faUpload} />
        </Link>
      </div>
      <div className="navRight">
        <Link to="/login">
          <FontAwesomeIcon icon={faRightFromBracket} />
        </Link>
      </div>
    </div>
  );
}
