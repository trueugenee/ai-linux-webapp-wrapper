const { app, BrowserWindow, Menu, shell, session } = require("electron");
const os = require("node:os");
const path = require("node:path");
const { loadConfig } = require("./src/config");
const { createWindow } = require("./src/create-window");
const {
  createUrlPolicy,
  parseUrl,
  shouldOpenExternally,
} = require("./src/url-policy");

const config = loadConfig();
const urlPolicy = createUrlPolicy(config.allowedHosts);

function openExternalHttps(url) {
  if (!shouldOpenExternally(url)) {
    return;
  }

  const parsed = parseUrl(url);

  shell.openExternal(parsed.toString()).catch(() => {});
}

app.setName(config.appName);
app.setDesktopName(`${config.appId}.desktop`);
app.setPath("userData", path.join(os.homedir(), ".config", config.appId));

Menu.setApplicationMenu(null);

function configureSession(appSession) {
  appSession.setPermissionRequestHandler((_webContents, _permission, callback) => {
    callback(false);
  });

  appSession.setPermissionCheckHandler(() => false);
}

app.whenReady().then(() => {
  configureSession(session.defaultSession);
  createWindow({ config, openExternalHttps, urlPolicy });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow({ config, openExternalHttps, urlPolicy });
    }
  });
});

app.on("window-all-closed", () => {
  app.quit();
});
