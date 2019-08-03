import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import customStyles from './../../theme/customStyles';
import { loginUser } from '../../actions/auth';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Title from '../common/Title';

const styles = (theme) => customStyles(theme);

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
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
			email: this.state.email,
			password: this.state.password
		};

		this.props.loginUser(userData);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { errors } = this.state;
		const { classes } = this.props;
		return (
			<div style={styles.mainLoginCont}>
				<Paper className={(classes.root, classes.LoginPaper)} elevation={1} style={{ marginBottom: '20px' }}>
					<Title text='Login' icon='lock' />
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
							value={this.state.email}
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
							value={this.state.password}
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
						Login
					</Button>
				</Paper>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	loading: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
	loading: state.loading
});

export default connect(mapStateToProps, { loginUser })(withStyles(styles, { withTheme: true })(Login));
