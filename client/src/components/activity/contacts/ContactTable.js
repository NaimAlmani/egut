import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';
import ContactFeed from './ContactFeed';

const styles = (theme) => {};
class ContactTable extends Component {
	render() {
		const { contacts, classes } = this.props;

		return (
			<Paper className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell align='center'>bild</TableCell>
							<TableCell align='center'>namn</TableCell>
							<TableCell align='center'>e-post</TableCell>
							<TableCell align='center'>tel</TableCell>
							<TableCell align='center'>X</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<ContactFeed contacts={contacts} activityID={this.props.activityID} />
					</TableBody>
				</Table>
			</Paper>
		);
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(ContactTable));
