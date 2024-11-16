import { useEffect, useRef, useState } from "react";

import TimerDisplay from "timer/TimerDisplay";
import TimerDelay from "timer/TimerDelay";

import timerFormat from "utils/timerFormat";
import { SECOND } from "utils/const";

import { TimerInterface } from "types/timer";

import "css/Timer.css";

function SetInterval({ milliseconds }: TimerInterface) {
  const [time, setTime] = useState<number>(milliseconds);
  const [intervalId, setIntervalId] =
    useState<ReturnType<typeof setInterval>>();

  const startTimestamp = useRef(Date.now());

  const listElem = document.querySelector(".delay-list")!;

  useEffect(() => {
    const handleTimer = () => {
      const now = Date.now();
      const delay = now - startTimestamp.current;

      const li = document.createElement("li");
      li.innerText = `[delay] ${delay}`;
      listElem.appendChild(li);
      listElem.scrollTop = listElem.scrollHeight;

      const elapsedTime = Math.max(SECOND, delay - (delay % SECOND));
      startTimestamp.current = now;

      setTime((prev) => prev - elapsedTime);
    };

    const intervalId = setInterval(handleTimer, SECOND);
    setIntervalId(intervalId);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [listElem]);

  useEffect(() => {
    if (time <= 0 && intervalId) {
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

export default SetInterval;
