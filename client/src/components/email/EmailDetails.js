import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Divider, Button } from '@material-ui/core';
import IconItem from '../common/icons/IconItem';
import SendEmail from './SendEmail';
import isEmpty from '../../validation/is-empty';
const styles = (theme) => ({
	emailContent: {
		width: 'calc(100%  - 16%)',
		display: 'flex-inline'
	},
	messageCont: {
		marginTop: '30px'
	},
	paperRoot: {
		padding: '20px',
		margin: '0  10px',
		width: 'calc(100%)',
		height: 'calc(100vh - 175px)',
		position: 'relative',
		overflow: 'auto'
	},
	date: {
		position: 'absolute',
		right: '20px',
		top: '20px',
		fontSize: '1em',
		color: '#9E9E9E'
	},
	replyCont: {
		position: 'absolute',
		right: '20px',
		top: '40px',
		fontSize: '1em'
	},
	sender: {
		color: 'rgba(0,0,0,0.35)'
	},
	email: {
		color: 'rgba(0,0,0,0.5)'
	}
});
class EmailDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showSend: false
		};
	}
	onShowSend = () => {
		this.setState({
			showSend: true
		});
	};
	onHideSend = () => {
		this.setState({
			showSend: false
		});
	};
	createMarkup() {
		return { __html: this.props.email.message };
	}
	componentDidMount() {}
	render() {
		const { classes, email } = this.props;
		return (
			<div>
				<Paper classes={{ root: classes.paperRoot }}>
					{!isEmpty(email) ? (
						<div>
							<h3 className={classes.subject}>{email.subject}</h3>
							<h5 className={classes.sender}>Sender : {email.name}</h5>
							<h6 className={classes.email}>Email : {email.email}</h6>
							<Divider />
							<div className={classes.messageCont}>
								<div dangerouslySetInnerHTML={this.createMarkup()} />
							</div>
							<div className={classes.date}>
								<span>{email.created_at}</span>
							</div>
							{email.income === 1 && (
								<div className={classes.replyCont}>
									<Button onClick={this.onShowSend}>
										<IconItem name='reply' font='MaterialIcons' />
										<span>Reply</span>
									</Button>

									<Button href={'mailto:' + email.email}>
										<IconItem name='email' font='MaterialIcons' />
										<span>Reply by email client</span>
									</Button>
								</div>
							)}
						</div>
					) : (
						<p>Please select an email</p>
					)}
				</Paper>
				<SendEmail open={this.state.showSend} email={email} onClose={this.onHideSend} />
			</div>
		);
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(EmailDetails));
