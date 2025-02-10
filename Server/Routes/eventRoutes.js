import express from "express";
import { asyncHandler } from "../Middleware/ErrorHandlingMiddleware.js";
import { isAuthenticated } from "../Middleware/isAuthMiddleware.js";
import {
  createNewEvent,
  deleteEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
} from "../Controller/eventController.js";

const router = express.Router();

router
  .route("/")
  .get(asyncHandler(getAllEvents))
  .post(isAuthenticated, asyncHandler(createNewEvent));

router
  .route("/:id")
  .get(isAuthenticated, asyncHandler(getSingleEvent))
  .put(isAuthenticated, asyncHandler(updateEvent))
  .delete(isAuthenticated, asyncHandler(deleteEvent));

export default router;
