import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from './../../utils/config';
import { withStyles } from '@material-ui/core/styles';
import customStyles from './../../theme/customStyles';
import { addNewActivity } from '../../actions/activity';
import { Paper, Typography, TextField, Button, Avatar } from '@material-ui/core';
import Title from '../common/Title';
import IconItem from '../common/icons/IconItem';
import isEmpty from './../../validation/is-empty';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ImageUploader from 'react-images-upload';
const styles = (theme) => ({
	switchContainer: {
		width: '100%',
		textAlign: 'center'
	},
	button: {
		margin: '10px'
	},
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
		position: 'fixed',
		height: 'calc(100vh - 200px)',
		top: '100px',
		left: 'calc(50% - 200px)',
		minWidth: '300px',
		overflow: 'auto'
	},
	closeIcon: {
		textAlign: 'right'
	}
});

class ActivityForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: '',
			pictures: [],
			logo: null,
			isActive: false
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onDrop = this.onDrop.bind(this);
	}

	componentDidMount() {}

	componentWillReceiveProps(nextProps) {}
	onSubmit(e) {
		e.preventDefault();
		const activityData = {
			name: this.state.name,
			description: this.state.description,
			logo: this.state.pictures[0],
			is_active: this.state.isActive === true ? 1 : 0
		};

		this.props.addNewActivity(activityData);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	handleChange = (name) => (event) => {
		this.setState({ isActive: event.target.checked });
	};
	onDrop(picture, file) {
		this.setState({
			pictures: this.state.pictures.concat(picture),
			logo: file
		});
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
					<Title text='ActivityForm' color={this.props.theme.palette.primary.main} icon='lock' />
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
							imgExtension={[ '.jpg', '.gif', '.png', '.gif' ]}
							maxFileSize={5242880}
							singleImage={true}
							withPreview={true}
							name='fileInput'
							className='imageInputFile'
						/>
						<div className={classes.switchContainer}>
							<FormControlLabel
								labelPlacement='start'
								control={
									<Switch
										checked={this.state.isActive}
										onChange={this.handleChange('isActive')}
										value='isActive'
										color='primary'
										name='isActive'
									/>
								}
								label='Active ?'
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

ActivityForm.propTypes = {
	addNewGroup: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	loading: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
	loading: state.loading,
	group: state.group
});

export default connect(mapStateToProps, { addNewActivity })(withStyles(styles, { withTheme: true })(ActivityForm));
