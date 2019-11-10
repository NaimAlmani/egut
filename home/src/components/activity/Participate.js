import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import 'react-animated-slider/build/horizontal.css';
import { Button } from '@material-ui/core';
import { participate } from './../../actions/forms';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Form,
	TextField
} from '@material-ui/core';

import ReCAPTCHA from 'react-google-recaptcha';

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
class Participate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			tel: '',
			captcha: '',
			captchaError: false
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
		if (this.state.captcha === '' || this.state.captcha === null) {
			this.setState({ captchaError: true });
		} else {
			const data = {
				name: this.state.name,
				email: this.state.email,
				tel: this.state.tel,
				activity_id: this.props.activity.id,
				captcha: this.state.captcha
			};
			this.props.participate(data);
			this.props.onClose();
		}
	};
	render() {
		const { classes, open, onClose, onSend } = this.props;
		return (
			<Dialog open={open} onClose={onClose} aria-labelledby='form-dialog-title'>
				<DialogTitle id='form-dialog-title'>Delta</DialogTitle>
				<DialogContent>
					<DialogContentText>Delta med oss gärna</DialogContentText>
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
							variant='outlined'
							autoFocus
							margin='dense'
							id='name'
							label='din telefon'
							type='telephone'
							fullWidth
							required
							name='tel'
							value={this.state.tel}
							onChange={this.onChange}
						/>
						<ReCAPTCHA sitekey='6LcMxr0UAAAAAMFOSMPIGAUSPTnEXpb4DZtY97gM' onChange={this.captchaChange} />
						{this.state.captchaError === true ? (
							<h6 style={{ color: '#f00' }}>obligatoriskt fält</h6>
						) : null}
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color='secondary'>
						Avbryt
					</Button>
					<Button onClick={this.onSubmit} color='primary'>
						Delta
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}
const mapStateToProps = (state) => ({
	loading: state.loading
});

export default connect(mapStateToProps, { participate })(withStyles(styles, { withTheme: true })(Participate));
