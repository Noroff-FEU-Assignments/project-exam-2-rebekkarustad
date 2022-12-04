import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../images/logo.png";
import LogoMini from "../../images/logo-mini.png";

import { useNavigate, useLocation } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [path, setPath] = useState(location.pathname);
  const getName = window.localStorage.getItem("name");

  const logout = () => {
    const doLogout = window.confirm("Are you sure?");

    if (doLogout) {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("name");
      navigate("/login");
    }
  };

  if (path === "/profilefeed") {
    setPath("/postfeed");
  }

  return (
    <Navbar collapseOnSelect bg="light" expand="md">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <i className="bi bi-list"></i>
        </Navbar.Toggle>
        <Navbar.Brand href="/postfeed">
          <img src={LogoMini} alt="logo" className="logo-mini" />
          <img src={Logo} alt="logo" className="logo" />
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav activeKey={path} className="me-auto nav--left">
            <Nav.Link href="/postfeed">Home</Nav.Link>
            <Nav.Link href={`/profile/${getName}`}>Profile</Nav.Link>
            <Nav.Link href="/create">Create</Nav.Link>
          </Nav>
          <Nav className="nav--right">
            <Nav.Link onClick={logout}>Log out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
