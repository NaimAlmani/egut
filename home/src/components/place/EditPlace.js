import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from './../../utils/config';
import { withStyles } from '@material-ui/core/styles';
import customStyles from './../../theme/customStyles';
import { updatePlace, showEditPlace } from '../../actions/place';
import { Paper, Typography, TextField, Button, FormControlLabel, Switch } from '@material-ui/core';
import ImageUploader from 'react-images-upload';
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
	},
	mediaContaier: {
		width: '40%',
		height: 'auto',
		margin: '0 auto'
	},
	image: {
		// ⚠️ object-fit is not supported by IE 11.
		objectFit: 'cover',
		width: '100%'
	}
});

class EditPlace extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			description: '',
			favorite: false,
			pictures: [],
			image: ''
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.handleSwitchChange = this.handleSwitchChange.bind(this);
	}

	componentDidMount() {
		if (!isEmpty(this.props.place.selectedPlace)) {
			this.setState({
				name: this.props.place.selectedPlace.name,
				description: this.props.place.selectedPlace.description,
				favorite: this.props.place.selectedPlace.favorite,
				image: this.props.place.selectedPlace.image
			});
		}
	}

	componentWillReceiveProps(nextProps) {}
	onCancel() {
		this.props.showEditPlace(this.props.selectedPlace, false);
	}
	onDrop(picture, file) {
		this.setState({
			pictures: this.state.pictures.concat(picture),
			image: file
		});
	}
	handleSwitchChange = (event) => {
		this.setState({ favorite: event.target.checked });
	};
	onSubmit(e) {
		e.preventDefault();
		const placeData = {
			id: this.props.place.selectedPlace.id,
			name: this.state.name,
			description: this.state.description,
			favorite: this.state.favorite,
			image: this.state.pictures[0]
		};
		this.props.updatePlace(placeData);
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
						<span onClick={this.onCancel} style={{ cursor: 'pointer', width: 'auto' }}>
							<IconItem name='x' type='Feather' />
						</span>
					</div>
					<Title text='Edit Place' color={this.props.theme.palette.primary.main} icon='map' />
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
								value={this.state.name}
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
								value={this.state.description}
							/>
						</div>
						<FormControlLabel
							control={
								<Switch
									checked={this.state.favorite}
									onChange={this.handleSwitchChange}
									value='favorite'
									color='secondary'
								/>
							}
							label='Favorite'
						/>
						<ImageUploader
							withIcon={true}
							buttonText='Choose images'
							onChange={this.onDrop}
							imgExtension={[ '.jpg', '.gif', '.png', '.gif' ]}
							maxFileSize={5242880}
							singleImage={true}
							withPreview={true}
							name='fileInput'
							className='imageInputFile'
						/>

						<div style={{ textAlign: 'right' }}>
							<Button
								variant='outlined'
								color='primary'
								className={classes.button}
								size='large'
								type='submit'
							>
								Update
							</Button>
							<Button
								variant='outlined'
								color='error'
								className={classes.button}
								size='large'
								onClick={this.onCancel}
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

EditPlace.propTypes = {
	updatePlace: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { updatePlace, showEditPlace })(
	withStyles(styles, { withTheme: true })(EditPlace)
);
