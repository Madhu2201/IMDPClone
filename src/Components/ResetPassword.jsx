import axios from "axios";
import { useState } from "react";
import "./Login-sign.css";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://backend-1h5d.onrender.com/api/user/resset",
        {
          email,
          newPassword,
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error: Unable to reset password");
      console.error(error);
    }
  };

  return (
    <div className="resetcontainer">
      <h1>Password Reset</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="resetEmail"
            type="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="resetPassword"
            type="password"
            value={newPassword}
            placeholder="Enter New Password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button className="resetButton" type="submit">
          Reset Password
        </button>
      </form>
      {message && <p>{message}</p>}
      <div>
        <Link className="link" to="/signup">
          {" "}
          donot have an account? Sign up here
        </Link>
        <span>..Or..</span>
        <Link to="/">Login</Link>
      </div>
    </div>
  );
};

export default ResetPassword;
