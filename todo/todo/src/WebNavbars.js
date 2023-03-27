import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Login } from "./LoginHome";

export function AdminNavbar() {
  function quit() {
    localStorage.removeItem("loginToken");
    window.location.reload();
  }
  return (
    <>
      <Navbar bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand className="text-white" href="/">
            Админ
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link className="text-secondary" href="/admin/categories">
                Ангилал
              </Nav.Link>

              <NavDropdown title="Мэдээ" id="navbarScrollingDropdown">
                <NavDropdown.Item className="text-secondary" href="#action3">
                  Мэдээ
                </NavDropdown.Item>
                <NavDropdown.Item className="text-secondary" href="#action4">
                  Сэтгэгдэл
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  className="text-secondary"
                  href="/admin/ckeditor"
                >
                  Шинэ мэдээ
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className="text-secondary" href="#" disabled>
                Сэдэв
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <div>
                <Button
                  className="border border-0 bg-danger text-light"
                  variant="outline-success"
                  onClick={() => quit()}
                >
                  Гарах
                </Button>
              </div>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export function ClientNavbar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/categories`).then((res) => {
      const { data, status } = res;
      if (status === 200) {
        setCategories(data);
      } else {
        alert(`Aldaa garlaa: ${status}`);
      }
    });
  }, []);
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/blog">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <NavDropdown
            // id="nav-dropdown-dark-example"
            title="Medee"
            menuVariant="light"
          >
            {categories.map((category) => (
              <NavDropdown.Item
                key={category.id}
                value={category.id}
                href={`/blog/category/${category.id}`}
              >
                {category.name}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
