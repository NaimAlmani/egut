import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import 'react-animated-slider/build/horizontal.css';
import { Button, Typography } from '@material-ui/core';
import { subscripeEmail } from './../../actions/forms';
import IconItem from './../common/icons/IconItem';
import { TextField, Paper } from '@material-ui/core';
import { withTheme, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
const styles = (theme) => ({
	container: {
		textAlign: 'center',
		width: '95%',
		margin: '0 auto',
		background: '#FAFAFA',
		minHeight: '300px',
		padding: '20px'
	},
	form: {
		width: '50%',
		margin: '10px auto'
	},
	overlay: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		opacity: '0.6'
	},

	TextFieldCont: {
		display: 'inline-flex',
		width: '70%',
		margin: '10px'
	},
	btnCont: {
		display: 'inline-flex',
		width: '25%',
		margin: '10px'
	},
	title: {
		width: '100%',
		textAlign: 'center',
		margin: '20px auto'
	},

	root: {
		'&:input': {
			borderColor: '#333 !important'
		}
	}
});

const textTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#333'
		}
	}
});

class Subscription extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: ''
		};
	}
	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onSubmit = (e) => {
		e.preventDefault();
		const data = {
			email: this.state.email
		};
		this.props.subscripeEmail(data);
	};
	render() {
		const { classes } = this.props;
		return (
			<Paper className={classes.container}>
				<Typography variant='h3' className={classes.title}>
					Subscription
				</Typography>
				<Typography variant='subtitle1'>lägger till dig e-post till vår e-postlista för att få </Typography>
				<Typography variant='subtitle2'>de senaste nyheterna, aktiviteterna, evenemangen ..</Typography>

				<form onSubmit={this.onSubmit} className={classes.form}>
					<div className={classes.TextFieldCont}>
						<TextField
							variant='outlined'
							autoFocus
							margin='dense'
							id='name'
							label='Ditt e-post'
							type='email'
							fullWidth
							required
							name='email'
							value={this.state.name}
							onChange={this.onChange}
							inputProps={{
								style: {
									borderColor: '#fff !important'
								}
							}}
							InputLabelProps={{
								color: '#fff'
							}}
						/>
					</div>
					<div className={classes.btnCont}>
						<Button size='large' variant='outlined' color='primary' type='submit'>
							<span className='notranslate'>
								<IconItem name='subscriptions' font='MaterialIcons' size={16} />
							</span>
							Prenumeration
						</Button>
					</div>
				</form>
			</Paper>
		);
	}
}
const mapStateToProps = (state) => ({
	loading: state.loading
});

export default connect(mapStateToProps, { subscripeEmail })(withStyles(styles, { withTheme: true })(Subscription));
