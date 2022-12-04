import { useEffect, useState } from "react";
import axios from "axios";
import { OPTIONS } from "../constants/options";

export default function useAxiosGet(url) {
  const [data, setData] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios(url, OPTIONS);
        setData(res.data);
        setCommentData(res.data.comments);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { loading, error, data, commentData };
}
