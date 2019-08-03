import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OrgFeed from './OrgFeed';
import CustomSlideShow from './CustomSlideShow';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { customStyles } from './../../theme/customStyles';
import isEmpty from './../../validation/is-empty';
import { getAllOrgs } from './../../actions/organization';
import SearchInput, { createFilter } from 'react-search-input';
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
	actionColor: {
		color: theme.palette.green.main
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
	}
});
class Orgs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			isAddNew: false
		};
		this.searchUpdated = this.searchUpdated.bind(this);
		this.ShowCreateForm = this.ShowCreateForm.bind(this);
		this.onHideNewOrg = this.onHideNewOrg.bind(this);
	}

	componentDidMount() {
		this.props.getAllOrgs();
	}
	searchUpdated(term) {
		this.setState({ searchTerm: term });
	}
	ShowCreateForm() {
		this.setState({
			isAddNew: true
		});
	}
	onHideNewOrg() {
		this.setState({
			isAddNew: false
		});
	}
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
			<div className={classes.relativeContainer}>
				<CustomSlideShow content={orgs} />
				<Grid container spacing={10}>
					{orgsContent}
				</Grid>
				<div />
			</div>
		);
	}
}

Orgs.propTypes = {};

const mapStateToProps = (state) => ({
	organization: state.organization
});

export default connect(mapStateToProps, { getAllOrgs })(withStyles(styles, { withTheme: true })(Orgs));
