import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login-sign.css";

const Login = () => {
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

      naviagte("/checkout");
    } catch (error) {
      console.error(error.response.data);
      if (error.response.status === 401) {
        setErr("Invalid credentials. Please try again.");
      } else {
        setErr(
          "An error occurred during verification. Please try again later."
        );
      }
    }
  };

  return (
    <div className="verifycontainer">
      <h2 className="">Verify The Booking</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            className="verifyName"
            type="name"
            placeholder="Enter Username"
          />
        </div>
        <div>
          <input
            className="verifyEmail"
            type="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            className="verifyPassword"
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="verifyLogin" type="submit">
          Confirm
        </button>
      </form>
      {err && <p>{err}</p>}
      <div>
        <Link className="" to="/checkout"></Link>
      </div>
    </div>
  );
};

export default Login;
