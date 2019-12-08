import React, { Component } from 'react';
import { TopNumber } from '../components/TopNumber';
import { Display } from '../components/Display';
import { Target } from '../components/Target';
import { random, clone } from '../utils/helpers';
import './css/App.css';

const width = window.innerWidth < 450 ? 150 : 250;

const fieldStyle = {
  position: 'absolute',
  width,
  bottom: 60,
  left: 10,
  height: '60%',
};

class App extends Component {

  state = {
    game: false,
    targets: {},
    latestClick: 0
  };

  intervals = null;

  componentDidUpdate(prevProps, { latestClick }) {
    if (this.state.latestClick < latestClick) {
      this.endGame();
    }
  }

  createTarget = (key, ms) => {
    ms = ms || random(500, 2000);
    this.intervals.push(setInterval(() => {
      let targets = clone(this.state.targets);
      let num = random(1, 1000 * 1000);
      targets[key] = targets[key] !== 0 ? 0 : num;
      this.setState({ targets: targets });
    }, ms));
  }

  hitTarget = ({ target: { className, innerText } }) => {
    if (className !== 'target') return;
    let num = parseInt(innerText);

    /* eslint-disable no-unused-vars */
    for (let target in this.state.targets) {
      let key = Math.random().toFixed(4);
      this.createTarget(key);
    }
    /* eslint-enable */

    this.setState({ latestClick: num });
  }

  startGame = () => {
    this.createTarget('first', 750);
    this.setState({
      game: true
    });
  }

  endGame = () => {
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

  render() {
    const { game, latestClick, targets } = this.state;
    let buttonStyle = {
      display: game ? 'none' : 'inline-block'
    };
    let targetItems = [];
    for (let key in targets) {
      targetItems.push(
        <Target
          number={targets[key]}
          key={key} />
      );
    }
    return (
      <div>
        <TopNumber number={latestClick} game={game} />
        <Display number={latestClick} />
        <button onClick={this.startGame} style={buttonStyle}>
          New Game
        </button>
        <div style={fieldStyle} onClick={this.hitTarget}>
          {targetItems}
        </div>
      </div>
    );
  }
}

export default App;
