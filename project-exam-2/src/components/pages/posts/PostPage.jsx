import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import { BASE_API, POST_PATH, FLAG_PATH } from "../../../constants/api";

import Nav from "../../layout/Nav";
import FormError from "../../forms/FormError";
import { OPTIONS } from "../../../constants/options";
import LoadingSpinner from "../../layout/LoadingSpinner";
import PostDetails from "./PostDetails";

const schema = yup.object().shape({
  body: yup.string(),
});

export default function PostPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [replyToggle, setReplyToggle] = useState(false);

  let { id } = useParams();

  const url = BASE_API + POST_PATH + `/${id}` + FLAG_PATH;
  const commentUrl = BASE_API + POST_PATH + `/${id}/comment`;

  const getName = window.localStorage.getItem("name");

  console.log(getName);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(url, OPTIONS);
        const data = await response.json();

        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setCreateError(null);

    console.log(data);

    const getToken = window.localStorage.getItem("token");

    try {
      const response = await axios({
        method: "post",
        url: commentUrl,
        data: data,
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
      setCreateError("Something went wrong");
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      reset();
    }
  }

  console.log(data);

  function reply() {
    console.log("hello");
    setReplyToggle(!replyToggle);
  }

  async function onReply(data) {
    const getToken = window.localStorage.getItem("token");
    const commentUrl = BASE_API + POST_PATH + `/${id}/comment`;

    await axios({
      method: "post",
      url: commentUrl,
      data: data,
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    });
    console.log("reply", data);
  }

  return (
    <div>
      <Nav />
      {loading ? (
        <div className="spinner">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="postWrapper">
          <PostDetails
            id={data.id}
            author={data.author}
            title={data.title}
            media={data.media}
            body={data.body}
            comments={data.comments}
            reactions={data.reactions}
            tags={data.tags}
          />

          <hr />

          <h2>
            {data.comments.length === 1
              ? `${data.comments.length} comment`
              : `${data.comments.length} comments`}
          </h2>

          {data.comments.map((comment) => (
            <div key={comment.id} className="commentWrapper">
              <h3>{comment.owner}</h3>
              <p>{comment.body}</p>
              <button onClick={reply}>Reply</button>
              {replyToggle && (
                <div>
                  {submitted && (
                    <p className="success">Your message was sent</p>
                  )}
                  <form className="createForm" onSubmit={handleSubmit(onReply)}>
                    <div className="loginInfo">
                      {errors.body && (
                        <FormError>{errors.body.message}</FormError>
                      )}
                      <label className="labelText">Comment</label>
                      <textarea rows="3" {...register("body")} />

                      <button className="signButton">
                        {submitting ? "Commenting..." : "Comment"}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          ))}

          <div className="commentForm">
            {submitted && <p className="success">Your message was sent</p>}
            <form className="createForm" onSubmit={handleSubmit(onSubmit)}>
              {createError && <FormError>{createError}</FormError>}

              <div className="loginInfo">
                {errors.body && <FormError>{errors.body.message}</FormError>}
                <label className="labelText">Comment</label>
                <textarea rows="3" {...register("body")} />
              </div>

              <button className="signButton">
                {submitting ? "Commenting..." : "Comment"}
              </button>
            </form>
          </div>
        </div>
      )}
      {error && <div>Error</div>}
    </div>
  );
}
