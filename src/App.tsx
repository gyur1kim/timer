import "./App.css";
import WrongTimer from "./timer/WrongTimer";

function App() {
  return (
    <>
      <h2>타이머를 만드는 네 가지 방법</h2>
      <div className="wrapper">
        <WrongTimer milliseconds={600000} />
      </div>
    </>
  );
}

export default App;
