#!/usr/bin/env bash
set -euo pipefail

repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
config_path="$repo_dir/app.config.json"
desktop_dir="${XDG_DATA_HOME:-$HOME/.local/share}/applications"
icon_dir="${XDG_DATA_HOME:-$HOME/.local/share}/icons/hicolor/scalable/apps"

read_config_field() {
  local field="$1"
  local fallback="$2"

  node -e '
    const fs = require("node:fs");
    const [configPath, field, fallback] = process.argv.slice(1);
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    const value = config[field];
    console.log(typeof value === "string" && value.trim() !== "" ? value.trim() : fallback);
  ' "$config_path" "$field" "$fallback"
}

app_id="$(read_config_field appId ai-linux-webapp-wrapper)"
app_name="$(read_config_field appName Webapp)"
desktop_file="$desktop_dir/$app_id.desktop"
source_icon="$repo_dir/assets/ai-linux-webapp-wrapper.svg"
target_icon="$icon_dir/$app_id.svg"

mkdir -p "$desktop_dir" "$icon_dir"
cp "$source_icon" "$target_icon"

cat > "$desktop_file" <<EOF
[Desktop Entry]
Name=$app_name
Comment=Frameless webapp using AI Linux Webapp Wrapper
Exec=sh -c 'cd "$repo_dir" && npm start'
Icon=$app_id
Terminal=false
Type=Application
Categories=Network;Office;
StartupWMClass=$app_id
EOF

echo "Installed desktop entry: $desktop_file"
echo "Installed icon: $target_icon"
