import { MILLISECOND } from "utils/const";

let intervalId: ReturnType<typeof setInterval> | number;
let startTimestamp = Date.now();
let time: number;

const handleTimer = () => {
  if (time <= 0) {
    clearInterval(intervalId);
    return;
  }

  const now = Date.now();
  const delay = now - startTimestamp;

  const delayedSec = Math.max(1, Math.floor(delay / MILLISECOND));

  console.log(delayedSec);
  startTimestamp = now;
  time -= delayedSec * MILLISECOND;

  postMessage({ time, delay });
};

self.onmessage = function (e: MessageEvent) {
  console.log(e);
  if (e.data.state === "start") {
    time = e.data.time;
    intervalId = setInterval(handleTimer, MILLISECOND);
  }

  if (e.data.state === "stop") {
    clearInterval(intervalId);
  }
};
