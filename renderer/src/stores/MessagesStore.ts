import { SnapshotIn, types, Instance } from "mobx-state-tree";
import { v4 } from "uuid";

export type MessagesStore = Instance<typeof MessagesStore>;
export type Message = SnapshotIn<typeof Message>;

export const Message = types.model({
  id: types.identifier,
  text: types.string,
  peerId: types.string,
  deleted: types.boolean,
});

export const MessagesStore = types
  .model({
    messages: types.array(Message),
  })
  .views((self) => ({
    get filteredMessages() {
      return self.messages.filter((message) => message.deleted);
    },
  }))
  .actions((self) => ({
    addMessage(message: { text: string; peerId: string }) {
      self.messages.push({
        id: v4(),
        text: message.text,
        peerId: message.peerId,
        deleted: false,
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
