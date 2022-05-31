import React from 'react';
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

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
    };

    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
  }

  add() {
    this.setState((state) => {
      return { num: state.num + 1 };
    });
  }

  subtract() {
    this.setState((state) => {
      return { num: state.num - 1 };
    });
  }

  render() {
    return (
      <div>
        <CounterPlus onClick={() => this.add(this.state)} />
        <CounterMinus onClick={() => this.subtract(this.state)} />
        <Count value={this.state.num} />
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Counter />);
