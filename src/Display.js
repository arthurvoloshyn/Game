import React from 'react';
import PropTypes from 'prop-types';

const style = {
	fontSize: 110,
	color:    'lightgrey',
	position: 'absolute',
	top: '30%',
	transform: 'translate(-50%, 0%)',
	left: '50%',
	marginRight: '-50%'
};

export const Display = (props) => {
	return (
		<div style={style}>
			{props.number}
		</div>
	);
}

Display.propTypes = {
	number: PropTypes.number.isRequired
};