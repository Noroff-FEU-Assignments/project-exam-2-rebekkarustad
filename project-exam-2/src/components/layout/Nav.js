import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faUpload,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

export default function Nav() {
  const navigate = useNavigate();

  const logout = () => {
    const doLogout = window.confirm("Are you sure?");

    if (doLogout) {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("name");
      navigate("/login");
    }
  };

  return (
    <div className="navWrapper">
      <div className="navLeft">
        <Link to="/feed">
          <FontAwesomeIcon icon={faHouse} />
        </Link>
        <Link to="/myprofile">
          <FontAwesomeIcon icon={faUser} />
        </Link>
        <Link to="/create">
          <FontAwesomeIcon icon={faUpload} />
        </Link>
      </div>
      <div className="navRight">
        <button onClick={logout}>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    </div>
  );
}
