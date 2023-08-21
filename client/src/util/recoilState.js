import { atom } from "recoil";

export const notificationsCountState = atom({
  key: "notificationsCountState",
  default: 0,
});

export const eventSource = atom({
  key: "eventSource",
  default: new EventSource(`http://localhost:8080/api/sub`),
});
