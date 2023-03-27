import {
  Routes,
  Route,
  Link,
  RouterProvider,
  BrowserRouter,
} from "react-router-dom";

import { AdminApp } from "./AdminApp";
import { Login } from "./LoginHome";
import { ClientApp } from "./ClientApp";

// import { Editor } from "./editor";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="*" element={<ClientApp />} />
        </Routes>
      </BrowserRouter>
      {/* <AdminEditor /> */}
    </>
  );
}
export default App;
