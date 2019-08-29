import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import EmailListItem from './EmailListItem';
const styles = (theme) => {};
class EmailFeed extends Component {
	render() {
		const { emails } = this.props;

		return emails.map((email, index) => <EmailListItem key={email.id} email={email} index={index} />);
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(EmailFeed));
