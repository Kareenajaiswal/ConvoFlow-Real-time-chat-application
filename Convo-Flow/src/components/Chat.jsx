// src/components/Chat.js
//socket testing are
import React, { useEffect, useState } from "react";
import socket from "../socketService";

const Chat = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Join the chat room when the component mounts
    socket.emit("joinRoom", chatId);

    // Listen for incoming messages
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.off("message");
    };
  }, [chatId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Send a new message
      socket.emit("newMessage", { chatId, content: newMessage });
      setNewMessage("");
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
