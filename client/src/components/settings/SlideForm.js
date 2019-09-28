import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from './../../utils/config';
import { withStyles } from '@material-ui/core/styles';
import customStyles from './../../theme/customStyles';
import { addNewSlide } from '../../actions/slide';
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
		minWidth: '300px',
		height: '75vh',
		overflow: 'auto'
	},
	button: {
		margin: theme.spacing.unit
	},
	closeIcon: {
		textAlign: 'right'
	}
});

class SlideForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			subtitle: '',
			pictures: [],
			image: ''
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleSwitchChange = this.handleSwitchChange.bind(this);
		this.onDrop = this.onDrop.bind(this);
	}

	componentDidMount() {
		if (!isEmpty(this.props.slide.selectedPlace)) {
			this.setState({
				title: this.props.slide.selectedPlace.title,
				subtitle: this.props.slide.selectedPlace.subtitle,
				favorite: this.props.slide.selectedPlace.favorite,
				image: this.props.slide.selectedPlace.image
			});
		}
	}

	componentWillReceiveProps(nextProps) {}

	onDrop(picture, file) {
		this.setState({
			pictures: this.state.pictures.concat(picture),
			image: file
		});
	}
	onSubmit(e) {
		e.preventDefault();
		const newLogo = !isEmpty(this.state.pictures) ? this.state.pictures[0] : null;
		const placeData = {
			title: this.state.title,
			subtitle: this.state.subtitle,
			image: newLogo
		};
		this.props.addNewSlide(placeData);
		this.props.onCancel();
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	handleSwitchChange = (event) => {
		this.setState({ favorite: event.target.checked === true ? 1 : 0 });
	};
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
					<Title text='SlideForm' color={this.props.theme.palette.primary.main} icon='lock' />
					<form onSubmit={this.onSubmit} encType='multipart/form-data'>
						<div className={classes.FieldContainer}>
							<TextField
								id='outlined-email-input'
								label='Name'
								className={(classes.textField, classes.textfield)}
								type='text'
								name='title'
								autoComplete='title'
								margin='normal'
								variant='outlined'
								fullWidth={true}
								onChange={this.onChange}
							/>
						</div>

						<div className={classes.FieldContainer}>
							<TextField
								id='outlined-email-input'
								label='Subtitle'
								className={(classes.textField, classes.textfield)}
								type='text'
								name='subtitle'
								margin='normal'
								variant='outlined'
								fullWidth={true}
								onChange={this.onChange}
							/>
						</div>
						<ImageUploader
							withIcon={true}
							buttonText='Choose images'
							onChange={this.onDrop}
							imgExtension={[ '.jpg', '.gif', '.png', '.gif', '.jpeg' ]}
							maxFileSize={10000000}
							label='Max image size 10 mb'
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

SlideForm.propTypes = {
	addNewSlide: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	loading: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
	loading: state.loading,
	slide: state.slide
});

export default connect(mapStateToProps, { addNewSlide })(withStyles(styles, { withTheme: true })(SlideForm));
