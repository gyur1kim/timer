import { useEffect, useState } from "react";
import TimerDelay from "timer/TimerDelay";
import timerFormat from "utils/timerFormat";
import TimerDisplay from "timer/TimerDisplay";
import { TimerInterface } from "types/timer";

function WebWorkerTimer({ milliseconds }: TimerInterface) {
  const [time, setTime] = useState<number>(milliseconds);
  // console.log(import.meta);

  const timerWorker = new Worker("src/worker/timerWorker.ts", {
    type: "module",
  });

  useEffect(() => {
    timerWorker.postMessage({ state: "start", time: milliseconds });

    return () => {
      timerWorker.postMessage({ state: "stop" });
    };
  }, []);

  timerWorker.onmessage = function (e) {
    setTime(e.data);
  };
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
