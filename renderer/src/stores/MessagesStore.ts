import { SnapshotIn, types, Instance } from "mobx-state-tree";
import { v4 } from "uuid";
import { IMessage } from "../types/message";

export type MessagesStore = Instance<typeof MessagesStore>;
export type Message = SnapshotIn<typeof Message>;

export const User = types.model({
  peerId: types.identifier,
  nickname: types.maybeNull(types.string),
  avatar: types.maybeNull(types.string),
});

export const Message = types.model({
  id: types.identifier,
  text: types.string,
  from: User,
  time: types.number,
});

export const MessagesStore = types
  .model({
    messages: types.array(Message),
  })
  .views((self) => ({
    get filteredMessages() {
      return self.messages;
    },
  }))
  .actions((self) => ({
    addMessage(message: IMessage) {
      self.messages.push({
        id: v4(),
        text: message.text,
        from: message.from,
        time: message.time,
      });
    },
  }));

//
// export class Message {
//   @observable id: string = v4();
//   @observable text: string;
//   @observable peerId: string;
//   @observable deleted: boolean = false;
//
//   constructor(text: string, peerId: string) {
//     this.text = text;
//     this.peerId = peerId;
//   }
// }
//
// export class MessagesStore {
//   @observable messages: Message[] = [];
//
//   @action addMessage = (message: { text: string; peerId: string }) => {
//     this.messages.push(new Message(message.text, message.peerId));
//     console.log(this.messages);
//   };
//
//   @computed get filteredMessages() {
//     return this.messages.filter((message) => !message.deleted);
//   }
// }
