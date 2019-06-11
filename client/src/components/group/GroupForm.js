import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from './../../utils/config';
import { withStyles } from '@material-ui/core/styles';
import customStyles from './../../theme/customStyles';
import { addNewGroup } from '../../actions/group';
import { Paper, Typography, TextField, Button, Avatar } from '@material-ui/core';
import Title from '../common/Title';
import IconItem from '../common/icons/IconItem';
import isEmpty from './../../validation/is-empty';
import IconsTabs from './../icons/IconsTabs';
import { showIcon } from './../../actions/group';
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
		width: '50px',
		height: '50px'
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
		if (!isEmpty(this.props.group.selectedGroup)) {
			this.setState({
				name: this.props.group.selectedGroup.name,
				description: this.props.group.selectedGroup.description
			});
		}
	}

	onSubmit(e) {
		e.preventDefault();
		const groupData = {
			name: this.state.name,
			description: this.state.description,
			icon: this.props.group.icon.name,
			type: this.props.group.icon.type
		};
		this.props.addNewGroup(groupData);
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
							<IconItem name='x' type='Feather' />
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
						<div className={classes.chooseIcon}>
							<Button onClick={this.chooseIcon}>Choose Icon</Button>
						</div>
						<div className={classes.iconCont}>
							{!isEmpty(this.props.group.icon) ? (
								<IconItem font={this.props.group.icon.font} name={this.props.group.icon.name} />
							) : null}
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
					{this.props.group.isShowIcons === true ? (
						<IconsTabs onClose={this.hideIcons} iconParent={'group'} />
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

export default connect(mapStateToProps, { addNewGroup, showIcon })(withStyles(styles, { withTheme: true })(GroupForm));
