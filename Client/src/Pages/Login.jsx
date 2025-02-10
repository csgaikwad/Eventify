import axios from "axios";
import { useState } from "react";
import CustomInput from "../Components/CustomInput";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [userEmail, setUserEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("SecurePass123!");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user/login", { userEmail, password });
      console.log(response.data.user);
      setUser(response.data.user);
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => navigate("/"), 3000); // Redirect after toast
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
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
        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
      <h2 className="cursor-pointer" onClick={() => navigate("/register")}>
        {"Don't have an account yet? Register here..."}
      </h2>
    </div>
  );
}
