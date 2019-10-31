import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SubscriptionFeed from './SubscriptionFeed';
import { withStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import isEmpty from './../../validation/is-empty';
import { getAllSubscriptions } from './../../actions/subscription';
import { createFilter } from 'react-search-input';
import CustomSearchInput from './../common/CustomSearchInput';
import Title from '../common/Title';
import IconItem from '../common/icons/IconItem';
const KEYS_TO_FILTERS = [ 'name' ];
const styles = (theme) => ({
	root: {
		position: 'relative',
		marginTop: '50px',
		display: 'inline-block',
		width: '100%'
	},
	addBtn: {
		background: theme.palette.green.main,
		width: '100px',
		height: '100px',
		borderRadius: '50%',
		color: theme.palette.green.main,
		marginTop: '25%',
		'&:hover': {
			background: theme.palette.primary.main
		}
	},
	paperTitle: {
		position: 'absolute',
		top: '-15px',
		background: '#fff',
		padding: '0 10px'
	},
	card: {
		maxWidth: 345,
		margin: '24px auto',
		height: '350',
		overflow: 'auto'
	},
	relativeContainer: {
		position: 'relative'
	},
	avatar: {
		margin: '10px auto',
		width: 100,
		height: 100,
		background: theme.palette.green.main
	}
});
class SubList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			isAddNew: false
		};
	}
	componentDidMount() {
		this.props.getAllSubscriptions();
	}
	// function to search array using for loop
	searchUpdated = (term) => {
		this.setState({ searchTerm: term });
	};
	render() {
		const { classes, subscription } = this.props;
		let subsContent;
		const { subscriptions } = subscription;
		if (subscriptions === null) {
			subsContent = '';
		} else {
			if (isEmpty(this.state.searchTerm)) {
				subsContent = <SubscriptionFeed subs={subscriptions} />;
			} else {
				const filteredGroups = subscriptions.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
				subsContent = <SubscriptionFeed subs={filteredGroups} />;
			}
		}
		return (
			<div>
				<Title
					text='Subscription list'
					subText='You can manage the Groups here'
					color={this.props.theme.palette.primary.main}
				/>
				<CustomSearchInput
					placeholder='Search by name'
					onChange={this.searchUpdated}
					color={this.props.theme.palette.primary.main}
				/>
				<ul>{subsContent}</ul>
			</div>
		);
	}
}

SubList.propTypes = {
	errors: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	subscription: PropTypes.object
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	subscription: state.subscription
});

export default connect(mapStateToProps, { getAllSubscriptions })(withStyles(styles, { withTheme: true })(SubList));
