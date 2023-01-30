import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
export function NavBar() {
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
              <Nav.Link className="text-secondary" href="#action1">
                Хэрэглэгч
              </Nav.Link>
              <Nav.Link className="text-secondary" href="/admin/angilal">
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
                <NavDropdown.Item className="text-secondary" href="#action5">
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
                  href="/"
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
