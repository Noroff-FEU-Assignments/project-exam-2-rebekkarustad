import { Link } from "react-router-dom";

import Heading from "../layout/Heading";
import Collage from "../layout/Collage";

export default function ThankYou() {
  return (
    <div className="loginWrapper">
      <div className="thankYouWrapper">
        <Heading title="Thank you" />
        <p className="thankYouText">
          Your profile is now registered and you can now click the button bellow
          to log in
        </p>
        <Link to="/login">
          <button className="profileBtn">Log in</button>
        </Link>
      </div>
      <Collage />
    </div>
  );
}
