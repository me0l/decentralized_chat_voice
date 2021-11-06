import React from "react";

import { Link } from "react-router-dom";
import { RiMessage3Line, RiUser6Line } from "react-icons/all";

import classes from "./REBar.module.scss";

export function REBar() {
  return (
    <div className={classes.rebar}>
      <Link to="/profile">
        <RiUser6Line />
      </Link>
      <Link to="/messenger">
        <RiMessage3Line />
      </Link>
    </div>
  );
}
