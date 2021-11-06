import React, { useRef, forwardRef, useEffect } from "react";
import { observer } from "mobx-react";

import { Message } from "../Message";
import classes from "./MessagesList.module.scss";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

const MessagesListWithoutObserve = forwardRef<
  OverlayScrollbarsComponent,
  { store: any }
>(function (props, ref) {
  const { messages } = props.store;

  useEffect(() => {
    // @ts-ignore
    const osInstance = ref.current.osInstance();

    if (osInstance) {
      osInstance.scrollStop().scroll(
        {
          y: osInstance.scroll().max.y,
        },
        50
      );
    }
  });

  return (
    <OverlayScrollbarsComponent
      ref={ref}
      options={{
        overflowBehavior: {
          x: "hidden",
        },
      }}
      style={{ height: "100%", padding: "10px" }}
    >
      <div className={classes.messages_list}>
        {messages.map((message, index) => {
          return <Message key={message.id} message={message} />;
        })}
      </div>
    </OverlayScrollbarsComponent>
  );
});

export const MessagesList = observer(MessagesListWithoutObserve);
