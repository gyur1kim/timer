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
  const [run, setRun] = useState<boolean>(false);

  useEffect(() => {
    if (!run) return;

    const handleTimer = () => {
      setTime((prev) => prev - 1000);
    };

    const intervalId: ReturnType<typeof setInterval> = setInterval(
      handleTimer,
      1000
    );
    setIntervalId(intervalId);

    return () => {
      if (run && intervalId) clearInterval(intervalId);
    };
  }, [run]);

  useEffect(() => {
    if (time <= 0 && run && intervalId) {
      clearInterval(intervalId);
      setRun(false);
    }
  }, [time, intervalId, run]);

  const [min, sec] = timerFormat(time);

  return (
    <>
      <div className="timer-wrapper">
        <span className="time">{min}</span>:
        <span className="second">{sec}</span>
      </div>
      <div className="button-wrapper">
        <button
          type="button"
          className={`button_${run ? "stop" : "go"}`}
          onClick={() => setRun((prev) => !prev)}
        >
          {run ? "일시정지" : "시작하기"}
        </button>
      </div>
    </>
  );
}

export default WrongTimer;
