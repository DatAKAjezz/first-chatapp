import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: { $ne: loggedInUserId }}).select("-password")
        res.status(200).json(filteredUsers)

    } catch (error) {
        console.log("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const getMessages = async (req, res) => {
    try {
        
        const UserToChatId = req.params.id;
        const senderId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId: senderId, receiverId: UserToChatId},
                {senderId: UserToChatId, receiverId: senderId}
            ]
        })

        // console.log(senderId + " " + UserToChatId);
        
        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages: ", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const sendMessage = async (req, res) => {
    try {
        const {text, image} = req.body;

        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl = undefined;

        if (image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId, 
            receiverId,
            text,
            image: imageUrl
        })

        await newMessage.save();

        // realtime functionality
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage: ", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}