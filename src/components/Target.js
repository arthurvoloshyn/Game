import React, { Component } from 'react';
import { random } from '../utils/helpers';
import PropTypes from 'prop-types';

export class Target extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.number !== nextProps.number;
  }

  render() {
    const { number } = this.props;
    let visibility = number ? 'visible' : 'hidden';
    const rand = `${random(0, 100)}%`;

    let style = {
      position: 'absolute',
      left: rand,
      top: rand,
      fontSize: 40,
      cursor: 'pointer',
      visibility: visibility
    };

    return (
      <span style={style} className="target">
        {number}
      </span>
    )
  }
}

Target.propTypes = {
  number: PropTypes.number.isRequired
};
