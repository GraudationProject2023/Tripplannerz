import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { eventSource } from "../../util/recoilState";
import { notificationsCountState } from "../../util/recoilState";
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

  const [data, setData] = useState([]);
  const [value, setValue] = useState(null);
  const [listening, setListening] = useState(false);
  const [notificationsCount, setNotificationsCount] = useRecoilState(
    notificationsCountState
  );

  useEffect(() => {
    if (!listening) {
      eventSource.onopen = (event) => {
        console.log("connection opened");
      };

      eventSource.onmessage = (event) => {
        console.log("result", event.data);
        setData((old) => [...old, event.data]);
        setValue(event.data);
        setNotificationsCount((prevCount) => prevCount + 1);
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
  }, [listening, setNotificationsCount]);

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
        {data.length === 0 ? (
          <NullNotice />
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default NoticePage;
