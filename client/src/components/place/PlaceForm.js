import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from './../../utils/config';
import { withStyles } from '@material-ui/core/styles';
import customStyles from './../../theme/customStyles';
import { addNewPlace } from '../../actions/place';
import { Paper, Typography, TextField, Button, Avatar } from '@material-ui/core';
import Title from '../common/Title';
import IconItem from '../common/icons/IconItem';
import isEmpty from './../../validation/is-empty';
const styles = (theme) => ({
	popupPageContainer: {
		position: 'fixed',
		width: '100%',
		height: '100vh',
		top: '0',
		left: '0'
	},
	overlay: {
		width: '100%',
		height: '100%',
		opacity: '0.3',
		background: '#333'
	},
	FormContainer: {
		width: '400px',
		padding: '20px 50px',
		position: 'absolute',
		top: '100px',
		left: 'calc(50% - 200px)',
		minWidth: '300px'
	},
	button: {
		margin: theme.spacing.unit
	},
	closeIcon: {
		textAlign: 'right'
	}
});

class PlaceForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: ''
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		if (!isEmpty(this.props.place.selectedPlace)) {
			this.setState({
				name: this.props.place.selectedPlace.name,
				description: this.props.place.selectedPlace.description
			});
		}
	}

	componentWillReceiveProps(nextProps) {}
	onSubmit(e) {
		e.preventDefault();
		const placeData = {
			name: this.state.name,
			description: this.state.description
		};
		this.props.addNewPlace(placeData);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.popupPageContainer}>
				<div className={classes.overlay} />
				<Paper className={classes.FormContainer} elevation={1}>
					<div className={classes.closeIcon}>
						<span onClick={this.props.onCancel} style={{ cursor: 'pointer', width: 'auto' }}>
							<IconItem name='x' type='Feather' />
						</span>
					</div>
					<Title text='PlaceForm' color={this.props.theme.palette.primary.main} icon='lock' />
					<form onSubmit={this.onSubmit} encType='multipart/form-data'>
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
								label='Description'
								className={(classes.textField, classes.textfield)}
								type='text'
								name='description'
								margin='normal'
								variant='outlined'
								fullWidth={true}
								onChange={this.onChange}
							/>
						</div>

						<div style={{ textAlign: 'right' }}>
							<Button
								variant='outlined'
								color='primary'
								className={classes.button}
								size='large'
								type='submit'
							>
								Add
							</Button>
							<Button
								variant='outlined'
								color='error'
								className={classes.button}
								size='large'
								onClick={this.props.onCancel}
							>
								cancel
							</Button>
						</div>
					</form>
				</Paper>
			</div>
		);
	}
}

PlaceForm.propTypes = {
	addNewPlace: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	loading: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
	loading: state.loading,
	place: state.place
});

export default connect(mapStateToProps, { addNewPlace })(withStyles(styles, { withTheme: true })(PlaceForm));
