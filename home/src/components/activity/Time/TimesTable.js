import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';
import TimeFeed from './TimeFeed';

const styles = (theme) => {};
class TimesTable extends Component {
	render() {
		const { times, classes } = this.props;

		return (
			<Paper className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell align='center'>day</TableCell>
							<TableCell align='center'>Start time</TableCell>
							<TableCell align='center'>End time</TableCell>
							<TableCell align='center'>is_weekly</TableCell>
							<TableCell align='center'>place</TableCell>
							<TableCell align='center'>X</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TimeFeed times={times} />
					</TableBody>
				</Table>
			</Paper>
		);
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(TimesTable));
