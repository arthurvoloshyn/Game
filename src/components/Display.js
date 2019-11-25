import React from 'react';
import PropTypes from 'prop-types';

const fontSize = window.innerWidth < 450 ? 60 : 110;

const style = {
	fontSize,
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
