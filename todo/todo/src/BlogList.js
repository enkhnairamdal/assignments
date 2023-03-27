import Card from "react-bootstrap/Card";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { ClientNavbar } from "./WebNavbars";
import Container from "react-bootstrap/esm/Container";
import parse from "html-react-parser";
import "./App.css";

export function ClientBlog() {
  const [articles, setArticles] = useState([]);
  const [searchParams] = useSearchParams();
  const [pages, setPages] = useState();
  const [query, setQuery] = useState("");
  const [searchedQuery] = useDebounce(query, 1000);

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  function loadArticles(page, query = "") {
    axios
      .get(`http://localhost:8000/articles?q=${query}&page=${page}`)
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          const { list, count } = data;
          setArticles(list);
          setPages(Math.ceil(count / 10));
        } else {
          alert(`Aldaa garlaa: ${status}`);
        }
      });
  }
  useEffect(() => {
    loadArticles(searchedQuery);
  }, [searchedQuery]);
  useEffect(() => {
    loadArticles(page);
  }, [page]);

  if (!articles) return <div>Loading...</div>;

  return (
    <Container>
      <div>
        <ClientNavbar />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className=" mb-4"
        />
        <div style={{ width: "65%", marginTop: "20px" }}>
          {articles.map((article) => (
            <Link
              to={`/blog/${article._id}`}
              className="d-flex gap-3"
              key={article.id}
              style={{
                marginTop: "20px",
                textDecoration: "none",
                color: "black",
              }}
            >
              <td>
                {article.image ? (
                  <img
                    src={article.image.path}
                    style={{ width: "250px", borderRadius: "5px" }}
                  />
                ) : (
                  <div></div>
                )}
              </td>

              <div className="d-flex flex-column ">
                <h3
                  style={{
                    width: "100%",
                    fontSize: "19px",
                    lineHeight: "26px",
                    fontWeight: "700",
                    height: "50%",
                  }}
                >
                  {article.title}
                </h3>
                <p
                  style={{
                    color: "#888",
                    height: "46px",
                    overflow: "hidden",
                    // marginBottom: "15px",
                    marginTop: "-10px",
                  }}
                >
                  {article.content.substring(3, 100)}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div></div>
      </div>
      <nav aria-label="Page navigation example" style={{ marginTop: "20px" }}>
        <ul className="pagination" style={{ flexWrap: "wrap" }}>
          {page !== 1 && (
            <li className="page-item">
              <Link to={`?page=${page - 1}`} className="page-link">
                Өмнөх
              </Link>
            </li>
          )}

          {[...Array(pages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${page == index + 1 ? "active" : ""}`}
            >
              <Link to={`?page=${index + 1}`} className="page-link">
                {index + 1}
              </Link>
            </li>
          ))}

          {page !== pages && (
            <li className="page-item">
              <Link to={`?page=${page + 1}`} className="page-link">
                Дараах
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </Container>
  );
}
