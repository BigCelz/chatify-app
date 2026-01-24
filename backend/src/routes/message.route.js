import express from "express";
import { getAllContacts, getChatPartners, getMessageByUserId, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

//get contacts
router.get('/contacts',protectRoute, getAllContacts )

//get chat partners
router.get('/chats', protectRoute, getChatPartners);

//get messages by user id
router.get('/:id', protectRoute, getMessageByUserId);

//send message
router.post('/send/:id', protectRoute, sendMessage);


export default router;