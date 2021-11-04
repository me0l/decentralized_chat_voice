import React from "react";
import { observer } from "mobx-react";

import classes from "./Message.module.scss";

function MessageWithoutObserve(props: { text: string; peerId: string }) {
  return (
    <div
      className={
        classes.message + " " + (props.peerId !== "" ? classes.message__me : "")
      }
    >
      {props.text}
    </div>
  );
}

export const Message = observer(MessageWithoutObserve);
