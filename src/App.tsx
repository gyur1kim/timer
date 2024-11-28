import { useState, MouseEvent } from "react";

import SetInterval from "@timerComponents/SetIntervalTimer";
import SetTimeout from "@timerComponents/SetTimeoutTimer";
import RequestAnimationFrameTimer from "@timerComponents/RequestAnimationFrameTimer";
import WebWorkerTimer from "@timerComponents/WebWorkerTimer";

import "App.css";

const TIMER_TIME = 10_000;
const TIMER_CONFIGS = [
  {
    id: "setInterval",
    label: "setInterval",
    component: <SetInterval milliseconds={TIMER_TIME} />,
  },
  {
    id: "setTimeout",
    label: "setTimeout",
    component: <SetTimeout milliseconds={TIMER_TIME} />,
  },
  {
    id: "requestAnimationFrame",
    label: "requestAnimationFrame",
    component: <RequestAnimationFrameTimer milliseconds={TIMER_TIME} />,
  },
  {
    id: "webWorker",
    label: "webWorker",
    component: <WebWorkerTimer milliseconds={TIMER_TIME} />,
  },
] as const;

function App() {
  const [selectedTab, setSelectedTab] = useState<
    (typeof TIMER_CONFIGS)[number]["id"]
  >(TIMER_CONFIGS[0]["id"]);

  const handleTab = (e: MouseEvent<HTMLDivElement>) => {
    const button = e.target as Element;

    // closest를 사용해 버튼이나 그 자식 요소를 클릭했을 때도 동작하도록 함
    const targetButton = button.closest("[data-action]");
    if (!targetButton) return;

    const action = targetButton.getAttribute("data-action");
    if (action && TIMER_CONFIGS.some((config) => config.id === action)) {
      setSelectedTab(action as typeof selectedTab);
    }
  };

  return (
    <>
      <h2>타이머를 만드는 네 가지 방법</h2>
      <div className="tab-wrapper" onClick={handleTab} role="tablist">
        {TIMER_CONFIGS.map(({ id, label }) => (
          <button
            key={id}
            className={`tab-button ${selectedTab === id ? "selected" : ""}`}
            data-action={id}
            role="tab"
            aria-selected={selectedTab === id}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="wrapper">
        {TIMER_CONFIGS.find((config) => config.id === selectedTab)?.component}
      </div>
    </>
  );
}

export default App;
