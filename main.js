const { app, BrowserWindow, Menu, shell, session } = require("electron");
const os = require("node:os");
const path = require("node:path");

const appId = "tradingview-electron-wrapper";
const defaultTradingViewUrl = "https://www.tradingview.com/chart/";

// Change this to your own TradingView chart or layout URL.
// Example: "https://www.tradingview.com/chart/YOUR_CHART_ID/"
const userTradingViewUrl = defaultTradingViewUrl;

const tradingViewUrl = process.env.TRADINGVIEW_URL || userTradingViewUrl;
const allowedTradingViewHosts = new Set([
  "tradingview.com",
  "www.tradingview.com",
  "ru.tradingview.com",
]);
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

function parseUrl(url) {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

function isAllowedTradingViewUrl(url) {
  const parsed = parseUrl(url);

  return (
    parsed !== null &&
    parsed.protocol === "https:" &&
    allowedTradingViewHosts.has(parsed.hostname)
  );
}

function openExternalHttps(url) {
  const parsed = parseUrl(url);

  if (parsed === null || parsed.protocol !== "https:") {
    return;
  }

  shell.openExternal(parsed.toString()).catch(() => {});
}

app.setName("TradingView");
app.setDesktopName(`${appId}.desktop`);
app.setPath("userData", path.join(os.homedir(), ".config", appId));

Menu.setApplicationMenu(null);

function configureSession(appSession) {
  appSession.setPermissionRequestHandler((_webContents, _permission, callback) => {
    callback(false);
  });

  appSession.setPermissionCheckHandler(() => false);
}

function guardNavigation(event, url) {
  if (isAllowedTradingViewUrl(url)) {
    return;
  }

  event.preventDefault();
  openExternalHttps(url);
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    backgroundColor: "#131722",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.once("ready-to-show", () => {
    win.show();
  });

  win.webContents.setWindowOpenHandler(({ url }) => {
    openExternalHttps(url);
    return { action: "deny" };
  });

  win.webContents.on("will-navigate", guardNavigation);
  win.webContents.on("will-redirect", guardNavigation);
  win.webContents.on("dom-ready", () => {
    win.webContents.insertCSS(hideScrollbarsCss, { cssOrigin: "user" });
  });

  win.loadURL(tradingViewUrl);
}

app.whenReady().then(() => {
  configureSession(session.defaultSession);
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
