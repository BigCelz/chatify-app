import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import cloudinary from "../lib/cloudinary.js";
import { ENV } from "../lib/env.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    let { fullName, email, password } = req.body;

    // normalize input
    fullName = fullName?.toString().trim() || "";
    email = email?.toString().trim().toLowerCase() || "";
    password = password?.toString() || "";

    // validation
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // stricter email regex
    const emailRegex =
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // generate token
    generateToken(newUser._id, res);

    // send welcome email
    try {
      await sendWelcomeEmail(newUser.email, newUser.fullName, ENV.CLIENT_URL);
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
    }

    // respond to client
    res.status(201).json({
      message: "User created successfully ✅",
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      },
    });
  } catch (error) {
    console.error("Error in signing up:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and Password are required",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        message: "Invalid credentials",
      });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({
        message: "Invalid credentials",
      });

    generateToken(user._id, res);

    res.status(200).json({
      message: "Logged in Successfuly✅",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    sameSite: "strict",
    secure: ENV.NODE_ENV !== "development",
    path: "/",
  };

  res.clearCookie("jwt", cookieOptions);

  res.status(200).json({
    message: "Logged out successfully✅",
  });
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture required" });
    }

    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    if (!uploadResponse?.secure_url) {
      return res.status(500).json({ message: "Failed to upload image" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully ✅",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error in updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
