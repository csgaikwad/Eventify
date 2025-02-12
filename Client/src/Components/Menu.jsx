/* eslint-disable react/prop-types */
import axios from "axios";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

export default function Menu({ show }) {
  const setUser = useSetRecoilState(userAtom);

  const logout = async () => {
    try {
      await axios.get("/user/logout");
      setUser(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ height: "0" }}
          animate={{ height: "auto" }}
          exit={{ height: "0" }}
          transition={{ duration: 0.15 }}
          className="border-[#6EACDA] border-2 text-[#6EACDA] bg-[#03346E] p-2 pb-4 rounded-2xl origin-top overflow-hidden"
          tabIndex={-1}
        >
          <h2 className="cursor-default border-b-2 w-full">Menu</h2>
          <div className="mt-2 flex flex-col text-nowrap gap-2 [&>*]:border-b-2 [&>*]:pt-1 [&>*]:hover:text-amber-100">
            <Link to={"/"}>Home</Link>
            <Link to={"/create-event"}>Create Event</Link>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
            <h3 className="cursor-pointer" onClick={logout}>
              Logout
            </h3>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
