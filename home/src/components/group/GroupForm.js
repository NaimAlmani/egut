import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from './../../utils/config';
import { withStyles } from '@material-ui/core/styles';
import customStyles from './../../theme/customStyles';
import { addNewGroup, resetIcon, showIcon } from '../../actions/group';
import { Paper, Typography, TextField, Button, Avatar } from '@material-ui/core';
import Title from '../common/Title';
import isEmpty from './../../validation/is-empty';
import IconsList from './../icons/IconsList';
import Icon from 'react-web-vector-icons';
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
	},
	button: {
		margin: theme.spacing.unit
	},
	closeIcon: {
		textAlign: 'right'
	}
});

class GroupForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: '',
			showIcons: false
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.chooseIcon = this.chooseIcon.bind(this);
	}

	componentDidMount() {
		this.props.resetIcon();
	}

	onSubmit(e) {
		e.preventDefault();
		const groupData = {
			name: this.state.name,
			description: this.state.description,
			icon_name: this.props.group.icon.name,
			icon_font: this.props.group.icon.type
		};

		this.props.addNewGroup(groupData);
		this.setState({
			name: '',
			description: ''
		});
		this.props.resetIcon();
		this.props.onCancel();
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
						<span onClick={this.props.onCancel} style={{ cursor: 'pointer', width: 'auto' }}>
							<Icon name='x' font='Feather' />
						</span>
					</div>
					<Title text='GroupForm' color={this.props.theme.palette.primary.main} icon='lock' />
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

						<div style={{ textAlign: 'center' }}>
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
					{this.props.group.isShowIcons === true ? (
						<IconsList onClose={this.hideIcons} iconParent={'group'} />
					) : null}
				</Paper>
			</div>
		);
	}
}

GroupForm.propTypes = {
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

export default connect(mapStateToProps, { addNewGroup, showIcon, resetIcon })(
	withStyles(styles, { withTheme: true })(GroupForm)
);
