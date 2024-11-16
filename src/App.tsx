import { useState, MouseEvent } from "react";

import DelayedTimer from "@timerComponents/DelayedTimer";
import SetInterval from "@timerComponents/SetIntervalTimer";

import "App.css";

const timerTime = 600000;
const timerList: Record<string, JSX.Element> = {
  delay: <DelayedTimer milliseconds={timerTime} />,
  setInterval: <SetInterval milliseconds={timerTime} />,
};

function App() {
  const [action, setAction] = useState("delay");

  const handleTab = (e: MouseEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;

    const action = e.target.dataset.action;
    if (action) {
      setAction(action);
    }
  };

  return (
    <>
      <h2>타이머를 만드는 네 가지 방법</h2>
      <div className="tap-wrapper" onClick={(e) => handleTab(e)}>
        <button data-action="delay">delay되는 타이머</button>
        <button data-action="setInterval">setInterval로 구현한 타이머</button>
      </div>
      <div className="wrapper">{timerList[action]}</div>
    </>
  );
}

export default App;
