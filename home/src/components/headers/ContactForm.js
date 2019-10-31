import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import 'react-animated-slider/build/horizontal.css';
import { Button } from '@material-ui/core';
import { sendEmail } from './../../actions/forms';
import ReCAPTCHA from 'react-google-recaptcha';

import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Form,
	TextField
} from '@material-ui/core';
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
class ContactForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			message: '',
			captcha: ''
		};
	}
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	captchaChange = (e) => {
		this.setState({
			captcha: e
		});
	};
	onSubmit = () => {
		const data = {
			name: this.state.name,
			email: this.state.email,
			message: this.state.message,
			captcha: this.state.captcha
		};
		this.props.sendEmail(data);
		this.props.onClose();
	};
	render() {
		const { classes, open, onClose, onSend } = this.props;
		return (
			<Dialog open={open} onClose={onClose} aria-labelledby='form-dialog-title'>
				<DialogTitle id='form-dialog-title'>Kontakta oss</DialogTitle>
				<DialogContent>
					<DialogContentText>kontakta oss gärna</DialogContentText>
					<form onSubmit={this.onSubmit}>
						<TextField
							variant='outlined'
							autoFocus
							margin='dense'
							id='name'
							label='Ditt namn'
							type='text'
							fullWidth
							required
							name='name'
							value={this.state.name}
							onChange={this.onChange}
						/>
						<TextField
							variant='outlined'
							autoFocus
							margin='dense'
							id='name'
							label='din email'
							type='email'
							fullWidth
							required
							name='email'
							value={this.state.email}
							onChange={this.onChange}
						/>
						<TextField
							autoFocus
							margin='dense'
							id='name'
							label='ditt meddelande'
							type='email'
							fullWidth
							multiline
							required
							variant='outlined'
							inputProps={{ style: { height: '300px' } }}
							name='message'
							value={this.state.message}
							onChange={this.onChange}
						/>
						<ReCAPTCHA sitekey='6LcMxr0UAAAAAMFOSMPIGAUSPTnEXpb4DZtY97gM' onChange={this.captchaChange} />
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color='secondary'>
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

export default connect(mapStateToProps, { sendEmail })(withStyles(styles, { withTheme: true })(ContactForm));
