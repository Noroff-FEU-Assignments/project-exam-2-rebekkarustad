import { Link } from "react-router-dom";

export default function UpdateSuccess({ id }) {
  return (
    <div className="success">
      The post was successfully updated. Click{" "}
      <Link to={`/post/${id}`}>here</Link> to return to the post!
    </div>
  );
}
