import React from 'react';
import ReactDOM from 'react-dom/client';

class CounterPlus extends React.Component {
  render() {
    return <button onClick={() => this.props.onClick()}>+</button>;
  }
}

class CounterMinus extends React.Component {
  render() {
    return <button onClick={() => this.props.onClick()}>-</button>;
  }
}

class Count extends React.Component {
  render() {
    return <p>{this.props.value}</p>;
  }
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
    this.setState({
      num: this.state.num + 1,
    });
  }

  subtract() {
    this.setState({
      num: this.state.num - 1,
    });
  }

  render() {
    return (
      <div>
        <CounterPlus onClick={this.add} />
        <CounterMinus onClick={this.subtract} />
        <Count value={this.state.num} />
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Counter />);
