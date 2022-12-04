import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { OPTIONS, HEADER } from "../constants/options";

export default function useAxiosPost(url, errorMessage, navigate, options) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [header, setHeader] = useState(null);

  const history = useNavigate();

  useEffect(() => {
    if (options === true) {
      setHeader(HEADER);
    }

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axios.post({
          method: "post",
          url: url,
          data: data,
          headers: { header },
        });
        setData(res.data);
        history(navigate);
      } catch (error) {
        setError(errorMessage);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, errorMessage, navigate, history, options, data, header]);

  return { loading, error, data, navigate };
}
