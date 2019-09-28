import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from './../../utils/config';
import { withStyles } from '@material-ui/core/styles';
import customStyles from './../../theme/customStyles';
import { updateOrg, showEdit } from '../../actions/organization';
import { Paper, Typography, TextField, Button, Avatar } from '@material-ui/core';
import Title from '../common/Title';
import ImageUploader from 'react-images-upload';
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

class EditOrg extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			description: '',
			pictures: [],
			logo: null,
			oldLogo: ''
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	componentDidMount() {
		if (!isEmpty(this.props.organization.selectedOrg)) {
			this.setState({
				name: this.props.organization.selectedOrg.name,
				description: this.props.organization.selectedOrg.description,
				oldLogo: this.props.organization.selectedOrg.logoPath
			});
		}
	}

	componentWillReceiveProps(nextProps) {}
	onCancel() {
		this.props.showEdit(this.props.selectedOrg, false);
	}
	onDrop(picture, file) {
		this.setState({
			pictures: this.state.pictures.concat(picture),
			logo: file
		});
	}
	onSubmit(e) {
		e.preventDefault();
		const newLogo = !isEmpty(this.state.pictures) ? this.state.pictures[0] : null;
		const orgData = {
			id: this.props.organization.selectedOrg.id,
			name: this.state.name,
			description: this.state.description,
			logo: newLogo
		};
		this.props.updateOrg(orgData);
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
					<Title text='EditOrg' color={this.props.theme.palette.primary.main} icon='lock' />
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
						<div className={classes.oldImageCont}>
							<label>The current logo: </label>
							<div className={classes.mediaContaier}>
								<img
									className={classes.image}
									src={config.imagesPath + this.state.oldLogo}
									alt='logo'
								/>
							</div>
						</div>
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

EditOrg.propTypes = {
	updateOrg: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	loading: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
	loading: state.loading,
	organization: state.organization
});

export default connect(mapStateToProps, { updateOrg, showEdit })(withStyles(styles, { withTheme: true })(EditOrg));
