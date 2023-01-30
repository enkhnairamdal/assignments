import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";

export function Angilal({
  text,
  error,
  handleTextChange,
  addTodo,
  handleClose,
  // handleShow,
  show,
}) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ангилал нэмэх</Modal.Title>
        </Modal.Header>
        <Modal.Body>Нэр</Modal.Body>
        <InputGroup className="mb-3 px-3">
          <Form.Control
            value={text}
            style={{ borderColor: error ? "red" : "black" }}
            onChange={handleTextChange}
            placeholder="Ангиллын нэр"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
        </InputGroup>

        <Modal.Footer className="d-flex justify-content-between">
          <Button
            className="bg-danger border-0 "
            variant="secondary"
            onClick={handleClose}
          >
            Устгах
          </Button>
          <Button
            onClick={addTodo}
            className="bg-primary border-0 "
            variant="primary"
          >
            Хадгалах
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
