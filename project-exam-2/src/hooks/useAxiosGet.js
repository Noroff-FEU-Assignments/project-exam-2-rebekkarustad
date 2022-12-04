import { useEffect, useState } from "react";
import axios from "axios";
import { OPTIONS } from "../constants/options";

export default function useAxiosGet(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axios(url, OPTIONS);
        setData(res.data);
      } catch (error) {
        setError(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { loading, error, data };
}
