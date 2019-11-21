import React from 'react';
import PropTypes from 'prop-types';

const style = {
	fontSize: 110,
	color: 'lightgrey',
	position: 'absolute',
	top: '30%'
};

export const Display = ({ number }) => {
	return (
		<div style={style}>
			{number}
		</div>
	);
}

Display.propTypes = {
	number: PropTypes.number.isRequired
};
