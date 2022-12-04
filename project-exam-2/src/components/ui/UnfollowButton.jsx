import axios from "axios";
import { useParams } from "react-router-dom";

import { BASE_API, PROFILE_PATH } from "../../constants/api";

const getToken = window.localStorage.getItem("token");

export function UnfollowButton({ children, type, className, onClick }) {
  let { name } = useParams();
  const url = BASE_API + PROFILE_PATH + name + `/unfollow`;

  async function Follow() {
    const putData = async () => {
      await axios({
        method: "put",
        url: url,
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      window.location.reload(true);
    };
    putData();
  }

  return (
    <button
      type={type ? type : "button"}
      className={className}
      onClick={onClick ? onClick : Follow}
    >
      {children}
    </button>
  );
}
