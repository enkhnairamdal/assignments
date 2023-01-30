import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./App.css";
import axios from "axios";

export function TodoList({
  todos,
  editingText,
  handleEditingText,
  cancelEditing,
  updateEditingText,
  handleDoneChange,
  editTodoInline,
  handleDelete,
  list,
}) {
  return (
    <div>
      <ul>
        {list.map((todo1, index1) => {
          return (
            <li
              className="list"
              // key={todo1.id}

              style={{ textDecoration: todo1.done ? "line-through" : "none" }}
            >
              {editingText[todo1.id] !== undefined ? (
                <>
                  <NormalItem
                    editingText={editingText}
                    todo1={todo1}
                    handleEditingText={handleEditingText}
                    cancelEditing={cancelEditing}
                    updateEditingText={updateEditingText}
                    index1={index1}
                  />
                </>
              ) : (
                <>
                  <EditingItem
                    handleDoneChange={handleDoneChange}
                    todo1={todo1}
                    editTodoInline={editTodoInline}
                    handleDelete={handleDelete}
                    index1={index1}
                  />
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
function NormalItem({
  editingText,
  todo1,
  handleEditingText,
  cancelEditing,
  updateEditingText,
  index1,
}) {
  return (
    <>
      <Card className="col-6 mx-auto d-flex flex-row justify-content-between  ">
        <input
          className="border"
          value={editingText[todo1.id]}
          onChange={(e) => handleEditingText(todo1.id, e)}
        />
        <div>
          <Button variant="danger" onClick={() => cancelEditing(todo1.id)}>
            bolih
          </Button>
          <Button
            variant="success"
            onClick={() => updateEditingText(index1, todo1.id)}
          >
            Hadgalah
          </Button>
        </div>
      </Card>
    </>
  );
}
function EditingItem({
  handleDoneChange,
  todo1,
  editTodoInline,
  handleDelete,
  index1,
}) {
  return (
    <>
      <Card className="col-6 mx-auto d-flex flex-row justify-content-between my-4 ">
        <div className="list-input">
          <input
            className="form-check-input me-1 "
            type="checkbox"
            onChange={(e) => handleDoneChange(todo1.id, e)}
          />
        </div>
        <div>
          {todo1.name}
          {!todo1.done && (
            <>
              <Button
                variant="success"
                onClick={() => editTodoInline(todo1.id, index1)}
              >
                zasah
              </Button>
            </>
          )}
          <Button variant="danger" onClick={handleDelete}>
            Ustgah
          </Button>
        </div>
      </Card>
    </>
  );
}
// function ListItem({}) {
//   function handleDelete() {
//     if (window.confirm("Delete?")) {
//       axios.delete(`http://localhost:8800/categories/${id}`).then((res) => {
//         const { status } = res;
//         if (status === 200) {
//           loadCategories();
//         }
//       });
//     }
//   }
// }
