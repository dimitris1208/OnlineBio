// Captures the preview image for every site in content/sites.json that does not have one yet.
//   node scripts/site-previews.mjs          capture missing previews
//   node scripts/site-previews.mjs --all    re-capture everything
// Needs a local Chrome/Edge; set CHROME_PATH if it is not in the default location.
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const WIDTH = 1280;
const HEIGHT = 2400; // keep in sync with PREVIEW in components/SiteCard.tsx
const OUT = "public/sites";

const chromePath =
  process.env.CHROME_PATH ??
  [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
  ].find((p) => fs.existsSync(p));
if (!chromePath) throw new Error("Chrome not found — set CHROME_PATH");

const all = process.argv.includes("--all");
const sites = JSON.parse(fs.readFileSync("content/sites.json", "utf8"));
const todo = sites
  .map((s) => ({ ...s, file: path.join(OUT, `${new URL(s.url).hostname}.webp`) }))
  .filter((s) => all || !fs.existsSync(s.file));
if (todo.length === 0) {
  console.log("All previews exist. Use --all to re-capture.");
  process.exit(0);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const port = 9400 + Math.floor(Math.random() * 400);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), "site-previews-"));
const chrome = spawn(
  chromePath,
  ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "--hide-scrollbars", "about:blank"],
  { stdio: "ignore" }
);

let ws;
for (let i = 0; i < 40 && !ws; i++) {
  try {
    const targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl);
  } catch {
    await sleep(250);
  }
}
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (m) => {
  const d = JSON.parse(m.data);
  if (d.id && pending.has(d.id)) {
    pending.get(d.id)(d.result ?? {});
    pending.delete(d.id);
  }
};
const send = (method, params = {}) =>
  new Promise((r) => {
    pending.set(++id, r);
    ws.send(JSON.stringify({ id, method, params }));
  });
const run = (expression) => send("Runtime.evaluate", { expression, awaitPromise: true });

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: WIDTH, height: 800, deviceScaleFactor: 1, mobile: false });
fs.mkdirSync(OUT, { recursive: true });

for (const site of todo) {
  await send("Page.navigate", { url: site.url });
  await sleep(6000);
  // scroll through once so lazy-loaded images below the fold are there, then back to the top
  await run(`(async () => { for (let y = 0; y <= ${HEIGHT}; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 250)); } scrollTo(0, 0); })()`);
  // drop the usual cookie-consent overlays so they don't cover the preview
  await run(`document.querySelectorAll('#shopify-pc__banner, #cookie-law-info-bar, .cky-consent-container, .cmplz-cookiebanner, #CybotCookiebotDialog, #onetrust-consent-sdk, .elementor-popup-modal, .dialog-widget, .hustle-popup, .pum-overlay').forEach(e => e.remove())`);
  await sleep(1500);
  const { data } = await send("Page.captureScreenshot", {
    format: "webp",
    quality: 72,
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT, scale: 1 },
  });
  if (!data) {
    console.log("FAILED", site.url);
    continue;
  }
  fs.writeFileSync(site.file, Buffer.from(data, "base64"));
  console.log("saved", site.file);
}

ws.close();
chrome.kill();
