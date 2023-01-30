import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Angilal } from "./Modal";
import { TodoList } from "./TodoList";
import Button from "react-bootstrap/Button";
import axios from "axios";
axios.interceptors.request.use((config) => {
  console.log("Request sent to: ", config.url);
  return config;
});

export function Todos({}) {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState();
  const [editingText, setEditingText] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [list, setList] = useState([]);

  function loadCategories() {
    axios.get("http://localhost:8800/categories").then((res) => {
      const { data, status } = res;
      if (status === 200) {
        setList(data);
      } else {
        alert(`Aldaa garlaa: ${status}`);
      }
    });
  }
  useEffect(() => {
    loadCategories();
  }, []);

  function handleTextChange(e) {
    setText(e.target.value);
  }

  function addTodo() {
    if (text === "") {
      setError("Utgaa bichne uu?");
    } else {
      if (editing === undefined) {
        const newTodo = {
          text: text,
          done: false,
          id: uuidv4(),
        };
        const newTodos = [newTodo, ...todos];
        setTodos(newTodos);
      } else {
        const newTodos = [...todos];
        newTodos[editing].text = text;
        setTodos(newTodos);
        setEditing(undefined);
      }
      setShow(false);
      setText("");
      setError("");
    }
  }
  function handleDelete(bairlal1) {
    if (window.confirm("Ustgah uu?")) {
      const newTodos = [...todos];
      newTodos.splice(bairlal1, 1);
      setTodos(newTodos);
    }
  }
  function handleDoneChange(id) {
    const newTodos = [...todos];
    let index;
    for (let i = 0; i < todos.length; i++) {
      if (id === todos[i].id) {
        index = i;
        break;
      }
    }
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  }
  function editTodoInline(id, index) {
    const newEditingText = { ...editingText };
    newEditingText[id] = todos[index].text;
    setEditingText(newEditingText);
    setError("");
  }
  function handleEditingText(id, e) {
    const newEditingText = { ...editingText };
    newEditingText[id] = e.target.value;
    setEditingText(newEditingText);
  }
  function cancelEditing(id) {
    const newEditingText = { ...editingText };
    newEditingText[id] = undefined;
    setEditingText(newEditingText);
  }
  function updateEditingText(index, id) {
    if (editingText[id] === "") {
      setError("Utgaa bichne uu?");
    } else {
      const newTodos = [...todos];
      newTodos[index].text = editingText[id];
      setTodos(newTodos);
      cancelEditing(id);
    }
  }
  return (
    <div>
      <div className="d-flex justify-content-between mt-5 mx-auto col-6">
        <h1 className="my-5 mx-4 ">Ангилал</h1>
        <Button className="my-5" variant="outline-primary" onClick={handleShow}>
          Шинэ
        </Button>
      </div>
      <Angilal
        text={text}
        error={error}
        handleTextChange={handleTextChange}
        addTodo={addTodo}
        handleClose={handleClose}
        // handleShow={handleShow}
        show={show}
      />

      <TodoList
        list={list}
        todos={todos}
        editingText={editingText}
        handleEditingText={handleEditingText}
        cancelEditing={cancelEditing}
        updateEditingText={updateEditingText}
        handleDoneChange={handleDoneChange}
        editTodoInline={editTodoInline}
        handleDelete={handleDelete}
        loadCategories={loadCategories}
      />
    </div>
  );
}
