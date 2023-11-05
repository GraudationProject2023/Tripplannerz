import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from 'react-redux'
import store from './store/store'
import { RecoilRoot } from "recoil";
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <Provider store={store}>
      <App />
    </Provider>
  </RecoilRoot>
);
