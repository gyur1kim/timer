import { useEffect, useRef, useState } from "react";

import TimerDelay from "timer/TimerDelay";
import TimerDisplay from "timer/TimerDisplay";

import addDelayToList from "utils/addDelayToList";
import timerFormat from "utils/timerFormat";

import { TimerInterface } from "types/timer";

function RequestAnimationFrameTimer({ milliseconds }: TimerInterface) {
  const [time, setTime] = useState<number>(milliseconds);
  const requestAnimationFrameId =
    useRef<ReturnType<typeof requestAnimationFrame>>();
  const startTimestamp = useRef(Date.now());

  useEffect(() => {
    const handleTimer = () => {
      const now = Date.now();
      const delay = now - startTimestamp.current;

      setTime((prev) => prev - delay);

      addDelayToList(delay);
      startTimestamp.current = now;
      requestAnimationFrameId.current = requestAnimationFrame(handleTimer);
    };

    requestAnimationFrameId.current = requestAnimationFrame(handleTimer);

    return () => {
      if (requestAnimationFrameId.current)
        cancelAnimationFrame(requestAnimationFrameId.current);
    };
  }, []);

  // timer 시간이 0이 되면 종료
  useEffect(() => {
    if (time > 0) return;

    setTime(0);

    if (requestAnimationFrameId.current) {
      cancelAnimationFrame(requestAnimationFrameId.current);
    }
  }, [time]);

  const [min, sec, milli] = timerFormat(time);

  return (
    <>
      <TimerDisplay min={min} sec={sec} milli={milli} />
      <TimerDelay />
      <div className="delay-wrapper">
        <ul className="delay-list"></ul>
      </div>
    </>
  );
}

export default RequestAnimationFrameTimer;
