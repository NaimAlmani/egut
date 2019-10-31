import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import SubscriptionItem from './SubscriptionItem';
const styles = (theme) => {};
class SubscriptionFeed extends Component {
	render() {
		const { subs } = this.props;

		return subs.map((sub, index) => <SubscriptionItem key={sub.id} sub={sub} index={index} />);
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(SubscriptionFeed));
