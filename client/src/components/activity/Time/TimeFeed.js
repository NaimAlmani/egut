import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TimeItem from './TimeItem';
const styles = (theme) => {};
class GroupFeed extends Component {
	render() {
		const { times } = this.props;

		return times.map((time) => <TimeItem key={time.id} time={time} activityID={this.props.activityID} />);
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(GroupFeed));
