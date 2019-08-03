import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from './../../utils/config';
import { withStyles } from '@material-ui/core/styles';
import customStyles from './../../theme/customStyles';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import Icon from 'react-web-vector-icons';

import { updateGroup, showEditGroup } from '../../actions/group';
import { addNewGroup, resetIcon, showIcon, selectGroupIcon } from '../../actions/group';
import IconsList from './../icons/IconsList';
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
	},
	//icon container style
	iconCont: {
		textAlign: 'center',
		margin: '10px'
	},
	IconCircle: {
		background: theme.palette.primary.main,
		width: '100px',
		height: '100px',
		margin: '0 auto',
		borderRadius: '50%',
		textAlign: 'center',
		paddingTop: '5px'
	},
	chooseIcon: {
		background: theme.palette.primary.main,
		width: '100px',
		height: '100px',
		margin: '0 auto',
		borderRadius: '50%',
		textAlign: 'center',
		paddingTop: '20px'
	}
});

class EditGroup extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			description: ''
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.chooseIcon = this.chooseIcon.bind(this);
	}

	componentDidMount() {
		this.setState({
			name: this.props.group.selectedGroup.name,
			description: this.props.group.selectedGroup.description,
			icon_name: this.props.group.icon_name,
			icon_font: this.props.icon_font
		});
		this.props.selectGroupIcon({
			name: this.props.group.selectedGroup.icon_name,
			type: this.props.group.selectedGroup.icon_font
		});
	}

	componentWillReceiveProps(nextProps) {}
	onCancel() {
		this.props.showEditGroup(this.props.selectedGroup, false);
	}
	onSubmit(e) {
		e.preventDefault();
		const placeData = {
			id: this.props.group.selectedGroup.id,
			name: this.state.name,
			description: this.state.description,
			icon_name: this.props.group.icon.name,
			icon_font: this.props.group.icon.type
		};
		this.props.updateGroup(placeData);
		this.props.showEditGroup(this.props.selectedGroup, false);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	chooseIcon() {
		this.props.showIcon(true);
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
					<Title text='Edit Group' color={this.props.theme.palette.primary.main} icon='map' />
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
						<div className={classes.iconCont}>
							{!isEmpty(this.props.group.icon) ? (
								<Button color='primary' className={classes.IconCircle} onClick={this.chooseIcon}>
									<Icon
										font={this.props.group.icon.type}
										name={this.props.group.icon.name}
										color={'#fff'}
										size={50}
									/>
								</Button>
							) : (
								<Button color='primary' className={classes.chooseIcon} onClick={this.chooseIcon}>
									<p style={{ color: '#fff' }}>Icon</p>
								</Button>
							)}
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
				{this.props.group.isShowIcons === true ? (
					<IconsList onClose={this.hideIcons} iconParent={'group'} />
				) : null}
			</div>
		);
	}
}

EditGroup.propTypes = {
	updateGroup: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { updateGroup, showEditGroup, showIcon, resetIcon, selectGroupIcon })(
	withStyles(styles, { withTheme: true })(EditGroup)
);
