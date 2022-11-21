import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_API, POST_PATH } from "../../../constants/api";
import { OPTIONS } from "../../../constants/options";

import Nav from "../../layout/Nav";
import Heading from "../../layout/Heading";
import FormError from "../../forms/FormError";

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

  const history = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(info) {
    setSubmitting(true);
    setCreateError(null);

    console.log(info);

    try {
      const response = await axios({
        method: "post",
        url: baseUrl,
        data: info,
        headers: OPTIONS,
      });
      console.log("response", response.data);
      history(`/post/${response.data.id}`);
    } catch (error) {
      console.log("error", error);
      setCreateError("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="createPage">
      <Nav />
      <div className="createWrapper">
        <div className="formWrapper">
          <Heading title="Create post" />
          <form className="createForm" onSubmit={handleSubmit(onSubmit)}>
            {createError && <FormError>{createError}</FormError>}

            <div className="loginInfo">
              {errors.title && <FormError>{errors.title.message}</FormError>}
              <label className="labelText">Title*</label>
              <input {...register("title")} />
            </div>

            <div className="loginInfo">
              {errors.tag && <FormError>{errors.tag.message}</FormError>}
              <label className="labelText">Tags</label>
              <input {...register("tag")} />
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
              {submitting ? "Creating..." : "Create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
