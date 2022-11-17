import Spinner from "react-bootstrap/Spinner";

export default function LoadingSpinner() {
  return (
    <Spinner animation="border" role="status" variant="dark">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
