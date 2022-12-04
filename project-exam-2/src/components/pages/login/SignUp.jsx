import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import Heading from "../../layout/Heading";
import FormError from "../../forms/FormError";
import Collage from "../../layout/Collage";
import { BASE_API, REGISTER_PATH } from "../../../constants/api";
import { NAME_REGEX, EMAIL_REGEX } from "../../../constants/regex";
import useTitle from "../../../hooks/useTitle";

const url = BASE_API + REGISTER_PATH;

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your username")
    .min(5, "The username must be at least 5 letters long")
    .matches(
      NAME_REGEX,
      "Must not contain punctuation symbols apart from underscore "
    ),
  email: yup
    .string()
    .email()
    .required("Please enter your email address")
    .matches(
      EMAIL_REGEX,
      "Your email must be a 'stud.noroff.no' or 'noroff.no' email address"
    ),
  password: yup
    .string()
    .required("Please enter your password")
    .min(8, "The password must be at least 8 letters long"),
  terms: yup.boolean().oneOf([true], "Must Accept Terms and Conditions"),
});

export default function SignUp() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  useTitle("Register");

  const history = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    try {
      await axios({
        method: "post",
        url: url,
        data: data,
        headers: null,
      });
      history("/thanks");
    } catch (error) {
      setLoginError("Your username is already in use. Please select another.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="register__container">
      <div className="form__container">
        <Heading title="The Social Status" />
        <h2>Welcome! Sign up to get access</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {loginError && <FormError>{loginError}</FormError>}
          <div className="form__components">
            {errors.name && <FormError>{errors.name.message}</FormError>}
            <label>Username</label>
            <input {...register("name")} />
          </div>
          <div className="form__components">
            {errors.email && <FormError>{errors.email.message}</FormError>}
            <label>Email</label>
            <input {...register("email")} />
          </div>
          <div className="form__components">
            {errors.password && (
              <FormError>{errors.password.message}</FormError>
            )}
            <label>Password</label>
            <input type="password" {...register("password")} />
          </div>

          <button className="button button-sml button-drk">
            {submitting ? "Signing in..." : "Sign up"}
          </button>

          <p>
            Already have an account? <Link to="/login">Log in here!</Link>
          </p>
        </form>
      </div>
      <Collage />
    </div>
  );
}
