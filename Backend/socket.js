const { Server } = require("socket.io");

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Your frontend URL
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Join a specific chat room
    socket.on("joinRoom", (chatId) => {
      socket.join(chatId);
      console.log(`User ${socket.id} joined chat room ${chatId}`);
    });

    // Listen for new messages
    socket.on("newMessage", async ({ chatId, content }) => {
      // Assuming you have a function to save the message in the database
      const message = await saveMessage(chatId, content, socket.id);

      // Broadcast the message to others in the room
      io.to(chatId).emit("message", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

// Function to save a message in the database
const saveMessage = async (chatId, content, senderId) => {
  const message = await Message.create({
    chatId,
    sender: senderId,
    content,
  });

  await Chat.updateOne(
    { _id: chatId },
    { lastMessage: content, lastMessageTime: message.timestamp }
  );

  return message;
};

module.exports = { initializeSocket };