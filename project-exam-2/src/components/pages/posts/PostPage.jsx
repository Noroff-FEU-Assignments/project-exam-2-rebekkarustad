import { useState } from "react";
import useAxiosGet from "../../../hooks/useAxiosGet";
import axios from "axios";
import { useParams } from "react-router-dom";

import { BASE_API, POST_PATH, FLAG_PATH } from "../../../constants/api";
import useToken from "../../../hooks/useToken";
import useTitle from "../../../hooks/useTitle";

import Nav from "../../layout/Nav";
import LoadingSpinner from "../../layout/LoadingSpinner";
import Error from "../../layout/Error";
import PostDetails from "./PostDetails";

import Comments from "../../ui/comments/Comments";
import CommentForm from "../../ui/comments/CommentForm";

export default function PostPage() {
  const [activeComment, setActiveComment] = useState(null);
  const [commentError, setCommentError] = useState(null);

  let { id } = useParams();

  const url = BASE_API + POST_PATH + `/${id}` + FLAG_PATH;

  const { data, loading, error, commentData } = useAxiosGet(url);

  useTitle(data.title);
  useToken();

  const rootComments = commentData.filter(
    (backendComment) => backendComment.replyToId === null
  );

  const getReplies = (commendId) => {
    return commentData.filter(
      (backendComment) => backendComment.replyToId === commendId
    );
  };

  const addComment = (text, replyToId) => {
    const getToken = window.localStorage.getItem("token");
    const commentUrl = BASE_API + POST_PATH + `/${id}/comment`;

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
      setCommentError(false);
      window.location.reload(true);
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
                {commentData.length === 1
                  ? `${commentData.length} comment`
                  : `${commentData.length} comments`}
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
      {commentError && <div>Error</div>}
    </div>
  );
}
