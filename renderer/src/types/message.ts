import { IUser } from "./user";

export interface IMessage {
  from: IUser;
  text: string;
  time: number;
}
