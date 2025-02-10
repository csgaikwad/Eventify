import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms/userAtom";

/* eslint-disable react/prop-types */
export default function EventCard({ event }) {
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom); // Get logged-in user info
  const [isStartingSoon, setIsStartingSoon] = useState(false);

  useEffect(() => {
    const checkEventTime = () => {
      const eventTime = new Date(event.eventDate).getTime();
      const currentTime = new Date().getTime();
      setIsStartingSoon(eventTime - currentTime <= 5 * 60 * 1000);
    };

    checkEventTime(); // Initial check
    const interval = setInterval(checkEventTime, 60000); // Check every minute

    return () => clearInterval(interval); // Cleanup
  }, [event.eventDate]);

  return (
    <div
      className={`bg-[#03346E] p-4 border rounded-lg shadow-md mb-4 hover:shadow-xl duration-100 ${
        isStartingSoon ? "cursor-pointer" : "cursor-default"
      }`}
    >
      <h2 className="text-xl font-bold">{event.name}</h2>
      <p className="text-gray-100">{event.description}</p>
      <p className="text-sm text-gray-50">
        Date: {new Date(event.eventDate).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-50">Duration: {event.duration} mins</p>
      {event.organizer && (
        <p className="text-sm text-gray-50">
          Organiser: {event.organizer.userName}
        </p>
      )}
      <div className="flex flex-col md:flex-row  justify-center md:justify-between items-center gap-4">
        {/* Attend Button */}
        <button
          className="submitButton mt-2"
          style={{
            scale: !isStartingSoon && "none",
            cursor: isStartingSoon ? "pointer" : "default",
          }}
          onClick={() => {
            if (isStartingSoon) {
              navigate(`/event/${event._id}`);
            }
          }}
        >
          {isStartingSoon ? "Attend" : "Coming Soon..."}
        </button>

        {/* Show Update Button if User is the Organizer */}
        {user && event.organizer && user.id === event.organizer._id && (
          <button
            className="submitButton mt-2 bg-yellow-500 hover:bg-yellow-600"
            onClick={() => navigate(`/create-event/${event._id}`)}
          >
            Update Event
          </button>
        )}
      </div>
    </div>
  );
}
