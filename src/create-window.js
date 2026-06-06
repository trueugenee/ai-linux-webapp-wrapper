const { BrowserWindow } = require("electron");

const hideScrollbarsCss = `
  html,
  body {
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
  }

  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
    display: none !important;
  }
`;

function createWindow({ config, openExternalHttps, urlPolicy }) {
  const win = new BrowserWindow({
    width: config.window.width,
    height: config.window.height,
    show: false,
    frame: config.window.frame,
    autoHideMenuBar: true,
    backgroundColor: config.window.backgroundColor,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  function guardNavigation(event, url) {
    if (urlPolicy.isAllowedInternalUrl(url)) {
      return;
    }

    event.preventDefault();
    openExternalHttps(url);
  }

  win.once("ready-to-show", () => {
    win.show();
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    openExternalHttps(url);
    return { action: "deny" };
  });

  win.webContents.on("will-navigate", guardNavigation);
  win.webContents.on("will-redirect", guardNavigation);

  if (config.hideScrollbars) {
    win.webContents.on("dom-ready", () => {
      win.webContents.insertCSS(hideScrollbarsCss, { cssOrigin: "user" });
    });
  }

  win.loadURL(config.startUrl);

  return win;
}

module.exports = {
  createWindow,
};
