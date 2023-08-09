import React from "react";

function ChatList({ messages }) {
  return (
    <div className="chat-image">
      <ul className="chat-list">
        {messages.map((message, index) => (
          <div>
            <li
              key={index}
              style={{
                border: "1px solid black",
                borderRadius: "15px",
                width: "200px",
                backgroundColor: "skyblue",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* <div className="sender">{message.sender}</div> */}
              <div className="message">{message.text}</div>
              <div className="timestamp" style={{ marginLeft: "100px" }}>
                {message.timestamp.toLocaleString().substr(12, 19)}
              </div>
            </li>
            <br />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ChatList;
