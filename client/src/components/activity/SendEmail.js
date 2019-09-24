import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { sendToActivityMembers } from './../../actions/email';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Form,
	TextField,
	Typography
} from '@material-ui/core';
import RichText from './../common/RichText';

const styles = (theme) => ({
	slideContent: {
		width: '100%'
	},
	contentContanier: {
		textAlign: 'center',
		width: '50%',
		margin: '0 auto',
		lineHeight: '100'
	},
	overlay: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		opacity: '0.6'
	},
	btn: {
		color: '#fff',
		borderColor: '#fff'
	},
	multilineStyle: {
		height: '300px'
	}
});
class SendEmail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			message: ''
		};
	}
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onSubmit = () => {
		const data = {
			subject: this.state.name,
			message: this.state.message,
			activity_id: this.props.currentActivity.id
		};
		this.props.sendToActivityMembers(data);
		this.props.onCancel();
	};
	onChangeTextEditor = (value) => {
		this.setState({
			message: value
		});
	};
	render() {
		const { classes, open, onCancel, onSend } = this.props;
		return (
			<Dialog open={open} onClose={onCancel} aria-labelledby='form-dialog-title'>
				<DialogTitle id='form-dialog-title'>Skicka till medlemmar</DialogTitle>
				<DialogContent>
					<DialogContentText>Skicka e-post</DialogContentText>
					<form onSubmit={this.onSubmit}>
						<TextField
							variant='outlined'
							autoFocus
							margin='dense'
							id='name'
							label='Subject'
							type='text'
							fullWidth
							required
							name='name'
							value={this.state.name}
							onChange={this.onChange}
						/>

						<div className={classes.RichFieldContainer}>
							<Typography>meddelande:</Typography>
							<RichText onChange={this.onChangeTextEditor} value={this.state.message} />
						</div>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={onCancel} color='secondary'>
						Avbryt
					</Button>
					<Button onClick={this.onSubmit} color='primary'>
						Skicka
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}
const mapStateToProps = (state) => ({
	loading: state.loading
});

export default connect(mapStateToProps, { sendToActivityMembers })(withStyles(styles, { withTheme: true })(SendEmail));
