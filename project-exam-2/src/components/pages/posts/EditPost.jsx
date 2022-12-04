import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import { BASE_API, POST_PATH, FLAG_PATH } from "../../../constants/api";
import FormError from "../../forms/FormError";
import Nav from "../../layout/Nav";
import Heading from "../../layout/Heading";
import { OPTIONS } from "../../../constants/options";
import LoadingSpinner from "../../layout/LoadingSpinner";
import UpdateSuccess from "../../messages/UpdateSuccess";
import Error from "../../layout/Error";
import useTitle from "../../../hooks/useTitle";
import useToken from "../../../hooks/useToken";

const schema = yup.object().shape({
  title: yup.string().required("Please enter a title"),
  body: yup.string().required("Please enter some text"),
  tags: yup.array().ensure().nullable(),
  media: yup.string().url("Must be a valid URL"),
});

export default function EditPost() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [success, setSuccess] = useState(null);

  useTitle("Edit post");
  useToken();

  const history = useNavigate();

  let { id } = useParams();

  const url = BASE_API + POST_PATH + `/${id}` + FLAG_PATH;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(url, OPTIONS);
        reset({
          title: response.data.title,
          body: response.data.body,
          media: response.data.media,
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [reset, url]);

  const ParseTextarea = ({ onChange }) => {
    const handleChange = (e) => {
      const value = e.target.value;

      onChange(value.split(","));
    };

    return <input onChange={handleChange} defaultValue={data.tags} />;
  };

  async function onSubmit(data) {
    setSubmitting(true);
    setCreateError(null);

    const getToken = window.localStorage.getItem("token");

    const postUrl = BASE_API + POST_PATH + `/${id}`;

    try {
      await axios({
        method: "put",
        url: postUrl,
        data: data,
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      setSuccess(true);
    } catch (error) {
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
      setCreateError("Something went wrong");
    }
  }

  return (
    <div>
      <Nav />
      <div className="container--main">
        {loading ? (
          <div className="spinner">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="form__container">
            <Heading title="Edit post" />
            {success && <UpdateSuccess id={data.id} />}
            <form onSubmit={handleSubmit(onSubmit)}>
              {createError && <FormError>{createError}</FormError>}

              <div className="form__components">
                {errors.title && <FormError>{errors.title.message}</FormError>}
                <label>Title*</label>
                <input {...register("title")} />
              </div>

              <div className="form__components">
                <label>Tags</label>

                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => {
                    const { ref, ...nonRefField } = field;
                    return <ParseTextarea {...nonRefField} />;
                  }}
                />
              </div>

              <div className="form__components">
                {errors.media && <FormError>{errors.media.message}</FormError>}
                <label>Featured image</label>
                <input {...register("media")} />
              </div>

              <div className="form__components">
                {errors.body && <FormError>{errors.body.message}</FormError>}
                <label>Body*</label>
                <textarea rows="10" {...register("body")} />
              </div>

              <button className="button button-sml button-drk">
                {submitting ? "Saving..." : "Save changes"}
              </button>
            </form>
            <button
              onClick={deletePost}
              className="button button-sml button-wht-border"
            >
              Delete post
            </button>
          </div>
        )}
        {error && <Error />}
      </div>
    </div>
  );
}
