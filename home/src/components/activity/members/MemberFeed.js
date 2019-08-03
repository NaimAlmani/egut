import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import MemberItem from './MemberItem';
const styles = (theme) => {};
class MemberFeed extends Component {
	render() {
		const { members } = this.props;

		return members.map((member) => (
			<MemberItem key={member.id} member={member} activityID={this.props.activityID} />
		));
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(MemberFeed));
