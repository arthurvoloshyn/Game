import React, { Component } from 'react';
import PropTypes from 'prop-types';

const yellow = 'rgb(255, 215, 18)';
const white = 'rgb(255, 255, 255)';

export class TopNumber extends Component {
  static propTypes = {
    number: PropTypes.number,
    game: PropTypes.bool
  };

  static defaultProps = {
    number: 0,
    game: false
  };

  state = { highest: 0 };

  UNSAFE_componentWillUpdate({ game }) {
    const { background } = document.body.style;
    const { highest } = this.state;
    const { game: propsGame } = this.props;

    if (background !== yellow && highest >= 950 * 1000) {
      document.body.style.background = yellow;
    } else if (!propsGame && game) {
      document.body.style.background = white;
    }
  }

  UNSAFE_componentWillReceiveProps({ number }) {
    const { highest } = this.state;

    if (number > highest) {
      this.setState({
        highest: number
      });
    }
  }

  render() {
    const { highest } = this.state;

    return <h1>Top Number: {highest}</h1>;
  }
}
