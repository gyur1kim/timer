interface TimerDisplayInterface {
  min: string;
  sec: string;
  milli?: string;
}

function TimerDisplay({ min, sec, milli }: TimerDisplayInterface) {
  return (
    <div className="timer-wrapper">
      <span className="time">{min}</span>:<span className="second">{sec}</span>
      {milli && (
        <>
          .<span className="milli">{milli}</span>
        </>
      )}
    </div>
  );
}

export default TimerDisplay;
