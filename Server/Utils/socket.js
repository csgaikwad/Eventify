import { Server } from 'socket.io';

const eventUsers = {}; // Using a simple object instead of Map

export const setupSocket = (io) => {
  io.on('connection', (socket) => {
    let currentEvent;

    console.log("New client connected:", socket.id);

    socket.on('joinEvent', (eventId) => {
      currentEvent = eventId;
      socket.join(eventId);

      // Update the user count for the event
      eventUsers[eventId] = (eventUsers[eventId] || 0) + 1;

      // Broadcast the updated user count to all clients in the event room
      io.to(eventId).emit('userCount', eventUsers[eventId]);
    });

    socket.on('disconnect', () => {
      if (currentEvent && eventUsers[currentEvent]) {
        eventUsers[currentEvent]--;

        if (eventUsers[currentEvent] <= 0) {
          delete eventUsers[currentEvent]; // Remove event if no users left
        }

        // Broadcast the updated user count after disconnection
        io.to(currentEvent).emit('userCount', eventUsers[currentEvent] || 0);
      }

      console.log("Client disconnected:", socket.id);
    });
  });
};
