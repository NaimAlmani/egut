import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Paper, Button } from '@material-ui/core';
import ContactFeed from './existContacts/ContactFeed';
import CreateContact from './CreateContact';
import { getAllContacts, addExistedContacts } from './../../../actions/activity';
import Fade from 'react-reveal/Fade';
import Title from './../../common/Title';
import IconItem from './../../common/icons/IconItem';
import foriegnItems from './../../../utils/foriegnItems';
const styles = (theme) => ({
	contDed: {
		position: 'fixed',
		width: '50%',
		height: '85vh',
		overflow: 'auto',
		top: '100px',
		left: '25%',
		background: '#fff',
		padding: '10px'
	},
	container: {},
	existContactsContainer: {
		border: '1px solid #f0f0f0',
		borderRadius: '2px',
		padding: '10px',
		background: '#fff',
		height: '300px',
		overflow: 'auto',
		boxShadow: '1px 1px 1px rgba(0 ,0 ,0 , 0.2)'
	}
});
class ContactMain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabValue: 0,
			index: 0,
			showForm: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeIndex = this.handleChangeIndex.bind(this);
		this.showForm = this.showForm.bind(this);
	}
	componentDidMount() {
		this.props.getAllContacts();
	}
	handleChange(event, newValue) {
		this.setState({
			tabValue: newValue
		});
	}

	handleChangeIndex(index) {
		this.setState({
			index: index
		});
	}
	showForm() {
		this.setState({
			showForm: true
		});
	}
	hideForm() {
		this.setState({
			showForm: false
		});
	}
	addExistedContact = () => {
		this.props.addExistedContacts(this.props.currentActivity, this.props.activity.selectedContacts);
	};
	render() {
		const { classes, theme, activity } = this.props;
		const filteredContacts = foriegnItems(activity.allContacts, activity.contacts);
		return (
			<Paper className={classes.contDed}>
				<div className={classes.closeIcon}>
					<span onClick={this.props.onCancel} style={{ cursor: 'pointer', width: 'auto' }}>
						<IconItem name='x' type='Feather' />
					</span>
				</div>
				<Title text='CreateContact' color={this.props.theme.palette.primary.main} icon='lock' />
				<Grid container>
					<Grid item md={12} sm={12}>
						<div className={classes.existContactsContainer}>
							<ContactFeed contacts={filteredContacts} />
						</div>
						<div className={classes.btn}>
							<Button color='primary' onClick={this.addExistedContact}>
								Add
							</Button>
							<Button color='secondary' onClick={this.showForm}>
								Create new contact
							</Button>
						</div>
					</Grid>
					{this.state.showForm === true ? (
						<Grid item md={12} sm={12}>
							<CreateContact activity={this.props.currentActivity} onCancel={this.hideForm} />
						</Grid>
					) : null}
				</Grid>
			</Paper>
		);
	}
}
const mapStateToProps = (state) => ({
	activity: state.activity
});
export default connect(mapStateToProps, { getAllContacts, addExistedContacts })(
	withStyles(styles, { withTheme: true })(ContactMain)
);
