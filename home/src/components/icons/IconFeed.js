import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconItem from './IconItem';

class IconFeed extends Component {
	render() {
		const { icons } = this.props;

		return icons.map((icon, index) => <IconItem key={index} icon={icon} iconParent={this.props.iconParent} />);
	}
}

IconFeed.propTypes = {
	icons: PropTypes.array.isRequired
};

export default IconFeed;
