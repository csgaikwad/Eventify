import { verifyToken } from '../Utils/authUtils.js';
import { CustomAppError } from '../Utils/CustomErrorClass.js';

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new CustomAppError(401, "No token provided. Authentication failed.");
    }

    const decoded = verifyToken(token);
    req.user = decoded;  // Attaching decoded user data to request object

    next();
  } catch (error) {
    next(error);
  }
};
