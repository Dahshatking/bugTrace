// middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "Access Denied: No token provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user details (excluding password)
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ msg: "Access Denied: User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Session expired. Please log in again." });
    }
    res.status(401).json({ msg: "Invalid token." });
  }
};

export default auth;
