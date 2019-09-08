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
import { Container, Row, Col } from 'reactstrap';

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
		textAlign: 'center'
	},
	overlay: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		opacity: '0.6'
	},

	TextFieldCont: {
		display: 'inline-flex',
		margin: '10px',
		minWidth: '300px'
	},
	btnCont: {
		display: 'inline-flex',
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
			<Container>
				<Typography variant='h4' className={classes.title}>
					Prenumerera på vårt nyhetsbrev!
				</Typography>
				<Row>
					<Col sm='12' md={{ size: 6, offset: 3 }}>
						<form onSubmit={this.onSubmit} className={classes.form}>
							<div className={classes.TextFieldCont}>
								<TextField
									variant='outlined'
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
									Skicka
								</Button>
							</div>
						</form>
					</Col>
				</Row>
			</Container>
		);
	}
}
const mapStateToProps = (state) => ({
	loading: state.loading
});

export default connect(mapStateToProps, { subscripeEmail })(withStyles(styles, { withTheme: true })(Subscription));
