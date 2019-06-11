import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ActivityItem from './ActivityItem';
const styles = (theme) => {};
class ActivityFeed extends Component {
	render() {
		const { activities } = this.props;

		return activities.map((activity) => <ActivityItem key={activity.id} activity={activity} />);
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(ActivityFeed));
