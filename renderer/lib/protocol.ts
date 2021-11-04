import PeerJS, { DataConnection } from "peerjs";
import { EventEmitter } from "events";

export class NeetPeer extends EventEmitter {
  private contacts = new Map<string, DataConnection>();
  private neetSocket: NeetSocket;
  private publicKey: string;
  private privateKey: string;

  constructor(
    username: string,
    { privateKey, publicKey }: { publicKey: string; privateKey: string }
  ) {
    super();
    this.neetSocket = new NeetSocket(this, username);

    this.on("connection", (conn) => {
      if (this.contacts.has(conn.peer)) return;
      this.contacts.set(conn.peer, conn);
    });

    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  getAllContacts() {
    return Array.from(this.contacts.keys());
  }

  sendTo(target: string, data: any) {
    this.contacts.get(target).send(data);
  }

  connect(target: string) {
    if (this.contacts.has(target)) return;
    const conn = this.neetSocket.connect(target);
    this.contacts.set(target, conn);

    return conn;
  }
}

export class NeetSocket {
  private socket: PeerJS;
  private readonly peer: NeetPeer;

  constructor(peer: NeetPeer, id: string) {
    this.socket = new PeerJS(id);
    this.peer = peer;

    this.socket.on("open", (ev) => this.onOpen(ev));
    this.socket.on("connection", (ev) => this.onConnection(ev));
  }

  onOpen(data: string) {
    this.peer.emit("open", data);
  }

  onConnection(data: DataConnection) {
    this.peer.emit("connection", data);
  }

  connect(target: string) {
    return this.socket.connect(target);
  }
}
