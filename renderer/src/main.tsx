// import { createPeer } from "../lib/user";
// import { NeetPeer } from "../lib/protocol";
//
// const username = document.querySelector("#username");
// const password = document.querySelector("#password");
// const connectTarget = document.querySelector("#connect_target");
// const submitButton = document.querySelector("#submit");
// const sendAny = document.querySelector("#send_any");
//
// let peer: NeetPeer;
//
// sendAny.addEventListener("click", (ev) => {
//   console.log(peer.getAllContacts());
//   const contact = peer.getAllContacts()[0];
//   peer.sendTo(contact, "pizda");
// });
//
// submitButton.addEventListener("click", (ev) => {
//   console.log(username, password, submitButton);
//   const connectId = (<any>connectTarget).value;
//   const usernameStr = (<any>username).value;
//   const passwordStr = (<any>password).value;
//
//   if (usernameStr) {
//     peer = createPeer(usernameStr, passwordStr);
//
//     peer.on("connection", (conn) => {
//       conn.on("data", (data) => console.log(data));
//     });
//   }
//   if (connectId) {
//     const conn = peer.connect(connectId);
//
//     conn.on("open", () => {
//       conn.on("data", console.log);
//     });
//   }
// });
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { App } from "./views/App";

import "overlayscrollbars/css/OverlayScrollbars.css";
import "./global.module.scss";

interface Chat {
  sendMessage: () => Promise<any>;
}

declare global {
  interface Window {
    chat?: Chat;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("app")
);
