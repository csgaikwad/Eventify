import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import EventDetails from "../Components/EventDetails";

export default function Event() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const navigate = useNavigate();

  // Socket connection to track the total user count for this event
  useEffect(() => {
    // Replace with your socket server URL if different
    const ServerUrl = import.meta.env.VITE_SERVER_URL;
    const socket = io(ServerUrl, { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });

    // Emit join event with the event id
    socket.emit("joinEvent", id);

    // Listen for updates on user count
    socket.on("userCount", (count) => {
      setUserCount(count);
    });

    // Clean up socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await axios.get(`/event/${id}`);
        setEvent(response.data);
      } catch (error) {
        navigate("/login");
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
    scrollTo(0, 0);
  }, [id, navigate]);

  return (
    <div className="p-6">
      {loading ? (
        <div className="h-[25rem] flex items-center">
          <img className="size-24  " src="/tube-spinner.svg" alt="Loader" />
        </div>
      ) : (
        <div className="bg-[#03346E] p-6 shadow-lg rounded-lg relative">
          <div className="animate-pulse bg-[#6EACDA] h-60 border-2 mb-5"></div>
          <EventDetails event={event} />
          <p className="text-md bg-green-900 rounded-md absolute left-0 top-0 px-2">
            Total Attendees: {userCount}
          </p>
        </div>
      )}
    </div>
  );
}
