import { MILLISECOND } from "utils/const";

let intervalId: ReturnType<typeof setInterval> | number;
let startTimestamp: number;
let time: number;

const handleTimer = () => {
  if (time <= 0) {
    clearInterval(intervalId);
    return;
  }

  const now = Date.now();
  const delay = now - startTimestamp;

  const delayedSec = Math.max(1, Math.floor(delay / MILLISECOND));

  startTimestamp = now;
  time -= delayedSec * MILLISECOND;

  postMessage({ time, delay });
};

self.onmessage = function (e: MessageEvent) {
  if (e.data.state === "start") {
    time = e.data.time;
    startTimestamp = Date.now();
    intervalId = setInterval(handleTimer, MILLISECOND);
  }

  if (e.data.state === "stop") {
    clearInterval(intervalId);
  }
};
