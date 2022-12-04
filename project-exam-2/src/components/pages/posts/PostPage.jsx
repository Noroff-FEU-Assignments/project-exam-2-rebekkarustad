import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { BASE_API, POST_PATH, FLAG_PATH } from "../../../constants/api";

import Nav from "../../layout/Nav";
import { OPTIONS } from "../../../constants/options";
import LoadingSpinner from "../../layout/LoadingSpinner";
import PostDetails from "./PostDetails";

import Comments from "../../ui/comments/Comments";
import CommentForm from "../../ui/comments/CommentForm";

import useTitle from "../../../hooks/useTitle";
import Error from "../../layout/Error";
import useToken from "../../../hooks/useToken";

export default function PostPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);

  useTitle(data.title);
  useToken();

  const rootComments = backendComments.filter(
    (backendComment) => backendComment.replyToId === null
  );

  const getReplies = (commendId) => {
    return backendComments.filter(
      (backendComment) => backendComment.replyToId === commendId
    );
  };

  let { id } = useParams();

  const commentUrl = BASE_API + POST_PATH + `/${id}/comment`;
  const url = BASE_API + POST_PATH + `/${id}` + FLAG_PATH;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, OPTIONS);
        setData(response.data);
        setBackendComments(response.data.comments);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  const addComment = (text, replyToId) => {
    const getToken = window.localStorage.getItem("token");

    const postData = async () => {
      await axios({
        method: "post",
        url: commentUrl,
        data: {
          body: text,
          replyToId: replyToId,
        },
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      setActiveComment(null);
      setError(false);
    };
    postData();
  };

  return (
    <div>
      <Nav />
      {loading ? (
        <div className="spinner">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="container--main">
          <div className="post__container">
            {error && <Error />}

            <PostDetails
              id={data.id}
              author={data.author}
              title={data.title}
              media={data.media}
              body={data.body}
              comments={data.comments}
              reactions={data.reactions}
              tags={data.tags}
              created={data.created}
            />

            <hr />
            <div className="post-comment__container">
              <h2>
                {backendComments.length === 1
                  ? `${backendComments.length} comment`
                  : `${backendComments.length} comments`}
              </h2>
              {rootComments.map((rootComment) => (
                <Comments
                  key={rootComment.id}
                  comment={rootComment}
                  replies={getReplies(rootComment.id)}
                  addComment={addComment}
                  activeComment={activeComment}
                  setActiveComment={setActiveComment}
                  postAuthor={data.author.name}
                />
              ))}
              <CommentForm submitLabel="Write" handleSubmit={addComment} />
            </div>
          </div>
        </div>
      )}
      {error && <div>Error</div>}
    </div>
  );
}
