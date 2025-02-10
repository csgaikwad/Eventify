import { useState } from "react";
import axios from "axios";
import CustomInput from "../Components/CustomInput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [userEmail, setUserEmail] = useState("example@mail.com");
  const [password, setPassword] = useState("Password123!");
  const [userName, setUserName] = useState("JohnDoe");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/user/register", {
        userEmail,
        password,
        userName,
      });
      console.log(response);
      toast.success("Registration successful! Redirecting to login...", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => navigate("/login"), 3000); // Redirect after toast
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <CustomInput
        label="Email"
        type="email"
        name="email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
      />
      <CustomInput
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <CustomInput
        label="Username"
        type="text"
        name="userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className="submitButton" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}
