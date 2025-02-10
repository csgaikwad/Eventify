import axios from "axios";
import { useEffect, useState } from "react";
import EventCard from "../Components/EventCard";

export default function Home() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get("/event");
        const events = Array.isArray(response.data) ? response.data : [];
        const currentTime = new Date().getTime();
        // Separate upcoming and past events
        const upcoming = events.filter(
          (event) => new Date(event.eventDate).getTime() > currentTime
        );
        const past = events.filter(
          (event) => new Date(event.eventDate).getTime() <= currentTime
        );

        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } catch (error) {
        console.error("Error fetching events:", error);
        setUpcomingEvents([]);
        setPastEvents([]);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div className="ml-5">
      <h1 className="mb-5 text-2xl font-bold">Upcoming Events</h1>
      <div>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))
        ) : (
          <p className="text-xl mt-5">No upcoming events available.</p>
        )}
      </div>

      <h1 className="mb-5 mt-20 text-2xl font-bold">Past Events</h1>
      <div>
        {pastEvents.length > 0 ? (
          pastEvents.map((event) => <EventCard key={event._id} event={event} />)
        ) : (
          <p className="text-xl mt-5">No past events available.</p>
        )}
      </div>
    </div>
  );
}
