import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ContactItem from './ContactItem';
const styles = (theme) => {};
class ContactFeed extends Component {
	render() {
		const { contacts } = this.props;

		return contacts.map((contact) => (
			<ContactItem key={contact.id} contact={contact} activityID={this.props.activityID} />
		));
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(ContactFeed));
