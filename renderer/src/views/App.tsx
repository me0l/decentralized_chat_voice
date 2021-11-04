import React from "react";

import { Routes, Route } from "react-router-dom";

import { Messenger } from "./Messenger";
import { Profile } from "./Profile";
import { MessagesStore } from "../stores/MessagesStore";
import { Layout } from "./Layout";

export function App() {
  const store = MessagesStore.create({
    messages: [],
  });

  return (
    <div style={{ height: "100vh" }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/messenger" element={<Messenger store={store} />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

// <div style={{ width: "100%", height: "30px", padding: "10px" }}>
//     <input type="text" style={{ height: "100%", width: "100%" }} />
// </div>
// <div
//     style={{
//         display: "flex",
//         flexDirection: "column",
//         gap: "5px",
//         height: "100%",
//     }}
// >
//     <span>Николай Петрович</span>
//     <span>Николай Петрович</span>
//     <span>Николай Петрович</span>
//     <span>Николай Петрович</span>
//     <span>Николай Петрович</span>
//     <span>Николай Петрович</span>
//     <span>Николай Петрович</span>
//     <span>Николай Петрович</span>
//     <span>Николай Петрович</span>
//     <span>Николай Петрович</span>
// </div>
