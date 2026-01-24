import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.model.js";
import User from "../models/User.model.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json({
      message: "Contacts retrieved successfully✅",
      users: filteredUsers,
    });
  } catch (error) {
    console.error("Error getting all contacts:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Find all messages where the logged-in user is sender or receiver
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    }).sort({ createdAt: 1 }); // oldest → newest

    // Get unique IDs of chat partners
    const chatPartnersIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString(),
        ),
      ),
    ];

    // Fetch chat partner details
    const chatPartners = await User.find({
      _id: { $in: chatPartnersIds },
    }).select("-password");

    res.status(200).json({
      message: "Chat partners retrieved successfully✅",
      chatPartners,
    });
  } catch (error) {
    console.error("Error getting chat partners:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getMessageByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({
      message: "Messages retrieved successfully✅",
      messages,
    });
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Require at least text or image
    if (!text && !image) {
      return res.status(400).json({ message: "Text or Image required" });
    }

    // Prevent sending message to self
    if (senderId.equals(receiverId)) {
      return res.status(400).json({ message: "Cannot send message to yourself" });
    }

    // Check if receiver exists
    const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    // Upload image if present
    let imageUrl = "";
    if (image) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      } catch (err) {
        console.error("Cloudinary upload failed:", err);
        return res.status(500).json({ message: "Image upload failed" });
      }
    }

    const newMessage = new Message({ senderId, receiverId, text, image: imageUrl });
    await newMessage.save();

    res.status(201).json({
      message: "Message sent successfully ✅",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Server error" });
  }
};

