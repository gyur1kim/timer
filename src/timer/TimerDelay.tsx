function TimerDelay() {
  const handleDelay = () => {
    let sum = 0;
    for (let i = 0; i < 30_0000_0000; i++) {
      sum = sum + i;
    }
  };

  return (
    <div className="button-wrapper">
      <button type="button" className="button_delay" onClick={handleDelay}>
        타이머 지연
      </button>
    </div>
  );
}

export default TimerDelay;
