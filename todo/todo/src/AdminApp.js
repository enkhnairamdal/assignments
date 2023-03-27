import "bootstrap/dist/css/bootstrap.min.css";

import { Link, Routes, Route, Navigate } from "react-router-dom";
import { Categories } from "./Todos";
import { CkEditor } from "./CkEditor";
import { AdminNavbar } from "./WebNavbars";
import { Login } from "./LoginHome";
import { SignUp } from "./SignUp";

export function AdminApp() {
  // if (!localStorage.getItem("loginToken")) {
  //   return <Login />;
  // }
  return (
    <>
      <AdminNavbar />
      <Routes>
        <Route path="/" element={<Navigate to="/admin/categories" />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/ckeditor" element={<CkEditor />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </>
  );
}
