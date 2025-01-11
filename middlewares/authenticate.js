import jwt from "jsonwebtoken";
import { User } from "../models/User.js";


export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return; // Ensure the function exits after responding
  }

  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    console.error("SECRET_KEY is not defined in environment variables");
    res.status(500).json({ message: "Server configuration error" });
    return; // Ensure the function exits after responding
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);

    // Find the user associated with the token
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return; // Ensure the function exits after responding
    }

    // Attach the user to the request object
    req.user = { id: user.id, role: user.role};

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
    return; // Ensure the function exits after responding
  }
};
