import Card from "react-bootstrap/Card";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ClientNavbar } from "./WebNavbars";
export function FilteredArticle() {
  const { categoryId } = useParams();

  const [filter, setFilter] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/articles/category/${categoryId}`)
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          setFilter(data);
        } else {
          alert(`Aldaa garlaa: ${status}`);
        }
      });
  }, [categoryId]);

  if (!filter) return <div>Loading...</div>;
  return (
    <div>
      <ClientNavbar />
      <div>
        {filter.map((article) => (
          <div
            className="d-flex gap-3"
            key={article.id}
            style={{ marginTop: "20px" }}
          >
            <img
              src={article.ImgAddress}
              style={{ width: "250px", borderRadius: "10px" }}
            />
            <h5
              style={{
                width: "400px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {article.title}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
}
