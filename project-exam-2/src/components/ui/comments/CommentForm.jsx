import { useState } from "react";

export default function CommentForm({ handleSubmit, submitLabel }) {
  const [text, setText] = useState("");
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };

  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="comment-form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="comment-form-button" disabled={isTextareaDisabled}>
        {submitLabel}
      </button>
    </form>
  );
}

/*
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
*/
