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

      startTimestamp.current = now;
      // 이거 주석해제하면 delay 시차를 줄일 수는 있지만,,,
      // 잘못하면 타이머가 980ms, 1200ms,,, 이렇게 진행될 수 있음
      // const nextDelay = handleNextDelay(delay);
      // timeoutIdRef.current = setTimeout(handleTimer, nextDelay);

      // 이거 주석해제하면,, 무조건 1000 + n 초 뒤 실행하므로 타이머에 오차가 발생
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
      <div className="delay-wrapper">
        <ul className="delay-list" />
      </div>
    </>
  );
}

export default SetTimeout;
