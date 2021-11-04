import React, { useState, KeyboardEvent } from "react";
import { observer } from "mobx-react";

import ContentEditable from "react-contenteditable";

import classes from "./ChatInputArea.module.scss";
import { MessagesStore } from "../../stores/MessagesStore";

interface Message {
  text: string;
  peerId: string;
}

interface ChatInputAreaProps {
  store: MessagesStore;
  onMessage?: (ev: { message: Message }) => void;
}

function ChatInputAreaWithoutObserve(props: ChatInputAreaProps) {
  const [value, setValue] = useState("");

  const { addMessage } = props.store;

  const sendMessage = (message: Message) => {
    if (message.text !== "") {
      addMessage(message);
      if (props.onMessage) setTimeout(() => props.onMessage({ message }), 100);
      setValue("");
    }
  };

  const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      const text = (event.target as unknown as any).innerHTML.replaceAll(
        "<br>",
        "\n"
      );
      event.preventDefault();
      event.stopPropagation();

      sendMessage({
        text,
        peerId: Math.random() > 0.5 ? "12049120421" : "",
      });

      return false;
    }
  };

  return (
    <div className={classes.chat_input_area}>
      <ContentEditable
        html={value}
        className={classes.chat_input_area__input}
        onKeyPress={onKeyPress}
        onChange={(ev) => setValue((ev.target as unknown as any).value)}
      />

      <div>
        <button
          onClick={() =>
            sendMessage({
              text: value,
              peerId: Math.random() > 0.5 ? "12049120421" : "",
            })
          }
        >
          Отправить
        </button>
      </div>
    </div>
  );
}

export const ChatInputArea = observer(ChatInputAreaWithoutObserve);
