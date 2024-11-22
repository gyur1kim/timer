import { useEffect, useRef, useState } from "react";

import TimerDisplay from "timer/TimerDisplay";
import TimerDelay from "timer/TimerDelay";

import addDelayToList from "utils/addDelayToList";
import { MILLISECOND } from "utils/const";
import timerFormat from "utils/timerFormat";

import { TimerInterface } from "types/timer";

import "css/Timer.css";

function SetInterval({ milliseconds }: TimerInterface) {
  const [time, setTime] = useState<number>(milliseconds);
  const intervalId = useRef<ReturnType<typeof setInterval>>();
  const startTimestamp = useRef(Date.now());

  useEffect(() => {
    const handleTimer = () => {
      const now = Date.now();
      const delay = now - startTimestamp.current;

      addDelayToList(delay);

      const elapsedTime = Math.max(MILLISECOND, delay - (delay % MILLISECOND));
      startTimestamp.current = now;

      setTime((prev) => prev - elapsedTime);
    };

    const id = setInterval(handleTimer, MILLISECOND);
    intervalId.current = id;

    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, []);

  // timer 시간이 0이 되면 종료
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

export default SetInterval;
