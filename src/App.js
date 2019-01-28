import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { TopNumber } from './TopNumber';
import { Display } from './Display';
import { Target } from './Target';
import { random, clone } from './helpers'; 
import { Enthused } from './Enthused';

const fieldStyle = {
  position: 'absolute',
  width: 250,
  bottom: 60,
  left: 10,
  height: '60%',
};

class App extends Component {
    constructor(props) {
      super(props);

      this.state = {
        game: false,
        targets: {},
        latestClick: 0,

        enthused: false,
        text: ''
      };

      this.intervals = null;

      this.hitTarget = this.hitTarget.bind(this);
      this.startGame = this.startGame.bind(this);
      this.endGame = this.endGame.bind(this);

      this.toggleEnthusiasm = this.toggleEnthusiasm.bind(this);
      this.addText = this.addText.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.latestClick <          prevState.latestClick) {
  this.endGame();
}
  }

  createTarget(key, ms) {
    ms = ms || random(500, 2000);
    this.intervals.push(setInterval(function(){
      let targets = clone(this.state.targets);
      let num = random(1, 1000*1000);
      targets[key] = targets[key] != 0 ? 0 : num;
      this.setState({ targets: targets });
    }.bind(this), ms));
  }

  hitTarget(e) {
    if (e.target.className != 'target') return;
    let num = parseInt(e.target.innerText);
    for (let target in this.state.targets) {
      let key = Math.random().toFixed(4);
      this.createTarget(key);
    }
    this.setState({ latestClick: num });
  }

  startGame() {
    this.createTarget('first', 750);
    this.setState({
      game: true
    });
  }

  endGame() {
    this.intervals.forEach((int) => {
      clearInterval(int);
    });
    this.intervals = [];
    this.setState({
      game: false,
      targets: {},
      latestClick: 0
    });
  }

  componentWillMount() {
    this.intervals = [];
  }



  toggleEnthusiasm() {
    this.setState({
      enthused: !this.state.enthused
    });
  }

  setText(text) {
    this.setState({ text: text });
  }

  addText(newText) {
    let text = this.state.text + newText;
    this.setState({ text: text });
  }

  handleChange(e) {
    this.setText(e.target.value);
  }


  render() {

        let buttonStyle = {
      display: this.state.game ? 'none' : 'inline-block'
    };
    let targets = [];
    for (let key in this.state.targets) {
      targets.push(
        <Target 
          number={this.state.targets[key]} 
          key={key} />
      );
    }


    let button;
    if (this.state.enthused) {
      button = (
        <Enthused toggle={this.toggleEnthusiasm} addText={this.addText} />
      );
    } else {
      button = (
        <button onClick={this.toggleEnthusiasm}>
          Add Enthusiasm!
        </button>
      );
    }

    

    return (
      <div>
         <div>
          <TopNumber number={this.state.latestClick} game={this.state.game} />
          <Display number={this.state.latestClick} />
          <button onClick={this.startGame} style={buttonStyle}>
            New Game 
          </button>
          <div style={fieldStyle} onClick={this.hitTarget}>
            {targets}
          </div>
        </div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>    
        <div>
          <textarea rows="7" cols="40" value={this.state.text} 
            onChange={this.handleChange}>
          </textarea>
          {button}
          <h2>{this.state.text}</h2>
        </div>            
      </div>
    );
  }
}

export default App;
