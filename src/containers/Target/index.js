import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { random } from '../../utils/helpers';

export class Target extends Component {
  static propTypes = {
    number: PropTypes.number.isRequired
  };

  static defaultProps = {
    number: 0
  };

  shouldComponentUpdate({ number }) {
    const { number: propsNumber } = this.props;

    return propsNumber !== number;
  }

  render() {
    const { number } = this.props;
    const visibility = number ? 'visible' : 'hidden';
    const rand = `${random(0, 100)}%`;

    const style = {
      position: 'absolute',
      left: rand,
      top: rand,
      fontSize: 40,
      cursor: 'pointer',
      visibility
    };

    return (
      <span style={style} className="target">
        {number}
      </span>
    );
  }
}
