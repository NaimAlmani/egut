import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GroupItem from './GroupItem';

class GroupFeed extends Component {
	render() {
		const { groups } = this.props;

		return groups.map((group) => <GroupItem key={group.id} group={group} />);
	}
}

GroupFeed.propTypes = {};

export default GroupFeed;
