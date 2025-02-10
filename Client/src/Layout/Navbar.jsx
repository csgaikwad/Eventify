import { Link, useNavigate } from "react-router-dom";
import Menu from "../Components/Menu";
import { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms/userAtom";

export default function Navbar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const user = useRecoilValue(userAtom);
  const menuRef = useRef(null);

  return (
    <div className="bg-[#03346E] h-[3rem] w-full flex justify-around items-center px-4 fixed top-0 left-0 z-20 shadow-md">
      <h1
        className="cursor-pointer hover:scale-105 duration-150"
        onClick={() => navigate("/")}
        style={{ margin: 0 }}
      >
        Eventify
      </h1>
      {user ? (
        <h2 className="hidden md:block">Welcome, {user.userName}</h2>
      ) : (
        <Link to={"/login"} className="border-2 p-2 rounded-md">
          Login
        </Link>
      )}
      <div
        className="relative focus-within:block"
        onBlur={(e) => {
          if (!menuRef.current.contains(e.relatedTarget)) {
            setShow(false);
          }
        }}
      >
        <img
          src="/vite.svg"
          alt="Profile"
          tabIndex={0}
          className="cursor-pointer hover:scale-105 duration-150"
          onClick={() => setShow(!show)}
        />
        {show && (
          <div
            className="absolute left-0 mt-2 shadow-lg rounded-md z-30"
            ref={menuRef}
            tabIndex={-1}
          >
            <Menu />
          </div>
        )}
      </div>
    </div>
  );
}
