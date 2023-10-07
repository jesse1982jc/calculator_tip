import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}

export default App;

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  // 計算小費
  const tip = Math.round(bill * ((percentage1 + percentage2) / 2 / 100)); // 注意括號的位置，要把 兩個 percentage 相加，除以 2，再除以 100 計算百分比

  // Reset 重置鍵
  const handleReset = () => {
    setBill("");
    setPercentage1(0);
    setPercentage2(0);
  };

  return (
    <div>
      <BillInput bill={bill} setBill={setBill} />
      <SelectPercentage percentage={percentage1} onSelect={setPercentage1}>
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage percentage={percentage2} onSelect={setPercentage2}>
        How did your friend like the service?
      </SelectPercentage>

      {/* bill 大於 0 才渲染以下兩個組件 */}
      {/* 因為必須有一個父元素，所以使用空的 <></> 當父元素 */}
      {bill > 0 && (
        <>
          <Output bill={bill} tip={tip} />
          <Reset handleReset={handleReset} />
        </>
      )}
    </div>
  );
}

function BillInput({ bill, setBill }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="number"
        min={0}
        step={1}
        placeholder="Bill value"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))} // 因為 bill input 是 string type，為了之後的運算，所以必須轉成 number
      />
    </div>
  );
}

function SelectPercentage({ children, percentage, onSelect }) {
  return (
    <div>
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))} // 一樣 e.target.value 是 string，所以需要轉成 number
      >
        <option value="0">Dissatified (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing!! (20%)</option>
      </select>
    </div>
  );
}

function Output({ bill, tip }) {
  return (
    <h3>
      You pay ${bill + tip} (${bill} + ${tip} tip)
    </h3>
  );
}

function Reset({ handleReset }) {
  return <button onClick={handleReset}>Reset</button>;
}
