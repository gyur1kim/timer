import { useEffect, useRef, useState } from "react";

import timerFormat from "../utils/timerFormat";

import "./Timer.css";

interface WrongTimerType {
  milliseconds: number;
}

function WrongTimer({ milliseconds }: WrongTimerType) {
  const [time, setTime] = useState<number>(milliseconds);
  const [intervalId, setIntervalId] =
    useState<ReturnType<typeof setInterval>>();
  const startTimestamp = useRef(Date.now());

  const listElem = document.querySelector(".delay-list")!;

  useEffect(() => {
    const handleTimer = () => {
      const now = Date.now();
      const li = document.createElement("li");
      li.innerText = `delay : ${now - startTimestamp.current}`;
      listElem.appendChild(li);
      listElem.scrollTop = listElem.scrollHeight;

      startTimestamp.current = now;
      setTime((prev) => prev - 1000);
    };

    const intervalId = setInterval(handleTimer, 1000);
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
      <div className="timer-wrapper">
        <span className="time">{min}</span>:
        <span className="second">{sec}</span>
      </div>
      <div className="delay-wrapper">
        <ul className="delay-list"></ul>
      </div>
    </>
  );
}

export default WrongTimer;
