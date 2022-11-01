import { useState, useEffect } from "react";
import { FULL_API } from "../../constants/api";
// import { BASE_API, POST_PATH } from "../../constants/api";
import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import axios from "axios";

// import FormError from "../forms/FormError";

// import CommentForm from "../forms/CommentForm";
import Nav from "../layout/Nav";
import profile from "../../images/profile.jpg";

const url = FULL_API;

// const schema = yup.object().shape({
//   comment: yup.string().required("Please enter your comment"),
// });

export default function DiscoverFeed() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // const [submitting, setSubmitting] = useState(false);
  // const [commentError, setCommentError] = useState(null);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const getToken = window.localStorage.getItem("token");

      try {
        const options = {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        };

        const response = await fetch(url, options);
        const data = await response.json();

        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading</div>; //add a spinner
  if (error) return <div>error</div>;

  console.log(data);

  // async function onSubmit(commentdata) {
  //   const commentUrl = BASE_API + POST_PATH + `/${data.id}/comment`;
  //   console.log(commentUrl);

  //   try {
  //     const response = await axios.post(commentUrl, commentdata);
  //     console.log("response", response.data);

  //     window.localStorage.setItem("token", response.data.accessToken);
  //   } catch (error) {
  //     console.log("error", error);
  //     setCommentError("Your email or password is wrong");
  //   } finally {
  //     setSubmitting(false);
  //   }
  // }

  return (
    <div className="feedPage">
      <Nav />
      <div className="feedWrapper">
        <h1>Explore</h1>

        <Link to="/myprofile" className="profileButton">
          Profiles
        </Link>

        <div className="feedCard">
          {data.map((post) => (
            <div key={post.id} className="postDetail">
              <div className="profileInfo">
                {post.author.avatar === null ? (
                  <img
                    src={profile}
                    alt={post.author.name}
                    className="blankAvatar"
                  />
                ) : (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="postAvatar"
                  />
                )}

                <p className="authorName">{post.author.name}</p>
              </div>

              {post.media === null || post.media === "" ? (
                <span></span>
              ) : (
                <img src={post.media} alt={post.author} className="postImage" />
              )}

              <Link to={`/post/${post.id}`}>
                <h2>{post.title}</h2>
              </Link>
              <p className="postBody">{post.body}</p>
              <div className="replyWrapper">
                <div className="reactWrapper">
                  {post.reactions.map((reaction) => (
                    <div key={reaction.postId}>
                      <p className="emoji">{reaction.symbol}</p>
                    </div>
                  ))}

                  <p>
                    {post.reactions.length < 1
                      ? `0 reactions`
                      : `${post.reactions.length}`}
                  </p>
                </div>
                <p>
                  {post.comments.length === 1
                    ? `${post.comments.length} comment`
                    : `${post.comments.length} comments`}
                </p>
              </div>

              {/* <form className="commentForm" onSubmit={handleSubmit(onSubmit)}>
                {commentError && <FormError>{commentError}</FormError>}
                <input
                  name="comment"
                  placeholder="Leave a comment ..."
                  {...register("comment")}
                />
                {errors.comment && (
                  <FormError>{errors.comment.message}</FormError>
                )}
                <button>{submitting ? "Sending..." : "Send"}</button>
              </form> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
