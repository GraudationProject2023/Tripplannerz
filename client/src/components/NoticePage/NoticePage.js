import React, { useState, useEffect, useRef } from "react";
import NavBar from "../Navbar/Navbar";
import "./NoticePage.css";
import warning from "../Image/warning.png";

function NullNotice() {
  return (
    <div className="null-warn">
      <img
        style={{ width: "100px", height: "100px" }}
        src={warning}
        alt="warning"
      />
      <h2>수신된 알림이 없습니다.</h2>
    </div>
  );
}

function useUpdateEffect(callback, deps) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      // 첫 번째 렌더링 때는 실행하지 않고,
      isFirstRender.current = false;
    } else {
      // 두 번째 이후 렌더링 때에만 실행합니다.
      callback();
    }
  }, deps);
}

function NoticePage() {
  const url = "";

  const [notice, setNotice] = useState([]);
  const [listening, setListening] = useState(false);
  const [data, setData] = useState([]);
  const [value, setValue] = useState(null);

  const [meventSource, msetEventSource] = useState(undefined);

  let eventSource = undefined;

  useEffect(() => {
    console.log("매번 실행되는지");
    console.log("listening", listening);

    if (!listening) {
      eventSource = new EventSource("http://localhost:8080/sse"); //구독

      //msetEventSource(new EventSource("http://localhost:8088/sse"));

      msetEventSource(eventSource);

      //Custom listener
      // eventSource.addEventListener("Progress", (event) => {
      //   const result = JSON.parse(event.data);
      //   console.log("received:", result);
      //   setData(result)
      // });

      console.log("eventSource", eventSource);

      eventSource.onopen = (event) => {
        console.log("connection opened");
      };

      eventSource.onmessage = (event) => {
        console.log("result", event.data);
        setData((old) => [...old, event.data]);
        setValue(event.data);
      };

      eventSource.onerror = (event) => {
        console.log(event.target.readyState);
        if (event.target.readyState === EventSource.CLOSED) {
          console.log("eventsource closed (" + event.target.readyState + ")");
        }
        eventSource.close();
      };

      setListening(true);
    }

    return () => {
      eventSource.close();
      console.log("eventsource closed");
    };
  }, []);

  useUpdateEffect(() => {
    console.log("data: ", data);
  }, [data]);

  const checkData = () => {
    console.log(data);
  };

  return (
    <div>
      <NavBar />
      <div className="profile-card">
        {notice.length === 0 ? <NullNotice /> : ""}
      </div>
      <div className="App">
        <button onClick={checkData}>확인</button>
        <header className="App-header">
          <div style={{ backgroundColor: "white" }}>
            Received Data
            {data.map((d, index) => (
              <span key={index}>{d}</span>
            ))}
          </div>
        </header>
        <div>value: {value}</div>
      </div>
    </div>
  );
}

export default NoticePage;
