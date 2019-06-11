import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OrgFeed from './OrgFeed';
import { withStyles } from '@material-ui/core/styles';
import {
	Grid,
	Card,
	CardActionArea,
	CardActions,
	Dialog,
	DialogContent,
	Slide,
	DialogTitle,
	DialogActions,
	Button
} from '@material-ui/core';
import isEmpty from './../../../validation/is-empty';
import { getAllOrgs } from './../../../actions/organization';
import { addOrgsToActivity } from './../../../actions/activity';

import SearchInput, { createFilter } from 'react-search-input';
import CustomSearchInput from './../../common/CustomSearchInput';
import Title from './../../common/Title';
import IconItem from './../../common/icons/IconItem';
function Transition(props) {
	return <Slide direction='up' {...props} />;
}

const KEYS_TO_FILTERS = [ 'name' ];
const styles = (theme) => ({
	contentContainer: {
		marginTop: '10px'
	}
});
class AddOrg extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			isAddNew: false
		};
		this.searchUpdated = this.searchUpdated.bind(this);
	}

	componentDidMount() {
		this.props.getAllOrgs();
	}
	searchUpdated(term) {
		this.setState({ searchTerm: term });
	}

	AddOrgs = () => {
		this.props.addOrgsToActivity(this.props.currentActivity, this.props.activity.selectedOrgs);
	};
	render() {
		const { classes, organization } = this.props;
		let orgsContent;
		const { orgs } = organization;
		if (orgs === null) {
			orgsContent = '';
		} else {
			if (isEmpty(this.state.searchTerm)) {
				orgsContent = <OrgFeed orgs={orgs} />;
			} else {
				const filteredOrgs = orgs.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
				orgsContent = <OrgFeed orgs={filteredOrgs} />;
			}
		}
		return (
			<Dialog
				open={this.props.open}
				TransitionComponent={Transition}
				keepMounted
				onClose={this.handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'
			>
				<DialogTitle id='alert-dialog-slide-title'>{'Add organization to this activity'}</DialogTitle>
				<DialogContent>
					<CustomSearchInput
						placeholder='Search by name'
						onChange={this.searchUpdated}
						color={this.props.theme.palette.primary.main}
					/>
					<div className={classes.contentContainer}>{orgsContent}</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.props.onCancel} color='primary'>
						Cancel
					</Button>
					<Button onClick={this.AddOrgs} color='primary'>
						Add
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

AddOrg.propTypes = {
	errors: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	organization: state.organization,
	activity: state.activity
});

export default connect(mapStateToProps, { getAllOrgs, addOrgsToActivity })(
	withStyles(styles, { withTheme: true })(AddOrg)
);
