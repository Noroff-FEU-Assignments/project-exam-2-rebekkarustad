import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";

import FormError from "../../forms/FormError";
import Nav from "../../layout/Nav";
import Heading from "../../layout/Heading";
import profile from "../../../images/profile.jpg";
import { BASE_API, PROFILE_PATH } from "../../../constants/api";
import { OPTIONS } from "../../../constants/options";
import LoadingSpinner from "../../layout/LoadingSpinner";
import Error from "../../layout/Error";
import useToken from "../../../hooks/useToken";

const schema = yup.object().shape({
  avatar: yup.string().url("Must be a valid URL").nullable(),
  banner: yup.string().url("Must be a valid URL").nullable(),
});

export default function EditProfile() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [createError, setCreateError] = useState(null);

  const history = useNavigate();
  useTitle("Edit profile");
  useToken();

  const getToken = window.localStorage.getItem("token");
  const getName = window.localStorage.getItem("name");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const getUrl = BASE_API + PROFILE_PATH + `${getName}`;

      try {
        const result = await axios.get(getUrl, OPTIONS);
        reset({
          avatar: result.data.avatar,
          banner: result.data.banner,
        });
        setData(result.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [getName, getToken, reset]);

  async function onSubmit(info) {
    setSubmitting(true);
    setCreateError(null);

    const putUrl = BASE_API + PROFILE_PATH + getName + `/media`;

    try {
      await axios({
        method: "put",
        url: putUrl,
        data: info,
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      history(`/profile/${getName}`);
    } catch (error) {
      setCreateError("Something went wrong");
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  }

  return (
    <div>
      <Nav />
      {loading ? (
        <div className="spinner">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="container--main">
          <div className="edit__profile--container">
            {error && <Error />}
            <Heading title="Edit profile" />
            <div className="edit__profile--info">
              {data.avatar === null || data.avatar === "" ? (
                <img
                  src={profile}
                  alt={data.name}
                  className="edit__profile--avatar"
                />
              ) : (
                <img
                  src={data.avatar}
                  alt={data.name}
                  className="edit__profile--avatar"
                />
              )}
              <div className="edit__profile--name">
                <h2>Name</h2>
                <p>{data.name}</p>
              </div>
              <div className="edit__profile--email">
                <h2>Email</h2>
                <p>{data.email}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {createError && <FormError>{createError}</FormError>}

              <div className="form__components">
                {errors.avatar && (
                  <FormError>{errors.avatar.message}</FormError>
                )}
                <label>
                  <h2>Avatar</h2>
                </label>
                <input {...register("avatar")} placeholder="https://" />
              </div>

              <div className="form__components">
                {errors.banner && (
                  <FormError>{errors.banner.message}</FormError>
                )}
                <label>
                  <h2>Banner</h2>
                </label>
                <input {...register("banner")} placeholder="https://" />
              </div>

              <button className="button button-drk button-sml">
                {submitting ? "Saving..." : "Save changes"}
              </button>
              {/* <button className="cancel">Cancel</button> */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
