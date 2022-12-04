import axios from "axios";
import { useParams } from "react-router-dom";

import { BASE_API, PROFILE_PATH } from "../../constants/api";

const getToken = window.localStorage.getItem("token");

export function FollowButton({ children, type, className, onClick }) {
  let { name } = useParams();
  const followUrl = BASE_API + PROFILE_PATH + name + `/follow`;

  async function Follow() {
    const putData = async () => {
      const response = await axios({
        method: "put",
        url: followUrl,
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
