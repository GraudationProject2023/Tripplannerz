import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export const notificationsCountState = atom({
  key: "notificationsCountState",
  default: 0,
});

const { persistAtom } = recoilPersist({
  key: "eventSourceLocal",
  storage: localStorage,
});

const { persistTokenAtom } = recoilPersist({
  key: "token-received",
  storage: localStorage,
});


export const token = atom({
  key: "token",
  default: undefined,
  effects_UNSTABLE: [persistTokenAtom],
});


export const eventSource = atom({
  key: "eventSource",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const comment = atom({
  key: "comment",
  default: '',
})

