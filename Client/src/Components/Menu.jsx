import axios from "axios";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Menu() {
  const setUser = useSetRecoilState(userAtom);
  const logout = async () => {
    try {
      await axios.get("/user/logout");
      setUser(null);
      toast.success("Logged out successfully!"); // Success toast on logout
    } catch (error) {
      console.error(error);
      toast.error("Logout failed. Please try again."); // Error toast if logout fails
    }
  };
  return (
    <div className="bg-[#6EACDA]  p-2 flex flex-col gap-2 rounded-2xl text-nowrap">
      <span className="border-b-2">Menu</span>
      <Link to={"/"}>Home</Link>
      <Link to={"/create-event"}>Create event</Link>
      <Link to={"/login"}>Login</Link>
      <h2 className="cursor-pointer" onClick={logout}>
        Logout
      </h2>
    </div>
  );
}
