import { useEffect, useRef, useState } from "react";

import TimerDisplay from "timer/TimerDisplay";
import TimerDelay from "timer/TimerDelay";

import timerFormat from "utils/timerFormat";
import addDelayToList from "utils/addDelayToList";

import { TimerInterface } from "types/timer";

import "css/Timer.css";

function DelayedTimer({ milliseconds }: TimerInterface) {
  const [time, setTime] = useState<number>(milliseconds);
  const [intervalId, setIntervalId] =
    useState<ReturnType<typeof setInterval>>();

  const startTimestamp = useRef(Date.now());

  // timer 로직
  useEffect(() => {
    const handleTimer = () => {
      const now = Date.now();
      const delay = now - startTimestamp.current;

      addDelayToList(delay);

      startTimestamp.current = now;
      setTime((prev) => prev - 1000);
    };

    const intervalId = setInterval(handleTimer, 1000);
    setIntervalId(intervalId);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  // timer 시간이 0이 되면 종료
  useEffect(() => {
    if (time > 0) return;

    if (intervalId) {
      clearInterval(intervalId);
    }
  }, [time, intervalId]);

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
