import React from "react";

import { Link, Outlet } from "react-router-dom";
import { RiMessage3Line, RiUser6Line } from "react-icons/all";
import { REBar } from "./components/REBar";

export function Layout() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <REBar />
      <Outlet />
    </div>
  );
}
