import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest(() => ({
  manifest_version: 3,
  name: "OHLC calculator",
  version: `0.0.1`,
  // background: {
  //   service_worker: "src/background/index.ts",
  //   type: "module",
  // },
  // action: {
  //   default_popup: "src/popup/popup.html",
  // },
  content_scripts: [
    {
      matches: [
        "https://www.tradingview.com/chart/*",
        "https://www.bitget.com/*",
        "https://www.bybit.com/*",
      ],
      js: ["src/content/index.ts"],
      all_frames: true,
    },
    {
      matches: ["https://www.bitget.com/*"],
      js: ["src/content/index.ts"],
      match_origin_as_fallback: true,
      all_frames: true,
    },
  ],
}));
