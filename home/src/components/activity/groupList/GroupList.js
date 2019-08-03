import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { ListItem, List } from '@material-ui/core';

import GroupFeed from './GroupFeed';
const styles = (theme) => ({
	root: {
		width: '100%',
		overflow: 'auto',
		textAlign: 'center'
	}
});

class GroupList extends React.Component {
	render() {
		const { classes, groups } = this.props;
		return (
			<div className={classes.root}>
				<GroupFeed groups={groups} />
			</div>
		);
	}
}
GroupList.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(GroupList));
