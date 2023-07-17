interface Candlestick {
  open: number;
  high: number;
  low: number;
  close: number;
  change: number;
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
    change: change.toFixed(2) + "%",
  };
}

function extractOHLC(inputString: string) {
  const regex = /O(\d+)H(\d+)L(\d+)C(\d+)([-+−]\d+)\s\(([-+−]\d*\.?\d+)%\)/;
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

function calculate(content: string) {
  const { O, H, L, C, numberInBracket, percentage } = extractOHLC(content);
  const open = parseFloat(O);
  const high = parseFloat(H);
  const low = parseFloat(L);
  const close = parseFloat(C);
  const change = parseFloat(percentage);

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
  const content = getData();
  const data = calculate(content);
  return data;
}
