import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { CategoriesEdit } from "./TodoEdith";
import { CategoriesList } from "./TodoList";

export function Categories() {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [query, setQuery] = useState("");
  const [searchedQuery] = useDebounce(query, 1000);

  const [list, setList] = useState([]);

  function loadCategories(query = "") {
    const token = localStorage.getItem("loginToken");
    axios
      .get(`http://localhost:8000/categories?q=${query}&token=${token}`)
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          setList(data);
        } else {
          alert(`Aldaa garlaa: ${status}`);
        }
      });
  }

  useEffect(() => {
    loadCategories(searchedQuery);
  }, [searchedQuery]);

  useEffect(() => {
    loadCategories();
  }, []);

  function closeModal() {
    setSearchParams({});
  }

  const editing = searchParams.get("editing");

  return (
    <div className="col-6 mx-auto my-4">
      <div className="d-flex justify-content-between align-items-center mb-4 ">
        <h1>Ангилал</h1>
        <button
          className="btn btn-success"
          onClick={() => setSearchParams({ editing: "new" })}
        >
          Шинэ
        </button>
      </div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className=" mb-4"
      />
      {/* <button onClick={() => loadCategories(query)}>Хайх</button> */}

      <CategoriesList
        searchedQuery={searchedQuery}
        list={list}
        onChange={loadCategories}
      />
      <CategoriesEdit
        show={editing}
        editingId={editing}
        onClose={closeModal}
        onComplete={() => {
          window.location = "/admin/categories";
        }}
      />
    </div>
  );
}
