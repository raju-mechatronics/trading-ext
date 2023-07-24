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
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const data = getFinalData();
      setState(data);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  if (!show) return null;

  return (
    <div
      id="candlestick-container"
      style={{
        zIndex: 9999999,
        position: "absolute",
        bottom: 0,
        left: 0,
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
        <div
          onClick={() => setShow(false)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "red",
            cursor: "pointer",
            border: "1px solid red",
            padding: "0 5px",
            borderRadius: "50%",
          }}
        >
          X
        </div>
      </div>
    </div>
  );
}
