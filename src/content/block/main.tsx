import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Block from "./index";

const root: HTMLDivElement = document.createElement("div");
root.id = "extension-root-per";
document.body.appendChild(root);

function waitForFunctionReturn(func: () => boolean) {
  return new Promise((resolve, reject) => {
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
  await waitForFunctionReturn(
    () => !!document.querySelector(".chart-container")
  );
  const chartContainer = document.querySelector(".chart-container");
  console.log("chartContainer", chartContainer);
  if (chartContainer) chartContainer.appendChild(root);
}

injectDiv();

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Block />
  </React.StrictMode>
);
