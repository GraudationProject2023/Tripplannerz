import React, { useState, useEffect, useRef, useCallback } from "react";
import { createGlobalStyle, styled } from "styled-components";
import reset from "styled-reset";
import "./Chat.css";

const Chat = () => {
  let time = new Date().toLocaleString().split(" ")[3] +" "+ new Date().toLocaleString().split(" ")[4].split(":")[0]+":" + new Date().toLocaleString().split(" ")[4].split(":")[1];
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("TripPlannerz");
  const [chatt, setChatt] = useState([]);
  const [checkLog, setCheckLog] = useState(true); 
  const [socketData, setSocketData] = useState();

  const messageListRef = useRef(null);
  const onText = (e) => {
    setMsg(e.target.value);
  };
  
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [chatt, msg]);

  const ws = useRef(null); //websocket을 담는 변수, 컴포넌트가 변경될 때 객체가 유지될 수 있도록 ref로 저장

  const msgBox = chatt.map((item, idx) => (
    <div key={idx} className={item.name === name ? "me" : "other"}>
      <span>
        <b>{item.name}</b>
      </span>
      <span>{item.msg}</span>
    </div>
  ));

  useEffect(() => {
    if (socketData !== undefined) {
      const tempData = chatt.concat(socketData);
      console.log(tempData);
      setChatt(tempData);
    }
  }, [socketData]);

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

  

  const webSocketLogin = useCallback(() => {
    ws.current = new WebSocket("");

    ws.current.onmessage = (message) => {
      const dataSet = JSON.parse(message.data);
      setSocketData(dataSet);
    };
  });

  const send = () => {
    if (msg !== "") {
      const data = {
        name,
        msg,
        date: time,
      };

      setChatt([...chatt, data]); // Add the new message to the mock data
      messageListRef.current.focus();
    } else {
      alert("Message cannot be empty.");
      document.getElementById("msg").focus();
      return;
    }

    setMsg("");
  };

  function keyPress(event) {
    if (event.key === "Enter") {
      send();
    }
    
  }

  useEffect(() => {
    if (checkLog) {
      // Mock data for testing
      const mockData = [
        {
          name: "TripPlannerz",
          msg: "Hello there!",
          date: time,
        },
        {
          name: "John",
          msg: "Hi, TripPlannerz!",
          date: time,
        },
      ];

      setChatt(mockData);
    }
  }, [checkLog]);

  //   const send = useCallback(() => {
  //     if(!chkLog) {
  //         if(name === "") {
  //             alert("이름을 입력하세요.");
  //             document.getElementById("name").focus();
  //             return;
  //         }
  //         webSocketLogin();
  //         setChkLog(true);
  //     }

  //     if(msg !== ''){
  //         const data = {
  //             name,
  //             msg,
  //             date: new Date().toLocaleString(),
  //         };  //전송 데이터(JSON)

  //         const temp = JSON.stringify(data);

  //         if(ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
  //             ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
  //                 console.log(ws.current.readyState);
  //                 ws.current.send(temp);
  //             }
  //         }else {
  //             ws.current.send(temp);
  //         }
  //     }else {
  //         alert("메세지를 입력하세요.");
  //         document.getElementById("msg").focus();
  //         return;
  //     }
  //     setMsg("");
  // });

  return (
    <>
      <GlobalStyle />
      <ChatWrapper>
        <ChatContainer>
          <ChatHeader>
            <NameInput
              disabled={checkLog}
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
                  <span>{item.date}</span>
                </MessageBubble>
              </MessageContainer>
            ))}
          </MessageList>
          <hr />
          <SendButton onClick={send}>Send</SendButton>
        </ChatContainer>
      </ChatWrapper>
      <div className="input_text">
        <input
          type="text"
          ref={messageListRef}
          value={msg}
          onChange={onText}
          onKeyDown={keyPress}
        />
      </div>
    </>
  );
};

export default Chat;
