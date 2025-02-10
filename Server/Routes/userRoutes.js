import express from "express";
import { asyncHandler } from "../Middleware/ErrorHandlingMiddleware.js";
import { isAuthenticated } from "../Middleware/isAuthMiddleware.js";
import {
  getUserInfo,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../Controller/userController.js";

const router = express.Router();

// router.get("/", (req, res) => {
//   res.json({ message: "User Routes", req: req });
// });

router.post("/register", asyncHandler(registerUser));
router.post("/login", asyncHandler(loginUser));
router.get("/me", isAuthenticated, asyncHandler(getUserInfo));
router.patch("/", isAuthenticated, asyncHandler(updateUser));
router.get("/logout", asyncHandler(logoutUser));

export default router;
