import { useEffect, useRef, useState } from "react";

import TimerDisplay from "timer/TimerDisplay";
import TimerDelay from "timer/TimerDelay";

import addDelayToList from "utils/addDelayToList";
import { MILLISECOND } from "utils/const";
import timerFormat from "utils/timerFormat";

import { TimerInterface } from "types/timer";

import "css/Timer.css";

function SetTimeout({ milliseconds }: TimerInterface) {
  const [time, setTime] = useState<number>(milliseconds);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>();
  const startTimestamp = useRef(Date.now());

  useEffect(() => {
    const handleTimer = () => {
      const now = Date.now();
      const delay = now - startTimestamp.current;

      const delayedSec = Math.max(1, Math.floor(delay / MILLISECOND));
      setTime((prev) => prev - delayedSec * MILLISECOND);

      addDelayToList(delay);
      startTimestamp.current = now;
      timeoutIdRef.current = setTimeout(handleTimer, MILLISECOND);
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
      <TimerDelay />
      <div className="delay-wrapper">
        <ul className="delay-list" />
      </div>
    </>
  );
}

export default SetTimeout;
