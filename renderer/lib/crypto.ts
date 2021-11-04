import nacl from "tweetnacl";

export interface IEncryptedMsg {
  ciphertext: string;
  ephemPubKey: string;
  nonce: string;
  version: string;
}

export function encrypt(
  receiverPublicKey: string,
  senderKeypair: { publicKey: any; secretKey: any },
  msgParams: string
) {
  const pubKeyUInt8Array = Buffer.from(receiverPublicKey, "base64");
  const msgParamsUInt8Array = Buffer.from(msgParams, "utf8");
  const nonce = nacl.randomBytes(nacl.box.nonceLength);
  const encryptedMessage = nacl.box(
    msgParamsUInt8Array,
    nonce,
    pubKeyUInt8Array,
    senderKeypair.secretKey
  );

  return {
    ciphertext: Buffer.from(encryptedMessage).toString("base64"),
    ephemPubKey: Buffer.from(senderKeypair.publicKey).toString("base64"),
    nonce: Buffer.from(nonce).toString("base64"),
    version: "x25519-xsalsa20-poly1305",
  };
}

export function decrypt(
  receiverSecretKey: string,
  encryptedData: IEncryptedMsg
) {
  const receiverSecretKeyUint8Array = Buffer.from(receiverSecretKey, "base64");
  const nonce = Buffer.from(encryptedData.nonce, "base64");
  const ciphertext = Buffer.from(encryptedData.ciphertext, "base64");
  const ephemPubKey = Buffer.from(encryptedData.ephemPubKey, "base64");
  const decryptedMessage = nacl.box.open(
    ciphertext,
    nonce,
    ephemPubKey,
    receiverSecretKeyUint8Array
  );
  return Buffer.from(decryptedMessage).toString("utf8");
}
