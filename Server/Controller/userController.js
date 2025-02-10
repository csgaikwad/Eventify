import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";
import config from "../Config/config.js";
import { hashPassword } from "../Utils/authUtils.js";

/* User Register */

export const registerUser = async (req, res, next) => {
  const { userEmail, password, userName } = req.body;
  const hashedPassword = await hashPassword(password);
  const userDoc = await User.create({
    userEmail,
    password: hashedPassword,
    userName,
  });
  res.status(201).json({ message: "User registered successfully" });
};

/* User Login */

export const loginUser = async (req, res, next) => {
  const { userEmail, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ userEmail });
  if (!user) return res.status(404).json({ error: "User not found" });

  // Verify password
  const passwordVerified = await bcrypt.compare(password, user.password);
  if (!passwordVerified)
    return res.status(401).json({ error: "Incorrect password" });

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, userEmail: user.userEmail },
    config.secrets.jwtSecret
  );
  res
    .cookie("jwt", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .status(201)
    .json({
      user: {
        id: user._id,
        email: user.userEmail,
        userName: user.userName,
      },
      message: "User logged in successfully",
    });
};

/* Update Username */

export const updateUser = async (req, res, next) => {
  // console.log(req)
  const user = req.user;
  const { username } = req.body;
  const result = await User.updateOne(
    { _id: user.id },
    { $set: { username } },
    { upsert: true } // Create document if it doesn't exist
  );

  res.status(200).json({ user: result });
};

/* Get User Info */

export const getUserInfo = async (req, res, next) => {
  const user = req.user;
  const result = await User.findOne({ _id: user.id });
  res.status(200).json({
    user: {
      id: result._id,
      email: result.userEmail,
      userName: result.userName,
    },
  });
};

/* User Logout */

export const logoutUser = async (req, res, next) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "User logged out successfully" });
};
