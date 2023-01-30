import Container from "react-bootstrap/Container";
import "./admin-editor.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";

import { Route, Routes } from "react-router-dom";
export function AdminEditor() {
  const [articleImg, setImg] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [name, setName] = useState([]);
  let [ImgAddress, urlChanger] = useState("");
  function urlTranslator(event) {
    urlChanger(event.target.value);
  }
  function ImgChanger() {
    setImg(ImgAddress);
    urlChanger("");
  }
  function handleTextChange(e) {
    setText(e.target.value);
  }
  function addTodo() {
    const newTodos = [text, ...todos];
    setTodos(newTodos);
    setText("");
  }

  return (
    <>
      <Container className="d-flex justify-content-between">
        <div className="left-sec">
          <div>
            <input type="url" value={ImgAddress} onChange={urlTranslator} />
            <button onClick={ImgChanger}>submit</button>
          </div>
          <div>
            <input
              value={text}
              onChange={handleTextChange}
              type="text"
              style={{ width: "300px" }}
            />
          </div>
          <div>
            <textarea
              onChange={handleTextChange}
              value={text}
              type="text"
              style={{ width: "500px" }}
            />
          </div>
          <button onClick={addTodo}>Hadgalah</button>
        </div>
        <div className="right-sec">
          <Image articleImg={articleImg} />
          <div></div>
          <div></div>
        </div>
      </Container>
    </>
  );
}
export function Image({ articleImg }) {
  return (
    <div>
      <img
        src={articleImg}
        style={{ width: "248px", height: "198px", objectFit: "cover" }}
      />
    </div>
  );
}
