import React, { useState, useEffect } from "react";
import ChatList from "./ChatList";
import ChatInput from "./ChatInput";
import UserList from "./UserList";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:4000";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const socket = socketIOClient(ENDPOINT);
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("connect", () => {
      console.log("Connected to WebSocekt server!");
    });
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    socket.on("users", (users) => {
      setUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const sendMessage = (message) => {
    const newMessage = { text: message, sender: "me", timestamp: new Date() };
    setMessages([...messages, newMessage]);
    socket.emit("message", newMessage);
  };

  return (
    <div className="chat">
      <UserList users={users} />
      <div className="chat-container">
        <ChatList messages={messages} />
        <ChatInput sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;
