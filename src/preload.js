const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("chat", {
  sendMessage: async (peerId, message) => {
    await ipcRenderer.invoke("test_message", peerId, message);
  },
});
