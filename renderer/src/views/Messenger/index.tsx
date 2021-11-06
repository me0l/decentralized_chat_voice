import React, { useRef, useState } from "react";

import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { observer } from "mobx-react";
import RGL, { WidthProvider } from "react-grid-layout";

import { ChatInputArea } from "../../components/ChatInputArea";
import { MessagesList } from "../../components/MessagesList";
import { Sidebar } from "../../components/Sidebar";

import classes from "./Messenger.module.scss";
import ContentEditable from "react-contenteditable";
import { Input } from "../../components/Input";
import { UsersBar } from "./components/UsersBar";
import { ChatHeader } from "./components/ChatHeader";

const Grid = WidthProvider(RGL);

function MessengerWithoutObserve(props: {
  onLayoutChange: (...args) => void;
  store?: any;
}) {
  const [html, setHTML] = useState("");

  const scrollbar = useRef<OverlayScrollbarsComponent>();

  return (
    <div className={classes.messenger}>
      <Sidebar
        style={{
          gap: "10px",
          width: "200px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "10px",
            borderBottom: "1px #1e1732 solid",
          }}
        >
          <Input
            html={html}
            placeholder="Поиск"
            onChange={(ev) => setHTML((ev.target as any).value)}
            toContainer={
              html !== "" && (
                <div onClick={() => setHTML("")} className={classes.close}>
                  <span>X</span>
                </div>
              )
            }
          />
        </div>

        <UsersBar
          users={[
            {
              avatar: "https://avatars.dicebear.com/api/bottts/me0l.svg",
              nickname: "dolbaeb",
              peerId: "pizda",
              lastMessage:
                "some message some message some messagesome message some message some messagesome message some message some messagesome message some message some message",
            },
            {
              avatar: "https://avatars.dicebear.com/api/bottts/me0l.svg",
              nickname: "dolbaeb",
              peerId: "pizda",
              lastMessage:
                "some message some message some messagesome message some message some messagesome message some message some messagesome message some message some message",
            },
            {
              avatar: "https://avatars.dicebear.com/api/bottts/me0l.svg",
              nickname: "dolbaeb",
              peerId: "pizda",
              lastMessage:
                "some message some message some messagesome message some message some messagesome message some message some messagesome message some message some message",
            },
            {
              avatar: "https://avatars.dicebear.com/api/bottts/me0l.svg",
              nickname: "dolbaeb",
              peerId: "pizda",
              lastMessage:
                "some message some message some messagesome message some message some messagesome message some message some messagesome message some message some message",
            },
            {
              avatar: "https://avatars.dicebear.com/api/bottts/me0l.svg",
              nickname: "dolbaeb",
              peerId: "pizda",
              lastMessage:
                "some message some message some messagesome message some message some messagesome message some message some messagesome message some message some message",
            },
            {
              avatar: "https://avatars.dicebear.com/api/bottts/me0l.svg",
              nickname: "dolbaeb",
              peerId: "pizda",
              lastMessage:
                "some message some message some messagesome message some message some messagesome message some message some messagesome message some message some message",
            },
            {
              avatar: "https://avatars.dicebear.com/api/bottts/me0l.svg",
              nickname: "dolbaeb",
              peerId: "pizda",
              lastMessage:
                "some message some message some messagesome message some message some messagesome message some message some messagesome message some message some message",
            },
            {
              avatar: "https://avatars.dicebear.com/api/bottts/me0l.svg",
              nickname: "dolbaeb",
              peerId: "pizda",
              lastMessage:
                "some message some message some messagesome message some message some messagesome message some message some messagesome message some message some message",
            },
            {
              avatar: "https://avatars.dicebear.com/api/bottts/me0l.svg",
              nickname: "dolbaeb",
              peerId: "pizda",
              lastMessage:
                "some message some message some messagesome message some message some messagesome message some message some messagesome message some message some message",
            },
            {
              avatar: "https://avatars.dicebear.com/api/bottts/me0l.svg",
              nickname: "dolbaeb",
              peerId: "pizda",
              lastMessage:
                "some message some message some messagesome message some message some messagesome message some message some messagesome message some message some message",
            },
            {
              avatar: "https://avatars.dicebear.com/api/bottts/me0l.svg",
              nickname: "dolbaeb",
              peerId: "pizda",
              lastMessage:
                "some message some message some messagesome message some message some messagesome message some message some messagesome message some message some message",
            },
            {
              avatar: "https://avatars.dicebear.com/api/bottts/me0l.svg",
              nickname: "dolbaeb",
              peerId: "pizda",
              lastMessage:
                "some message some message some messagesome message some message some messagesome message some message some messagesome message some message some message",
            },
            {
              avatar: "https://avatars.dicebear.com/api/bottts/me0l.svg",
              nickname: "dolbaeb",
              peerId: "pizda",
              lastMessage:
                "some message some message some messagesome message some message some messagesome message some message some messagesome message some message some message",
            },
            {
              avatar: "https://avatars.dicebear.com/api/bottts/me0l.svg",
              nickname: "dolbaeb",
              peerId: "pizda",
              lastMessage:
                "some message some message some messagesome message some message some messagesome message some message some messagesome message some message some message",
            },
            {
              avatar: "https://avatars.dicebear.com/api/bottts/me0l.svg",
              nickname: "dolbaeb",
              peerId: "pizda",
              lastMessage:
                "some message some message some messagesome message some message some messagesome message some message some messagesome message some message some message",
            },
          ]}
        />
      </Sidebar>
      <div className={classes.chat}>
        <ChatHeader
          user={{
            avatar: "https://avatars.dicebear.com/api/bottts/me0l.svg",
            nickname: "dolbaeb",
            peerId: "pizda",
          }}
        />
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
      <Sidebar>сайдбар</Sidebar>
    </div>
  );
}

export const Messenger = observer(MessengerWithoutObserve);
