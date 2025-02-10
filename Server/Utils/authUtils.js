import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CustomAppError } from './CustomErrorClass.js';

const secretKey = process.env.SECRET_KEY;
const saltRounds = 12;

// Hash a password
export async function hashPassword(password) {
  if (!password) {
    throw new CustomAppError(400, "Password is empty or undefined");
  }
  try {
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    throw new CustomAppError(500, "Error hashing password");
  }
}

// Verify a password
export async function verifyPassword(password, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      throw new CustomAppError(401, "Incorrect password");
    }
    return isMatch;
  } catch (error) {
    throw new CustomAppError(500, "Error verifying password");
  }
}

// Generate a JWT token
export function generateToken(userId, userEmail) {
  if (!secretKey) {
    throw new CustomAppError(500, "JWT Secret Key is not defined");
  }
  try {
    return jwt.sign({ userId, userEmail }, secretKey, { expiresIn: '1d' });
  } catch (error) {
    throw new CustomAppError(500, "Error generating token");
  }
}

// Verify a JWT token
export function verifyToken(token) {
  if (!token) {
    throw new CustomAppError(401, "Token is missing");
  }
  if (!secretKey) {
    throw new CustomAppError(500, "JWT Secret Key is not defined");
  }
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new CustomAppError(401, "Invalid or expired token");
  }
}
