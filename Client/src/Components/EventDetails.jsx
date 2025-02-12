/* eslint-disable react/prop-types */
export default function EventDetails({ event }) {
  return (
    <div>
      <h2 className="text-2xl font-bold">{event.name}</h2>
      <p className="text-gray-100">{event.description}</p>
      <p className="text-sm text-gray-50">
        Date: {new Date(event.eventDate).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-50">
        Time: {new Date(event.eventDate).toLocaleTimeString()}
      </p>
      <p className="text-sm text-gray-50">
        Duration: {Math.floor(event.duration / 60)} hours{" "}
        {event.duration % 60 !== 0 && `${event.duration % 60} mins`}
      </p>
      {event.organizer && (
        <p className="text-sm text-gray-50">
          Organiser: {event.organizer.userName}
        </p>
      )}
    </div>
  );
}
