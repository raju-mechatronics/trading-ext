export default function Block() {
  console.log("Block");
  return (
    <div
      id="candlestick-container"
      style={{
        zIndex: 9999999,
        position: "absolute",
        top: 0,
        right: 0,
        background: "transparent",
      }}
    >
      <div id="percentage-differences">
        <div id="oh">
          <span>OH:</span>
          <span id="oh-percentage"></span>
        </div>
        <div id="ol">
          <span>OL:</span>
          <span id="ol-percentage"></span>
        </div>
        <div id="oc">
          <span>OC:</span>
          <span id="oc-percentage"></span>
        </div>
        <div id="hl">
          <span>HL:</span>
          <span id="hl-percentage"></span>
        </div>
        <div id="change">
          <span>CNG:</span>
          <span id="change-percentage"></span>
        </div>
      </div>
    </div>
  );
}
