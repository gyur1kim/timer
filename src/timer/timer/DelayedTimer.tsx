import { useEffect, useRef, useState } from "react";

import TimerDisplay from "timer/TimerDisplay";
import TimerDelay from "timer/TimerDelay";

import timerFormat from "utils/timerFormat";
import addDelayToList from "utils/addDelayToList";
import { MILLISECOND } from "utils/const";

import { TimerInterface } from "types/timer";

import "css/Timer.css";

function DelayedTimer({ milliseconds }: TimerInterface) {
  const [time, setTime] = useState<number>(milliseconds);
  const intervalId = useRef<ReturnType<typeof setInterval>>();
  const startTimestamp = useRef(Date.now());

  // timer 로직
  useEffect(() => {
    const handleTimer = () => {
      const now = Date.now();
      const delay = now - startTimestamp.current;

      addDelayToList(delay);

      startTimestamp.current = now;
      setTime((prev) => prev - MILLISECOND);
    };

    const id = setInterval(handleTimer, MILLISECOND);
    intervalId.current = id;

    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, []);

  useEffect(() => {
    if (time > 0) return;

    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
  }, [time]);

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

export default DelayedTimer;
