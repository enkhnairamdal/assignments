import "./Login.css";
export function Login() {
  return (
    <div className="bigBox">
      <div class="box">
        <div class="form">
          <h2>Sign in</h2>
          <div class="inputbox">
            <input type="email" required="required" />
            <span>Email</span>
            <i></i>
          </div>
          <div class="inputbox">
            <input type="password" required="required" />
            <span>Password</span>
            <i></i>
          </div>
          <div class="links">
            <a href="3">Forgot Password</a>
            <a href="/signUp">Signup</a>
          </div>
          <input type="submit" value="Login" />
        </div>
      </div>
    </div>
  );
}
