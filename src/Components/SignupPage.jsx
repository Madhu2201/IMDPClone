import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login-sign.css";
const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://backend-1h5d.onrender.com/api/user/signup",
        {
          username,
          email,
          password,
        }
      );
      const { Token } = response.data;

      localStorage.setItem("token", Token);

      navigate("/");
    } catch (error) {
      console.error("Error during signup:", error.response.data);
      if (error.response.status === 409) {
        setErr(
          "Email or username already exists. Please choose a different one."
        );
      } else {
        setErr("An error occurred during signup. Please try again later.");
      }
    }
  };

  return (
    <div className="signcontainer">
      <h2 className="signup">Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div>
          <input
            className="signName"
            type="text"
            value={username}
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="signEmail"
            type="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="signPassword"
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {err && <p>{err}</p>}
        <button className="signButton" type="submit">
          Sign Up
        </button>
      </form>

      <Link to="/">Login here...</Link>
    </div>
  );
};

export default SignupPage;
