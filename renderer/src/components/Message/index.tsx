import React from "react";
import { observer } from "mobx-react";

import classes from "./Message.module.scss";
import { IMessage } from "../../types/message";

function MessageWithoutObserve({ message }: { message: IMessage }) {
  const time = new Date(message.time);
  return (
    <div
      data-time={`${time.getHours()}:${time.getMinutes()}`}
      className={
        classes.message +
        " " +
        (message.from.peerId !== "" ? classes.message__me : "")
      }
    >
      {message.text}
    </div>
  );
}

export const Message = observer(MessageWithoutObserve);
