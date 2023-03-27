import "./Login.css";
import axios from "axios";
import { useState } from "react";
export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function handleLogin() {
    axios
      .get(
        `http://localhost:8000/login?username=${username}&password=${password}`
      )
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
          const { token } = data;
          localStorage.setItem("loginToken", token);
          window.location.reload();
        }
      })
      .catch(({ response, code }) => {
        if (response.status === 401) {
          alert("Нууц үг эсвэл нэр буруу байна");
        } else {
          alert(code);
        }
      });
  }
  return (
    <div className="bigBox">
      <div className="box">
        <div className="form">
          <h2>Sign in</h2>
          <div className="inputbox">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span>Email</span>
            <i></i>
          </div>
          <div className="inputbox">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Password</span>
            <i></i>
          </div>
          <div className="links">
            <a href="3">Forgot Password</a>
            <a href="/signUp">Signup</a>
          </div>
          <button>Login</button>
        </div>
      </div>
    </div>
  );
}
