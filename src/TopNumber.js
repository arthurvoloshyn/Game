import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
const yellow = 'rgb(255, 215, 18)';

export class TopNumber extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 'highest': 0 };
  }

  componentWillUpdate(nextProps, nextState) {
    if (document.body.style.background != yellow && this.state.highest >= 950*1000) {
      document.body.style.background = yellow;
    } else if (!this.props.game && nextProps.game) {
      document.body.style.background = 'white';
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.number > this.state.highest) {
      this.setState({
        highest: nextProps.number
      });
    }
  }

  render() {
    return (
      <h1>
        Top Number: {this.state.highest}
      </h1>
    );
  }
}

TopNumber.propTypes = {
  number: PropTypes.number,
  game: PropTypes.bool
};