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
    <div className="border-[#6EACDA] border-2 text-[#6EACDA] bg-[#03346E] p-2  rounded-2xl ">
      <span>Menu</span>

      <div
        className="mt-2 flex flex-col text-nowrap gap-2
                  [&>*]:border-t-2 [&>*]:pt-1 "
      >
        <Link to={"/"}>Home</Link>
        <Link to={"/create-event"}>Create event</Link>
        <Link to={"/login"}>Login</Link>
        <Link to={"/Register"}>Register</Link>
        <h2 className="cursor-pointer" onClick={logout}>
          Logout
        </h2>
      </div>
    </div>
  );
}
