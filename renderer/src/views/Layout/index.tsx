import React from "react";

import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div
        style={{
          display: "flex",
          gap: "5px",
          margin: 0,
          bottom: "50px",
          width: "200px",
          height: "50px",
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          zIndex: 999,
        }}
      >
        <Link to="/profile">Профиль</Link>
        <Link to="/messenger">Сообщения</Link>
      </div>
      <Outlet />
    </div>
  );
}
