import nacl from "tweetnacl";
import { NeetPeer } from "./protocol";

export function createPeer(username: string, password: string) {
  // const seed = Buffer.from(password, "utf8");
  const { secretKey, publicKey } = nacl.sign.keyPair();

  return new NeetPeer(username, {
    publicKey: Buffer.from(publicKey).toString("base64"),
    privateKey: Buffer.from(secretKey).toString("base64"),
  });
}
