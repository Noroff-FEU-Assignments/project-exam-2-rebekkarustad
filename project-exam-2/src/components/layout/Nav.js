import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const getName = window.localStorage.getItem("name");

  const navigate = useNavigate();

  const logout = () => {
    const doLogout = window.confirm("Are you sure?");

    if (doLogout) {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("name");
      navigate("/login");
    }
  };

  return (
    <Navbar collapseOnSelect bg="light" expand="md">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <i class="bi bi-list"></i>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/postfeed">Home</Nav.Link>
            <Nav.Link href={`/profile/${getName}`}>Profile</Nav.Link>
            <Nav.Link href="/create">Create</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={logout}>Log out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
