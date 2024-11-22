import { useEffect, useRef, useState } from "react";

import TimerDisplay from "timer/TimerDisplay";
import { TimerInterface } from "types/timer";

import addDelayToList from "utils/addDelayToList";
import { MILLISECOND } from "utils/const";
import timerFormat from "utils/timerFormat";

import "css/Timer.css";

function SetTimeout({ milliseconds }: TimerInterface) {
  const [time, setTime] = useState<number>(milliseconds);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>();
  const startTimestamp = useRef(Date.now());

  const handleNextDelay = (delay: number) => {
    if (Math.floor(delay / MILLISECOND)) {
      return MILLISECOND - (delay % MILLISECOND);
    }
    return MILLISECOND - (delay - MILLISECOND);
  };

  useEffect(() => {
    const handleTimer = () => {
      const now = Date.now();
      const delay = now - startTimestamp.current;

      addDelayToList(delay);

      const delayedSec = Math.max(1, Math.floor(delay / MILLISECOND));
      setTime((prev) => prev - delayedSec * MILLISECOND);

      const nextDelay = handleNextDelay(delay);
      startTimestamp.current = now;
      timeoutIdRef.current = setTimeout(handleTimer, nextDelay);
    };

    timeoutIdRef.current = setTimeout(handleTimer, MILLISECOND);

    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
  }, []);

  useEffect(() => {
    if (time > 0) return;

    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
  }, [time]);

  const [min, sec] = timerFormat(time);

  return (
    <>
      <TimerDisplay min={min} sec={sec} />
      <div className="delay-wrapper">
        <ul className="delay-list" />
      </div>
    </>
  );
}

export default SetTimeout;
