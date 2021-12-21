import React from "react";

export default class ClassTest extends React.Component {
  state = {
    number: 0,
  };
  alertNum = () => {
    setTimeout(() => {
      alert(this.state.number);
    }, 1000);
  };
  render() {
    return (
      <div>
        this is class test
        <p>{this.state.number}</p>
        <button
          onClick={() => this.setState({ number: this.state.number + 1 })}
        >
          addNumber
        </button>
        <button onClick={this.alertNum}>alertNum</button>
      </div>
    );
  }
}
