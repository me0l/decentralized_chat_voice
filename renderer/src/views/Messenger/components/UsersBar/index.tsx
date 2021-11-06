import React from "react";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

import { User } from "../User";
import { IUser } from "../../../../types/user";

import classes from "./UserBar.module.scss";

export function UsersBar(props: { users: IUser[] }) {
  return (
    <OverlayScrollbarsComponent style={{ height: "100%" }}>
      <div className={classes.usersbar}>
        {props.users.map((user) => (
          <User data={user} />
        ))}
      </div>
    </OverlayScrollbarsComponent>
  );
}
