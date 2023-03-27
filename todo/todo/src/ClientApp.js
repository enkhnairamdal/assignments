import { Link, Route, Routes, useParams } from "react-router-dom";
import { ClientBlog } from "./BlogList";
import { FilteredArticle } from "./FilteredArticle";

import { SingleBlog } from "./SingleBlog";

export function ClientApp() {
  return (
    <div>
      {/* <Link to="/">Home</Link> <Link to="/blog">Blog</Link> */}
      <Routes>
        <Route path="/" element={<div>Home page</div>} />
        <Route path="/blog" element={<ClientBlog />} />
        <Route
          path="/blog/category/:categoryId"
          element={<FilteredArticle />}
        />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
function NotFound() {
  return <div>Not Found</div>;
}
