import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ContactChip from './ContactChip';
const styles = (theme) => {};
class ContactFeed extends Component {
	render() {
		const { contacts } = this.props;

		return contacts.map((contact) => (
			<ContactChip key={contact.id} contact={contact} activityID={this.props.activityID} />
		));
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(ContactFeed));
