import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login-sign.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const naviagte = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://backend-1h5d.onrender.com/api/user/login",
        { email, password }
      );
      const { Token } = response.data;
      localStorage.setItem("token", Token);
      naviagte("/home");
    } catch (error) {
      console.error("Error during login:", error.response.data);
      if (error.response.status === 401) {
        setErr("Invalid credentials. Please try again.");
      } else {
        setErr("An error occurred during login. Please try again later.");
      }
    }
  };

  return (
    <div className="logcontainer">
      <h2 className="login">Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            className="logEmail"
            type="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="logPassword"
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="logButton" type="submit">
          Login
        </button>
      </form>
      {err && <p>{err}</p>}
      <div>
        <Link className="link" to="/signup">
          {" "}
          donot have an account? Sign up here.
        </Link>
        <Link to="/resetpassword">..Or..ResetPassword</Link>
      </div>
    </div>
  );
};

export default LoginPage;
