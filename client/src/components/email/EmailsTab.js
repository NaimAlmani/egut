import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import EmailList from './emailList/EmailList';
import { AppBar, Tabs, Tab, Typography, Grid, Paper } from '@material-ui/core';

const styles = (theme) => ({
	emailListCont: {
		background: '#f0f0f0'
	},
	root: {
		minHeight: '200px',
		backgroundColor: '#f0f0f0',
		position: 'relative'
	},
	mainContent: {}
});
class EmailsTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0
		};
	}
	handleChange = (event, newValue) => {
		this.setState({
			value: newValue
		});
	};
	render() {
		const { emails, classes } = this.props;
		const incomeEmails = emails.filter((c) => c.income === 1);
		const sendEmails = emails.filter((c) => c.income === 0);
		return (
			<Paper className={classes.root}>
				<AppBar color='default' position='static'>
					<Tabs
						indicatorColor='primary'
						textColor='primary'
						value={this.state.value}
						onChange={this.handleChange}
					>
						<Tab label={'Income(' + incomeEmails.length + ')'} />
						<Tab label={'Sent(' + sendEmails.length + ')'} />
					</Tabs>
				</AppBar>
				<Typography
					component='div'
					role='tabpanel'
					hidden={this.state.value !== 0}
					id={`simple-tabpanel-${0}`}
					aria-labelledby={`simple-tab-${0}`}
				>
					<div className={classes.emailListCont}>
						<EmailList emails={incomeEmails} />
					</div>
				</Typography>
				<Typography
					component='div'
					role='tabpanel'
					hidden={this.state.value !== 1}
					id={`simple-tabpanel-${'1'}`}
					aria-labelledby={`simple-tab-${'1'}`}
				>
					<div>
						<EmailList emails={sendEmails} />
					</div>
				</Typography>
			</Paper>
		);
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(EmailsTab));
