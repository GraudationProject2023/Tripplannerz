import React, { useState, useEffect, useRef, useCallback } from "react";
import { createGlobalStyle, styled } from "styled-components";
import reset from "styled-reset";
import SockJs from "sockjs-client";
import StompJs from "stompjs";
import "./Chat.css";

const GlobalStyle = createGlobalStyle`
    ${reset}
  `;
//css가 초기화 된 component
const ChatWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const ChatContainer = styled.div`
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const ChatHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const MessageList = styled.div`
  height: 300px;
  max-height: 300px;
  overflow-y: auto;
`;

const Message = styled.div`
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: ${({ isMe }) => (isMe ? "#def3fc" : "#f5f5f5")};
`;

const MessageName = styled.b`
  color: ${({ isMe }) => (isMe ? "#007bff" : "#333")};
`;

const MessageText = styled.span`
  display: block;
  color: #333;
`;

const NameInput = styled.input`
  margin-left: 25%;
  text-align: center;
  flex: 1;
  padding: 8px;
  border: none;
  background-color: white;
`;

const SendButton = styled.button`
  margin-left: 80%;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  cursor: pointer;
`;
const MessageContainer = styled.div`
  display: flex;
  justify-content: ${({ isMe }) => (isMe ? "flex-end" : "flex-start")};
  margin-bottom: 10px;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 10px;
  border-radius: ${({ isMe }) =>
    isMe ? "10px 10px 0 10px" : "10px 10px 10px 0"};
  background-color: ${({ isMe }) => (isMe ? "#def3fc" : "#f5f5f5")};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

function ChatApi() {
  const [name, setName] = useState("TripPlannerz");
  const [chatt, setChatt] = useState([]);
  const [msg, setMsg] = useState("");
  const messageListRef = useRef(null);

  const roomId = "방 id";
  const sender_nick = "닉네임";
  const token = "토큰";

  const sock = new SockJs("서버주소");
  const stomp = StompJs.over(sock);

  const stompConnect = () => {
    try {
      stomp.debug = null;
      stomp.connect(
        {
          /*헤더 들어갈 부분*/
        },
        () => {
          stomp.subscribe(
            `서버주소`, //구독할 토픽 주소
            (data) => {
              const newMessage = JSON.parse(data.body);
              setChatt((prevChatt) => [...prevChatt, newMessage]);
            }
          );
        },
        (error) => {
          console.log("WebSocket 연결 에러: ", error);
        }
      );
    } catch (err) {
      console.log("Stomp 연결 에러: ", err);
    }
  };

  const stompDisConnect = () => {
    try {
      stomp.debug = null;
      stomp.disconnect(() => {
        console.log("WebSocket 연결 해제");
      });
    } catch (err) {
      console.error("Stomp 연결 해제 에러: ", err);
    }
  };

  const SendMessage = () => {
    stomp.debug = null;
    const data = {
      type: "TALK",
      roomId: roomId,
      sender: sender_nick,
      message: msg,
      createdAt: new Date().toISOString(),
    };
    stomp.send("/pub/chat/message", token, JSON.stringify(data));
    setMsg("");
  };

  useEffect(() => {
    stompConnect();

    return () => {
      stomp.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    SendMessage();
  };

  return (
    <>
      <GlobalStyle />
      <ChatWrapper>
        <ChatContainer>
          <ChatHeader>
            <NameInput
              placeholder="Enter your name"
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </ChatHeader>
          <hr />
          {new Date().toLocaleString().split("오")[0]}
          <MessageList ref={messageListRef}>
            {chatt.map((item, idx) => (
              <MessageContainer key={idx} isMe={item.name === name}>
                <MessageBubble isMe={item.name === name}>
                  <MessageName isMe={item.name === name}>
                    {item.name === name ? "" : item.name}
                  </MessageName>
                  <MessageText>{item.msg}</MessageText>
                  <br />
                  <span>{item.createdAt}</span>
                </MessageBubble>
              </MessageContainer>
            ))}
          </MessageList>
          <hr />
          <SendButton onClick={SendMessage}>Send</SendButton>
        </ChatContainer>
      </ChatWrapper>
      <div className="input_text">
        <input
          type="text"
          ref={messageListRef}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === "Enter"){
                SendMessage();
            }
          }}
        />
      </div>
    </>
  );
}

export default ChatApi;
