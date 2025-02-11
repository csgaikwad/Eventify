import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import Home from "./Pages/Home";
import Event from "./Pages/Event";
import axios from "axios";
import "./App.css";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import EventForm from "./Pages/EventForm";
import NotFound from "./Pages/NotFound";
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import { userAtom } from "./atoms/userAtom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
axios.defaults.withCredentials = true;

function App() {
  const setUser = useSetRecoilState(userAtom);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/user/me");
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null); // Clear user data on error
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-10 p-10 rounded-md flex justify-center items-start min-h-[calc(100vh-6rem)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/event/:id" element={<Event />} />
          <Route path="/create-event" element={<EventForm />} />
          <Route path="/create-event/:eventId" element={<EventForm />} />
          <Route path="*" element={<NotFound />} /> {/* 404 Route */}
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
      <Footer />
    </>
  );
}

export default App;
