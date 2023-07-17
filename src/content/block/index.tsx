import { useEffect, useState } from "react";
import { getFinalData } from "../engine";

export default function Block() {
  const [state, setState] = useState<ReturnType<typeof getFinalData>>({
    OH: "0",
    OL: "0",
    OC: "0",
    HL: "0",
    change: "0",
  });

  useEffect(() => {
    window.addEventListener("mousemove", () => {
      const data = getFinalData();
      setState(data);
    });
  }, []);

  console.log(state);

  return (
    <div
      id="candlestick-container"
      style={{
        zIndex: 9999999,
        position: "absolute",
        top: 5,
        right: 50,
      }}
    >
      <div id="percentage-differences">
        <div id="oh">
          <span>OH: {state.OH}</span>
          <span id="oh-percentage"></span>
        </div>
        <div id="ol">
          <span>OL: {state.OL}</span>
          <span id="ol-percentage"></span>
        </div>
        <div id="oc">
          <span>OC: {state.OC}</span>
          <span id="oc-percentage"></span>
        </div>
        <div id="hl">
          <span>HL: {state.HL}</span>
          <span id="hl-percentage"></span>
        </div>
        <div id="change">
          <span>CNG: {state.change}</span>
          <span id="change-percentage"></span>
        </div>
      </div>
    </div>
  );
}
