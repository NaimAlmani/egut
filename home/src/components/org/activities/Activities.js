import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ActivityFeed from './ActivityFeed';

import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import isEmpty from './../../../validation/is-empty';
import { getAllActivities } from './../../../actions/activity';
import SearchInput, { createFilter } from 'react-search-input';
import CustomSearchInput from './../../common/CustomSearchInput';
import Title from '../../common/Title';

const KEYS_TO_FILTERS = [ 'name' ];
const styles = (theme) => ({
	root: {
		position: 'relative',
		marginTop: '50px',
		display: 'inline-block',
		width: '100%'
	},
	actionColor: {
		color: theme.palette.green.active
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
		position: 'relative',
		width: '100%'
	}
});
class activities extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			isAddNew: false
		};
		this.searchUpdated = this.searchUpdated.bind(this);
		this.ShowCreateForm = this.ShowCreateForm.bind(this);
		this.onHideNewAct = this.onHideNewAct.bind(this);
	}

	componentDidMount() {}
	searchUpdated(term) {
		this.setState({ searchTerm: term });
	}
	ShowCreateForm() {
		this.setState({
			isAddNew: true
		});
	}
	onHideNewAct() {
		this.setState({
			isAddNew: false
		});
	}
	render() {
		const { classes, activities } = this.props;
		let actsContent;
		if (activities === null) {
			actsContent = '';
		} else {
			if (isEmpty(this.state.searchTerm)) {
				actsContent = <ActivityFeed activities={activities} />;
			} else {
				const filteredActs = activities.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
				actsContent = <ActivityFeed activities={filteredActs} />;
			}
		}
		return (
			<div className={classes.relativeContainer}>
				<Title text={'Aktiviteter'} subText='' color={this.props.theme.palette.primary.main} />
				<CustomSearchInput
					placeholder='Sök'
					onChange={this.searchUpdated}
					color={this.props.theme.palette.primary.main}
				/>
				<Grid container spacing={10} justify='center' alignItems='center'>
					{actsContent}
				</Grid>
				<div />
			</div>
		);
	}
}

activities.propTypes = {
	errors: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	activity: state.activity
});

export default connect(mapStateToProps, { getAllActivities })(withStyles(styles, { withTheme: true })(activities));
