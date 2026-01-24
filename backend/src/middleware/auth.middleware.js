import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import User from "../models/User.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No token provided",
      });
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized - User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized - Token expired" });
    }

    console.error("Error in protectRoute:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

