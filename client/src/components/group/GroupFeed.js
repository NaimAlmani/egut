import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import GroupItem from './GroupItem';
const styles = (theme) => {};
class GroupFeed extends Component {
	render() {
		const { groups } = this.props;

		return groups.map((group, index) => <GroupItem key={group.id} group={group} index={index} />);
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(GroupFeed));
