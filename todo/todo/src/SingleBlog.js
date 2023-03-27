import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ClientNavbar } from "./WebNavbars";
import Card from "react-bootstrap/Card";
import parse from "html-react-parser";
export function SingleBlog() {
  const { id } = useParams();
  const [article, setArticle] = useState();

  useEffect(() => {
    axios.get(`http://localhost:8000/articles/${id}`).then((res) => {
      const { data, status } = res;
      console.log(data);
      if (status === 200) {
        setArticle(data);
      } else {
        alert(`Aldaa garlaa: ${status}`);
      }
    });
  }, []);

  if (!article) return <div>Loading...</div>;

  return (
    <div>
      <ClientNavbar />
      <div className="container" style={{ maxWidth: 700 }}>
        <h1
          className="mb-4"
          style={{
            fontSize: "30px",
            lineHeight: "30px",
            marginTop: "10px",
            fontStyle: "bold",
          }}
        >
          {article.title}
        </h1>
        <Card>
          <Card.Body className="d-flex  justify-content-between">
            <h5
              style={{ color: "#4c5262", fontSize: "15px" }}
              className="d-flex align-items-center gap-2 "
            >
              <img
                src="https://i.seadn.io/gae/IhAbkYqeeNwmKMOGmkRyMlt0AaNkTrtGdeOguZQci5jS_dFAGqPmcbbJq341F3U7vsTsgLgRvQyEm9LCTsboVs4xGmFyLgcCcZxYiQ?auto=format&w=1000"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "1px solid gray",
                }}
              />
              {article.name}
              <span style={{ marginLeft: "25px" }}>
                {article.category?.name}
              </span>
            </h5>

            <div>
              <img
                src="https://img.icons8.com/fluency/512/facebook-new.png"
                style={{ width: "35px", marginRight: "5px" }}
              />
              <img
                src="https://img.icons8.com/color/512/twitter-circled.png"
                style={{ width: "35px" }}
              />
            </div>
          </Card.Body>
        </Card>
        <div className="content" style={{ marginTop: "10px" }}>
          <img src={article.image.path} />
        </div>
        <div className="content" style={{ marginTop: "10px" }}>
          {parse(article.content)}
        </div>
      </div>
    </div>
  );
}
