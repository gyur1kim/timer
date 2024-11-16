import "./App.css";
import DelayedTimer from "./timer/timer/DelayedTimer";

function App() {
  return (
    <>
      <h2>타이머를 만드는 네 가지 방법</h2>
      <div className="wrapper">
        <DelayedTimer milliseconds={600000} />
      </div>
    </>
  );
}

export default App;
