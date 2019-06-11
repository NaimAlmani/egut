import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GroupFeed from './GroupFeed';
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
import { getAllGroups } from './../../../actions/group';
import { addGroupsToActivity } from './../../../actions/activity';

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
class AddGroup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			isAddNew: false
		};
		this.searchUpdated = this.searchUpdated.bind(this);
	}

	componentDidMount() {
		this.props.getAllGroups();
	}
	searchUpdated(term) {
		this.setState({ searchTerm: term });
	}

	AddGroups = () => {
		this.props.addGroupsToActivity(this.props.currentActivity, this.props.activity.selectedGroups);
	};
	render() {
		const { classes, group } = this.props;
		let content;
		const { groups } = group;
		if (groups === null) {
			content = '';
		} else {
			if (isEmpty(this.state.searchTerm)) {
				content = <GroupFeed groups={groups} />;
			} else {
				const filtered = groups.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
				content = <GroupFeed groups={filtered} />;
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
					<div className={classes.contentContainer}>{content}</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.props.onCancel} color='primary'>
						Cancel
					</Button>
					<Button onClick={this.AddGroups} color='primary'>
						Add
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

AddGroup.propTypes = {
	errors: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	group: state.group,
	activity: state.activity
});

export default connect(mapStateToProps, { getAllGroups, addGroupsToActivity })(
	withStyles(styles, { withTheme: true })(AddGroup)
);
