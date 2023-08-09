import React, { useState } from "react";

function ChatInput({ sendMessage }) {
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() !== "") {
      sendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={handleChange}
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default ChatInput;
