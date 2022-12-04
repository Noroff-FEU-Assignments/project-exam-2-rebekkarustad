import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useToken() {
  const getToken = window.localStorage.getItem("token");
  const navigation = useNavigate();

  useEffect(() => {
    if (!getToken) {
      navigation("/");
    }
  }, [getToken, navigation]);
}
