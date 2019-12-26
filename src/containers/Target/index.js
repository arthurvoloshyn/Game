import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { random } from '../../utils/helpers';

export class Target extends Component {
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

Target.propTypes = {
  number: PropTypes.number.isRequired
};

Target.defaultProps = {
  number: 0
};
