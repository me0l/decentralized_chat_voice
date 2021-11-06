import React from "react";

import { IUser } from "../../../../types/user";
import classes from "./User.module.scss";

export function User(props: { data: IUser }) {
  return (
    <div className={classes.user}>
      {props.data.avatar && (
        <img className={classes.avatar} src={props.data.avatar} alt="pizda" />
      )}
      <div className={classes.info}>
        <div>
          {props.data.nickname ? props.data.nickname : props.data.peerId}
        </div>

        <div
          style={{
            display: "flex",
            minWidth: 0,
          }}
        >
          <div className={classes.last_message}>{props.data.lastMessage}</div>
        </div>
      </div>
    </div>
  );
}
