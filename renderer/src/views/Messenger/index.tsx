import React, { useRef } from "react";

import { ChatInputArea } from "../../components/ChatInputArea";
import { MessagesList } from "../../components/MessagesList";

import classes from "./Messenger.module.scss";
import { observer } from "mobx-react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

function MessengerWithoutObserve(props: { store?: any }) {
  const scrollbar = useRef<OverlayScrollbarsComponent>();

  return (
    <div className={classes.messenger}>
      <div className={classes.chat}>
        <MessagesList ref={scrollbar} store={props.store} />
        <ChatInputArea
          onMessage={() => {
            const osInstance = scrollbar.current!.osInstance();

            if (osInstance) {
              osInstance.scrollStop().scroll(
                {
                  y: osInstance.scroll().max.y,
                },
                1000,
                "easeOutQuart"
              );
            }
          }}
          store={props.store}
        />
      </div>
      <div className={classes.side_bar}>сайдбар</div>
    </div>
  );
}

export const Messenger = observer(MessengerWithoutObserve);
