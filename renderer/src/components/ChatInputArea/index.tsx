import React, { useState, KeyboardEvent } from "react";
import { observer } from "mobx-react";
import { compile } from "html-to-text";

import ContentEditable from "react-contenteditable";
import { IoSend } from "react-icons/io5";

import classes from "./ChatInputArea.module.scss";
import { MessagesStore } from "../../stores/MessagesStore";
import { IMessage } from "../../types/message";

interface ChatInputAreaProps {
  store: MessagesStore;
  onMessage?: (ev: { message: IMessage }) => void;
}

function ChatInputAreaWithoutObserve(props: ChatInputAreaProps) {
  const [value, setValue] = useState("");

  const { addMessage } = props.store;

  const htmlToText = (html: string) => {
    const compiler = compile();
    return compiler(html);
  };

  const sendMessage = ({ text, ...message }: IMessage) => {
    if (text !== "") {
      const payload = { text: htmlToText(text).trim(), ...message };
      addMessage(payload);
      if (props.onMessage)
        setTimeout(() => props.onMessage({ message: payload }), 100);
      setValue("");
    }
  };

  const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      const text = (event.target as unknown as any).innerHTML;
      event.preventDefault();
      event.stopPropagation();

      sendMessage({
        text: text,
        from: { peerId: Math.random() > 0.5 ? "12049120421" : "" },
        time: Date.now(),
      });

      return false;
    }
  };

  return (
    <div className={classes.chat_input_area}>
      <div
        style={{
          padding: "10px",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ContentEditable
          html={value}
          data-placeholder="Введите сообщение..."
          className={classes.chat_input_area__input}
          onKeyPress={onKeyPress}
          onChange={(ev) => setValue((ev.target as unknown as any).value)}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "50px",
          height: "50px",
        }}
      >
        <a
          className={classes.chat_input_area__button}
          onClick={(ev) => {
            ev.preventDefault();
            return sendMessage({
              text: htmlToText(value),
              from: { peerId: Math.random() > 0.5 ? "12049120421" : "" },
              time: Date.now(),
            });
          }}
          href="#"
        >
          <IoSend />
        </a>
      </div>
    </div>
  );
}

export const ChatInputArea = observer(ChatInputAreaWithoutObserve);
