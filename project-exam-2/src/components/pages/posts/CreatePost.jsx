import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_API, POST_PATH } from "../../../constants/api";

import Nav from "../../layout/Nav";
import Heading from "../../layout/Heading";
import FormError from "../../forms/FormError";

import useTitle from "../../../hooks/useTitle";

import useToken from "../../../hooks/useToken";

const baseUrl = BASE_API + POST_PATH;

const schema = yup.object().shape({
  title: yup.string().required("Please enter a title"),
  body: yup.string().required("Please enter some text"),
  tag: yup.array().ensure().nullable().required(),
  media: yup.string().url("Must be a valid URL"),
});

export default function CreatePost() {
  const [submitting, setSubmitting] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [data, setData] = useState([]);

  useTitle("Create post");
  useToken();

  const history = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(info) {
    setSubmitting(true);
    setCreateError(null);

    try {
      const getToken = window.localStorage.getItem("token");

      const response = await axios({
        method: "post",
        url: baseUrl,
        data: info,
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      setData(response.data);
      history(`/post/${response.data.id}`);
    } catch (error) {
      setCreateError("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  const ParseTextarea = ({ onChange }) => {
    const handleChange = (e) => {
      const value = e.target.value;

      onChange(value.split(","));
    };

    return <input onChange={handleChange} defaultValue={data.tags} />;
  };

  return (
    <div className="createPage">
      <Nav />
      <div className="container--main">
        <div className="form__container">
          <Heading title="Create post" />
          <form onSubmit={handleSubmit(onSubmit)}>
            {createError && <FormError>{createError}</FormError>}

            <div className="form__components">
              {errors.title && <FormError>{errors.title.message}</FormError>}
              <label>Title</label>
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
              <label>Body</label>
              <textarea rows="10" {...register("body")} />
            </div>

            <button className="button button-sml button-drk">
              {submitting ? "Creating..." : "Create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
