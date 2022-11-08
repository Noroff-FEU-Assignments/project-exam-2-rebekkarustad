import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Nav from "../layout/Nav";
import profile from "../../images/profile.jpg";

function MyProfile() {
  return (
    <div className="myProfileWrapper">
      <Nav />
    </div>
  );
}

export default MyProfile;
