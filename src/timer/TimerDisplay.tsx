interface TimerDisplayInterface {
  min: string;
  sec: string;
}

function TimerDisplay({ min, sec }: TimerDisplayInterface) {
  return (
    <div className="timer-wrapper">
      <span className="time">{min}</span>:<span className="second">{sec}</span>
    </div>
  );
}

export default TimerDisplay;
