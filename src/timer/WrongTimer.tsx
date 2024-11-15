import { useEffect, useState } from "react";

import timerFormat from "../utils/timerFormat";

import "./Timer.css";

interface WrongTimerType {
  milliseconds: number;
}

function WrongTimer({ milliseconds }: WrongTimerType) {
  const [time, setTime] = useState<number>(milliseconds);
  const [intervalId, setIntervalId] =
    useState<ReturnType<typeof setInterval>>();

  useEffect(() => {
    const handleTimer = () => {
      setTime((prev) => prev - 1000);
    };

    const intervalId: ReturnType<typeof setInterval> = setInterval(
      handleTimer,
      1000
    );
    setIntervalId(intervalId);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (time <= 0 && intervalId) {
      clearInterval(intervalId);
    }
  }, [time, intervalId]);

  const [min, sec] = timerFormat(time);

  return (
    <div className="timer-wrapper">
      <span className="time">{min}</span>:<span className="second">{sec}</span>
    </div>
  );
}

export default WrongTimer;
