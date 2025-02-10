/* Get Ell Events */

import Event from "../Models/eventModel.js";

export const getAllEvents = async (req, res) => {
  const result = await Event.find().populate("organizer", "userName");
  res.status(200).json(result);
};

/* Create New Event */

export const createNewEvent = async (req, res) => {
  const event = { ...req.body, organizer: req.user.id };
  const result = await Event.create(event);
  const populatedResult = await Event.findById(result._id).populate(
    "organizer",
    "userName"
  );

  res.status(201).json({ message: "Event created successfully.", result });
};

/* Get Single Event */

export const getSingleEvent = async (req, res) => {
  const { id } = req.params;
  const result = await Event.findOne({ _id: id }).populate(
    "organizer",
    "userName"
  );
  res.status(200).json(result);
};

/* Update Single Event */

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const event = req.body;
  const result = await Event.updateOne(
    { _id: id },
    { $set: event },
    { upsert: true }
  );
  res.status(200).json(result);
};

/* Delete an Event */

export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  await Event.deleteOne({ _id: id });
  res.status(200).json({ message: "Event deleted successfully" });
};
