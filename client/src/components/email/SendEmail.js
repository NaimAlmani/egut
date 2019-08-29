import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { sendEmail } from './../../actions/email';
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Form,
	TextField
} from '@material-ui/core';
import IconItem from '../common/icons/IconItem';
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
			subject: '',
			email: '',
			message: ''
		};
	}
	componentDidMount() {
		this.setState({
			email: this.props.email.email
		});
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			email: nextProps.email.email
		});
	}
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onSubmit = () => {
		const data = {
			email: this.state.email,
			message: this.state.message,
			subject: this.state.subject
		};
		this.props.sendEmail(data);
		this.props.onClose();
	};
	render() {
		const { classes, open, onClose, onSend, email } = this.props;
		return (
			<Dialog open={open} onClose={onClose} aria-labelledby='form-dialog-title'>
				<DialogTitle id='form-dialog-title'>Replay to {email.name}</DialogTitle>
				<DialogContent>
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
							name='subject'
							value={this.state.subject}
							onChange={this.onChange}
						/>

						<TextField
							variant='outlined'
							autoFocus
							margin='dense'
							id='name'
							label='Email'
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
							label='Message'
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

export default connect(mapStateToProps, { sendEmail })(withStyles(styles, { withTheme: true })(SendEmail));
