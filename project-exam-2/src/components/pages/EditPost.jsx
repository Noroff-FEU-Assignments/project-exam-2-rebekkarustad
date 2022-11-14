import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import { BASE_API, POST_PATH, FLAG_PATH } from "../../constants/api";
import FormError from "../forms/FormError";
import Nav from "../layout/Nav";

const schema = yup.object().shape({
  title: yup.string().required("Please enter a title"),
  body: yup.string().required("Please enter some text"),
  tag: yup.array().ensure().nullable().required(),
  media: yup.string().url("Must be a valid URL"),
});

export default function EditPost() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  let { id } = useParams();

  const url = BASE_API + POST_PATH + `/${id}` + FLAG_PATH;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const getToken = window.localStorage.getItem("token");

      try {
        const options = {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        };

        const response = await axios(url, options);

        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(info) {
    setSubmitting(true);
    setCreateError(null);

    console.log(info);

    const getToken = window.localStorage.getItem("token");

    const postUrl = BASE_API + POST_PATH + `/${id}`;

    try {
      const response = await axios({
        method: "post",
        url: postUrl,
        data: info,
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
      setCreateError("Something went wrong");
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      reset();
    }
  }

  return (
    <div>
      <Nav />
    </div>
  );
}
