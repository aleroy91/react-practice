import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

export function CounterPlus(props) {
  return <button onClick={() => props.onClick()}>+</button>;
}

export function CounterMinus(props) {
  return <button onClick={() => props.onClick()}>-</button>;
}

export function Count(props) {
  return <p>{props.value}</p>;
}

export default function Counter() {
  const [num, setNum] = useState(0);
  const add = () => setNum((prevNum) => prevNum + 1);
  const subtract = () => setNum((prevNum) => prevNum - 1);

  return (
    <div>
      <CounterPlus onClick={add} />
      <CounterMinus onClick={subtract} />
      <Count value={num} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Counter />);
