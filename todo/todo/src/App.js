import {
  Routes,
  Route,
  Link,
  RouterProvider,
  BrowserRouter,
} from "react-router-dom";
import { Todos } from "./Todos";
import { NavBar } from "./Navbar";
import { Login } from "./LoginHome";
import { SignUp } from "./SignUp";
import { AdminEditor } from "./AdminEditor";

// import { Editor } from "./editor";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/angilal" element={<Todos />} />
        </Routes>
      </BrowserRouter>
      <AdminEditor />
    </>
  );
}
export default App;
