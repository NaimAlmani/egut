import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import EmailsTab from './EmailsTab';
import Title from '../common/Title';
import EmailDetails from './EmailDetails';
const styles = (theme) => ({
	emailContent: {
		width: 'calc(100%  - 16%)',
		display: 'flex-inline'
	}
});
class EmailsMain extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {}
	render() {
		const { classes, email } = this.props;
		const { emails, selectedEmail } = email;
		return (
			<div style={{ width: '100vw' }}>
				<Title text='Emails' subText='' color={this.props.theme.palette.primary.main} />
				<Grid container>
					<Grid item md={4}>
						<EmailsTab emails={emails} />
					</Grid>

					<Grid item md={8}>
						<div className={classes.emailDetCont}>
							<EmailDetails email={selectedEmail} />
						</div>
					</Grid>
				</Grid>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	email: state.email
});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(EmailsMain));
