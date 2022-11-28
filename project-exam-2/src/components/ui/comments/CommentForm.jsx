import { useState } from "react";

export default function CommentForm({ handleSubmit, submitLabel }) {
  const [text, setText] = useState("");

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
      <button className="button">{submitLabel}</button>
    </form>
  );
}
