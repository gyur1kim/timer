import { useEffect, useState } from "react";

import TimerDelay from "timer/TimerDelay";
import TimerDisplay from "timer/TimerDisplay";

import timerFormat from "utils/timerFormat";
import addDelayToList from "utils/addDelayToList";

import { TimerInterface } from "types/timer";

function WebWorkerTimer({ milliseconds }: TimerInterface) {
  const [time, setTime] = useState<number>(milliseconds);

  useEffect(() => {
    const timerWorker = new Worker("src/worker/timerWorker.ts", {
      type: "module",
    });

    timerWorker.postMessage({ state: "start", time: milliseconds });
    timerWorker.onmessage = function (e) {
      setTime(e.data.time);
      addDelayToList(e.data.delay);
    };

    return () => {
      timerWorker.postMessage({ state: "stop" });
      timerWorker.terminate();
    };
  }, [milliseconds]);

  const [min, sec] = timerFormat(time);

  return (
    <>
      <TimerDisplay min={min} sec={sec} />
      <TimerDelay />
      <div className="delay-wrapper">
        <ul className="delay-list"></ul>
      </div>
    </>
  );
}

export default WebWorkerTimer;
