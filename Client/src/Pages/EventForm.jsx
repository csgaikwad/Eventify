import { useState, useEffect } from "react";
import axios from "axios";
import CustomInput from "../Components/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateOrUpdateEvent() {
  const navigate = useNavigate();
  const { eventId } = useParams(); // Check if updating an event

  const [name, setName] = useState("Fitness Bootcamp 2025");
  const [description, setDescription] = useState(
    "A high-energy bootcamp to kickstart your fitness journey."
  );
  const [eventDate, setEventDate] = useState("2025-02-11T012:05");
  const [duration, setDuration] = useState(90);
  const [location, setLocation] = useState("Austin, TX");

  // Fetch event data if updating
  useEffect(() => {
    if (eventId) {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(`/event/${eventId}`);
          const { name, description, eventDate, duration, location } =
            response.data;
          setName(name);
          setDescription(description);
          setEventDate(new Date(eventDate).toISOString().slice(0, 16));
          setDuration(duration);
          setLocation(location);
        } catch (error) {
          console.error(error);
          toast.error("Error fetching event details.");
        }
      };
      fetchEvent();
    }
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = { name, description, eventDate, duration, location };

    try {
      if (eventId) {
        // Update Event
        await axios.put(`/event/${eventId}`, eventData);
        toast.success("Event updated successfully!");
      } else {
        // Create Event
        await axios.post("/event", eventData);
        toast.success("Event created successfully!");
      }

      setTimeout(() => navigate("/"), 2000); // Redirect after toast
    } catch (error) {
      toast.error(
        error.response?.data?.error || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div>
      <h1>{eventId ? "Update Event" : "Create Event"}</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <CustomInput
          label="Event Name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <CustomInput
          label="Description"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <CustomInput
          label="Event Date"
          type="datetime-local"
          name="eventDate"
          value={eventDate}
          min={new Date().toISOString().slice(0, 16)}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <CustomInput
          label="Duration (minutes)"
          type="number"
          name="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <CustomInput
          label="Location"
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit" className="submitButton">
          {eventId ? "Update Event" : "Create Event"}
        </button>
      </form>
    </div>
  );
}
