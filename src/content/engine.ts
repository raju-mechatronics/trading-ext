import $ from "jquery";

interface Candlestick {
  open: number;
  high: number;
  low: number;
  close: number;
  change: number | string;
}

interface CandlestickData {
  OH: string;
  OL: string;
  OC: string;
  HL: string;
  change: string;
}

function calculatePercentageDifference(
  candlestick: Candlestick
): CandlestickData {
  const { open, high, low, close, change } = candlestick;
  const OH = (((high - open) / open) * 100).toFixed(2) + "%";
  const OL = (((open - low) / open) * 100).toFixed(2) + "%";
  const OC = (((close - open) / open) * 100).toFixed(2) + "%";
  const HL = (((high - low) / low) * 100).toFixed(2) + "%";

  return {
    OH,
    OL,
    OC,
    HL,
    change: change + "%",
  };
}

function extractOHLC(inputString: string) {
  const regex =
    /O([\d.]+)H([\d.]+)L([\d.]+)C([\d.]+)([-+−]?[\d.]+)\s\(([-+−]?[\d.]+)%\)/;
  const matches = inputString.match(regex);

  if (!matches) {
    throw new Error("Invalid input string");
  }

  const [_, O, H, L, C, numberInBracket, percentage] = matches;

  return {
    O,
    H,
    L,
    C,
    numberInBracket,
    percentage,
  };
}

function extractFromMexc() {
  function extractDataMEXC(text: string) {
    const openMatch = text.match(
      /Open: ([-+]?\d{1,3}(?:,?\d{3})*(?:\.\d{1,2})?)/
    );
    const closeMatch = text.match(
      /Close: ([-+]?\d{1,3}(?:,?\d{3})*(?:\.\d{1,2})?)/
    );
    const highMatch = text.match(
      /High: ([-+]?\d{1,3}(?:,?\d{3})*(?:\.\d{1,2})?)/
    );
    const lowMatch = text.match(
      /Low: ([-+]?\d{1,3}(?:,?\d{3})*(?:\.\d{1,2})?)/
    );
    const changesMatch = text.match(
      /Changes: ([+-]?\d{1,3}(?:,?\d{3})*(?:\.\d{1,2})?%)/
    );

    if (openMatch && closeMatch && highMatch && lowMatch && changesMatch) {
      const open = parseFloat(openMatch[1].replace(/,/g, ""));
      const close = parseFloat(closeMatch[1].replace(/,/g, ""));
      const high = parseFloat(highMatch[1].replace(/,/g, ""));
      const low = parseFloat(lowMatch[1].replace(/,/g, ""));
      const change = parseFloat(changesMatch[1].replace(/,/g, "")) as
        | string
        | number;

      return {
        open,
        close,
        high,
        low,
        change,
      };
    } else {
      throw new Error("Data not found in the provided text");
    }
  }
  const text = (
    document.querySelector(
      "#originkline-tooltip-line > div > span"
    ) as HTMLElement
  ).textContent as string;
  const data = extractDataMEXC(text);
  data.change = data.change.toString() + "%";
  return data;
}

function calculate() {
  if (document.URL.includes("futures.mexc.com/exchange")) {
    console.log("calculating");
    return calculatePercentageDifference(extractFromMexc());
  }
  const content = getData();
  const { O, H, L, C, percentage } = extractOHLC(content);
  const open = parseFloat(O);
  const high = parseFloat(H);
  const low = parseFloat(L);
  const close = parseFloat(C);
  const change = percentage;

  return calculatePercentageDifference({
    open,
    high,
    low,
    close,
    change,
  });
}

function getData() {
  const t = $('[data-name="legend-series-item"]');
  return t.last().text();
}

export function getFinalData() {
  const data = calculate();
  return data;
}
