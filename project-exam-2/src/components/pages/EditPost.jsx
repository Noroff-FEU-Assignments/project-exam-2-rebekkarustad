import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import { BASE_API, POST_PATH, FLAG_PATH } from "../../constants/api";
import FormError from "../forms/FormError";
import Nav from "../layout/Nav";
import Heading from "../layout/Heading";
import { OPTIONS } from "../../constants/options";
import LoadingSpinner from "../layout/LoadingSpinner";

const schema = yup.object().shape({
  title: yup.string().required("Please enter a title"),
  body: yup.string().required("Please enter some text"),
  tags: yup.array().ensure().nullable(),
  media: yup.string().url("Must be a valid URL"),
});

export default function EditPost() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [createError, setCreateError] = useState(null);

  const history = useNavigate();

  let { id } = useParams();

  const url = BASE_API + POST_PATH + `/${id}` + FLAG_PATH;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios(url, OPTIONS);
        console.log(response.data);
        reset({
          title: response.data.title,
          body: response.data.body,
          tags: response.data.tags,
          media: response.data.media,
        });

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [reset, url]);

  async function onSubmit(data) {
    setSubmitting(true);
    setCreateError(null);

    console.log(data);

    const getToken = window.localStorage.getItem("token");

    const postUrl = BASE_API + POST_PATH + `/${id}`;

    try {
      const response = await axios({
        method: "put",
        url: postUrl,
        data: data,
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      console.log("response", response.data);
      // history(`/post/${response.data.id}`);
    } catch (error) {
      console.log("error", error);
      setCreateError("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  async function deletePost() {
    const getToken = window.localStorage.getItem("token");
    const postUrl = BASE_API + POST_PATH + `/${id}`;

    try {
      const doDelete = window.confirm(
        "Are you sure you want to delete this post?"
      );

      if (doDelete) {
        await axios({
          method: "delete",
          url: postUrl,
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        });
        history(`/myprofile`);
      }
    } catch (error) {
      console.log("error", error);
      setCreateError("Something went wrong");
    }
  }

  return (
    <div>
      <Nav />
      <div className="createWrapper">
        {loading ? (
          <div className="spinner">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="formWrapper">
            <Heading title="Edit post" />
            <form className="createForm" onSubmit={handleSubmit(onSubmit)}>
              {createError && <FormError>{createError}</FormError>}

              <div className="loginInfo">
                {errors.title && <FormError>{errors.title.message}</FormError>}
                <label className="labelText">Title*</label>
                <input {...register("title")} />
              </div>

              <div className="loginInfo">
                {errors.tags && <FormError>{errors.tags.message}</FormError>}
                <label className="labelText">Tags</label>
                <input {...register("tags")} />
              </div>

              <div className="loginInfo">
                {errors.media && <FormError>{errors.media.message}</FormError>}
                <label className="labelText">Featured image</label>
                <input {...register("media")} />
              </div>

              <div className="loginInfo">
                {errors.body && <FormError>{errors.body.message}</FormError>}
                <label className="labelText">Body*</label>
                <textarea rows="10" {...register("body")} />
              </div>

              <button className="signButton">
                {submitting ? "Saving..." : "Save changes"}
              </button>
            </form>
            <button onClick={deletePost} className="deleteButton">
              Delete post
            </button>
          </div>
        )}
        {error && <div>Error</div>}
      </div>
    </div>
  );
}
