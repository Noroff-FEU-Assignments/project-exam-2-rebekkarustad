import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import FormError from "../../forms/FormError";
import Nav from "../../layout/Nav";
import Heading from "../../layout/Heading";
import profile from "../../../images/profile.jpg";
import { BASE_API, PROFILE_PATH } from "../../../constants/api";
import { OPTIONS } from "../../../constants/options";
import LoadingSpinner from "../../layout/LoadingSpinner";

const schema = yup.object().shape({
  avatar: yup.string().url("Must be a valid URL"),
  banner: yup.string().url("Must be a valid URL"),
});

export default function EditProfile() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [createError, setCreateError] = useState(null);

  const history = useNavigate();

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
        console.log("response", result.data);
        reset({
          avatar: result.data.avatar,
          banner: result.data.banner,
        });
        setData(result.data);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [getName, getToken, reset]);

  async function onSubmit(info) {
    setSubmitting(true);
    setCreateError(null);

    console.log(info);

    const putUrl = BASE_API + PROFILE_PATH + getName + `/media`;

    try {
      const response = await axios({
        method: "put",
        url: putUrl,
        data: info,
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      console.log("response", response.data);
      history(`/myprofile`);
    } catch (error) {
      console.log("error", error);
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
        <div className="editProfileWrapper">
          <Heading title="Edit profile" />
          {data.avatar === null || data.avatar === "" ? (
            <img src={profile} alt={data.name} className="editAvatar" />
          ) : (
            <img src={data.avatar} alt={data.name} className="editAvatar" />
          )}
          <div className="profileName">
            <h2>Name</h2>
            <p>{data.name}</p>
          </div>
          <div className="profileEmail">
            <h2>Email</h2>
            <p>{data.email}</p>
          </div>

          <form className="createForm" onSubmit={handleSubmit(onSubmit)}>
            {createError && <FormError>{createError}</FormError>}

            <div className="form__components">
              {errors.avatar && <FormError>{errors.avatar.message}</FormError>}
              <label>
                <h2>Avatar</h2>
              </label>
              <input {...register("avatar")} placeholder="https://" />
            </div>

            <div className="form__components">
              {errors.banner && <FormError>{errors.banner.message}</FormError>}
              <label>
                <h2>Banner</h2>
              </label>
              <input {...register("banner")} placeholder="https://" />
            </div>

            <button className="button button-drk">
              {submitting ? "Saving..." : "Save changes"}
            </button>
            {/* <button className="cancel">Cancel</button> */}
          </form>
        </div>
      )}
      {error && <div>Error</div>}
    </div>
  );
}
