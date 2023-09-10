import React from "react";
import ReactDOM from "react-dom/client";
import Block from "./index";

const root: HTMLDivElement = document.createElement("div");
root.id = "extension-root-per";
document.body.appendChild(root);

function waitForFunctionReturn(func: () => boolean) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const el = func();
      if (el) {
        clearInterval(interval);
        resolve(el);
      }
    }, 100);
  });
}

async function injectDiv() {
  if (document.URL.includes("futures.mexc.com/exchange/")) {
    await waitForFunctionReturn(
      () =>
        !!document.querySelector("#mexc-web-inspection-futures-exchange-kline")
    );
    const chartContainer = document.querySelector(
      "#mexc-web-inspection-futures-exchange-kline"
    );
    if (chartContainer) chartContainer.firstChild?.appendChild(root);
  } else {
    document.querySelector("#mexc-web-inspection-futures-exchange-kline");

    await waitForFunctionReturn(
      () => !!document.querySelector(".chart-container")
    );
    const chartContainer = document.querySelector(".chart-container");
    if (chartContainer) chartContainer.appendChild(root);
  }
}

injectDiv().then(() => {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Block />
    </React.StrictMode>
  );
});
