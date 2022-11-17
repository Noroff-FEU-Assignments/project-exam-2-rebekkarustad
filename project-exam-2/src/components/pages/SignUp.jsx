import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import Heading from "../layout/Heading";
import FormError from "../forms/FormError";
import Collage from "../layout/Collage";
import { BASE_API, REGISTER_PATH } from "../../constants/api";
import { NAME_REGEX, EMAIL_REGEX } from "../../constants/regex";

const url = BASE_API + REGISTER_PATH;

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      NAME_REGEX,
      "Your name does not match the criteria: Must not contain punctuation symbols apart from underscore "
    )
    .required("Please enter your name"),
  email: yup
    .string()
    .email()
    .matches(
      EMAIL_REGEX,
      "Your name does not match the criteria: must be a valid 'stud.noroff.no' or 'noroff.no' email address"
    )
    .required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "The password must be at least 8 letters long")
    .required("Please enter your password"),
  terms: yup.boolean().oneOf([true], "Must Accept Terms and Conditions"),
});

export default function SignUp() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

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

    console.log(data);

    try {
      const response = await axios.post(url, data);
      console.log("response", response.data);
      history("/thanks");
    } catch (error) {
      console.log("error", error);
      setLoginError("Your username is already in use. Please select another.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="loginWrapper">
      <div className="formWrapper">
        <Heading title="Welcome" />
        <h2>Sign up to access the fun stuff</h2>
        <form className="signForm" onSubmit={handleSubmit(onSubmit)}>
          {loginError && <FormError>{loginError}</FormError>}
          <div className="loginInfo">
            {errors.name && <FormError>{errors.name.message}</FormError>}
            <label className="labelText">Username*</label>
            <input {...register("name")} />
          </div>
          <div className="loginInfo">
            {errors.email && <FormError>{errors.email.message}</FormError>}
            <label className="labelText">Email*</label>
            <input {...register("email")} />
          </div>
          <div className="loginInfo">
            {errors.password && (
              <FormError>{errors.password.message}</FormError>
            )}
            <label className="labelText">Password*</label>
            <input type="password" {...register("password")} />
          </div>
          <div className="loginCheck">
            {errors.terms && <FormError>{errors.terms.message}</FormError>}
            <input type="checkbox" {...register("terms")} />
            <label className="checkboxText">
              I agree to the <Link to="/">Terms</Link> and{" "}
              <Link to="/">Privacy Policy</Link>
            </label>
          </div>

          <button className="signButton">
            {submitting ? "Signing in..." : "Sign up"}
          </button>

          <p className="underText">
            Already have an account? <Link to="/login">Sign in here!</Link>
          </p>
        </form>
      </div>
      <Collage />
    </div>
  );
}
