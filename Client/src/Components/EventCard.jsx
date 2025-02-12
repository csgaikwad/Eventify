import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms/userAtom";
import EventDetails from "./EventDetails";

/* eslint-disable react/prop-types */
export default function EventCard({ event }) {
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom); // Get logged-in user info
  const [isStartingSoon, setIsStartingSoon] = useState(false);
  const [isPastEvent, setIsPastEvent] = useState(false);

  useEffect(() => {
    const checkEventTime = () => {
      const eventTime = new Date(event.eventDate).getTime();
      const currentTime = new Date().getTime();
      setIsStartingSoon(!eventTime - currentTime <= 5 * 60 * 1000);
      setIsPastEvent(eventTime + event.duration >= currentTime);
    };

    checkEventTime(); // Initial check
    const interval = setInterval(checkEventTime, 60000); // Check every minute

    return () => clearInterval(interval); // Cleanup
  }, [event.eventDate, event.duration]);

  return (
    // hover:shadow-lg hover:shadow-blue-500/50
    <div
      className={`bg-[#03346E] p-4 border rounded-lg shadow-md mb-4  cursor-default hoverShadow`}
    >
      <EventDetails event={event} />
      <div className="flex flex-col md:flex-row  justify-center md:justify-between items-center gap-4">
        {isPastEvent ? (
          <>
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
          </>
        ) : (
          <h3 className="bg-gray-300 w-full rounded-sm text-center mt-4 text-gray-800 font-semibold px-2">
            This event concluded at{" "}
            {new Date(event.eventDate).toLocaleTimeString()}
          </h3>
        )}
      </div>
    </div>
  );
}
