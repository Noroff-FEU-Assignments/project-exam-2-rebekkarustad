import { Link } from "react-router-dom";

import Heading from "../../layout/Heading";
import Collage from "../../layout/Collage";

import useTitle from "../../../hooks/useTitle";

export default function ThankYou() {
  useTitle("Thank you");

  return (
    <div className="register__container">
      <div className="register__thanks--container">
        <Heading title="Thank you" />
        <p className="register__thanks--text">
          Your profile is now registered and you can now click the button bellow
          to log in
        </p>
        <Link to="/login">
          <button className="button button-sml button-drk">Log in</button>
        </Link>
      </div>
      <Collage />
    </div>
  );
}
