import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import customStyles from './../../theme/customStyles';
import { registerUser } from '../../actions/auth';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Title from '../common/Title';

const styles = theme => customStyles(theme);

class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			c_password: '',
			errors: {},
			isLoggingIn: false
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}

		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
		if (nextProps.auth.isLoggingIn) {
			this.setState({ isLoggingIn: nextProps.isLoggingIn });
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const userData = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			c_password: this.state.c_password
		};
		this.props.registerUser(userData);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { classes } = this.props;
		return (
			<div style={styles.mainLoginCont}>
				<Paper className={(classes.root, classes.LoginPaper)} elevation={1}>
					<Title
						text='Register'
						color={this.props.theme.palette.purple.active}
						icon='lock'
					/>
					<div className={classes.FieldContainer}>
						<TextField
							id='outlined-email-input'
							label='Name'
							className={(classes.textField, classes.textfield)}
							type='text'
							name='name'
							autoComplete='name'
							margin='normal'
							variant='outlined'
							fullWidth={true}
							onChange={this.onChange}
						/>
					</div>
					<div className={classes.FieldContainer}>
						<TextField
							id='outlined-email-input'
							label='Email'
							className={(classes.textField, classes.textfield)}
							type='email'
							name='email'
							autoComplete='email'
							margin='normal'
							variant='outlined'
							fullWidth={true}
							onChange={this.onChange}
						/>
					</div>
					<div className={classes.FieldContainer}>
						<TextField
							id='outlined-password-input'
							label='Password'
							name='password'
							className={classes.textField}
							type='password'
							autoComplete='current-password'
							margin='normal'
							variant='outlined'
							fullWidth={true}
							onChange={this.onChange}
						/>
					</div>
					<div className={classes.FieldContainer}>
						<TextField
							id='outlined-password-input'
							label='Password'
							name='c_password'
							className={classes.textField}
							type='password'
							autoComplete='current-password'
							margin='normal'
							variant='outlined'
							fullWidth={true}
							onChange={this.onChange}
						/>
					</div>
					<Button
						variant='outlined'
						color='primary'
						className={classes.fullWidthButton}
						size='large'
						fullWidth
						onClick={this.onSubmit}
					>
						Register
					</Button>
				</Paper>
			</div>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	loading: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	loading: state.loading
});

export default connect(
	mapStateToProps,
	{ registerUser }
)(withStyles(styles, { withTheme: true })(Register));
