import React from "react";
import { observer } from "mobx-react";

import classes from "./ChatHeader.module.scss";
import { IUser } from "../../../../types/user";

function ChatHeaderWithoutObserve(props: { user: IUser }) {
  return (
    <div className={classes.chat__header}>
      <div style={{ display: "flex" }}>
        {props.user.avatar && (
          <img
            src={props.user.avatar}
            alt=""
            className={classes.user_info__avatar}
          />
        )}
        <div className={classes.user_info}>
          <span className={classes.user_info__name}>
            {props.user.nickname ? props.user.nickname : props.user.peerId}
          </span>
          <span className={classes.user_info__status}>Недавно</span>
        </div>
      </div>
      <div className={classes.user_actions}>Позвонить тут типа будет</div>
    </div>
  );
}

export const ChatHeader = observer(ChatHeaderWithoutObserve);
