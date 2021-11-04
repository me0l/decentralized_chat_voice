const { BrowserWindow, screen, app } = require("electron");

// const { createSocket } = require("dgram");

// const udpSocket = createSocket("udp4");
// const mainlySocket = new (require("ws").WebSocket)("ws://localhost7070");
//
// mainlySocket.on("open", () =>
//   console.log("Успешно установлено соединение с посредником")
// );

/**
 * @type {import("electron").BrowserWindow}
 */
let notificationWindow;

function createWindow() {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      preload: require("path").resolve(app.getAppPath(), "preload.js"),
    },
  });

  window.loadURL("http://localhost:1234");

  const {
    size: { width, height },
  } = screen.getPrimaryDisplay();

  notificationWindow = new BrowserWindow({
    width: 400,
    height: 600,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  notificationWindow.setPosition(
    Math.round(width - 400),
    Math.round(height - 455)
  );

  notificationWindow.hide();

  notificationWindow.webContents.on(
    "ipc-message",
    (event, channel, ...args) => {
      if (channel === "notification_empty") {
        if (!notificationWindow.isDestroyed()) notificationWindow.hide();
      }
    }
  );

  notificationWindow.loadFile(
    "E:\\Projects\\JS\\decentralized_chat_voice\\notification.html"
  );

  window.on("close", () => {
    if (!notificationWindow.isDestroyed()) notificationWindow.destroy();
    window.destroy();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  app.quit();
});

// ipc.handle("setStatus", (event, status) => {
//   mainlySocket.send(
//     JSON.stringify({
//       type: "ss",
//       data: {
//         status,
//       },
//     })
//   );
// });
