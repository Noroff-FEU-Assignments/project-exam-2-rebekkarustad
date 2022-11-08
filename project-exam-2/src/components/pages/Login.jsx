import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import Heading from "../layout/Heading";
import FormError from "../forms/FormError";
import Collage from "../layout/Collage";
import { BASE_API, LOGIN_PATH } from "../../constants/api";

const url = BASE_API + LOGIN_PATH;

const schema = yup.object().shape({
  email: yup.string().email().required("Please enter your email address"), // fix this later
  password: yup.string().required("Please enter your password"),
});

function Login() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    try {
      const response = await axios.post(url, data);
      console.log("response", response.data);

      window.localStorage.setItem("token", response.data.accessToken);
      window.localStorage.setItem("name", response.data.name);
      navigate("/feed");
    } catch (error) {
      console.log("error", error);
      setLoginError("Your email or password is wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="loginWrapper">
      <div className="formWrapper">
        <Heading title="Welcome back" />
        <h2>Sign in to access the fun stuff</h2>
        <form className="signForm" onSubmit={handleSubmit(onSubmit)}>
          {loginError && <FormError>{loginError}</FormError>}
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

          <button className="signButton">
            {submitting ? "Signing in..." : "Sign up"}
          </button>

          <p className="underText">
            Don't have an account? <Link to="/signUp">Register here!</Link>
          </p>
        </form>
      </div>
      <Collage />
    </div>
  );
}

export default Login;
