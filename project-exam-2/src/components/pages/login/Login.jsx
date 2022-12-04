import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import Heading from "../../layout/Heading";
import FormError from "../../forms/FormError";
import Collage from "../../layout/Collage";
import { BASE_API, LOGIN_PATH } from "../../../constants/api";
import useTitle from "../../../hooks/useTitle";

const url = BASE_API + LOGIN_PATH;

const schema = yup.object().shape({
  email: yup.string().email().required("Please enter your email address"), // fix this later
  password: yup.string().required("Please enter your password"),
});

function Login() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  useTitle("Login");

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

      window.localStorage.setItem("token", response.data.accessToken);
      window.localStorage.setItem("name", response.data.name);
      navigate("/postfeed");
    } catch (error) {
      setLoginError("Your email or password is wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="register__container">
      <div className="form__container">
        <Heading title="Welcome back" />
        <h2>Sign in to access the fun stuff</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {loginError && <FormError>{loginError}</FormError>}
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
            {submitting ? "Logging in..." : "Login"}
          </button>

          <p>
            Don't have an account? <Link to="/signUp">Sign up here!</Link>
          </p>
        </form>
      </div>
      <Collage />
    </div>
  );
}

export default Login;
