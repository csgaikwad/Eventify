import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, index: true },
  description: { type: String, required: true },
  eventDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value >= new Date(); // TO Ensure eventDate is not in the past
      },
      message: "Event date must be in the future.",
    },
  },
  duration: {
    type: Number,
    required: true,
    min: 1, // Minimum duration (e.g., 1 minute or 1 hour)
    max: 1440, // Maximum duration (e.g., 1440 minutes or 24 hours)
  },
  location: { type: String, required: false },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
