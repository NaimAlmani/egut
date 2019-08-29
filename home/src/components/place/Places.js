import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlaceFeed from './PlaceFeed';
import CustomSlideShow from './CustomSlideShow';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { customStyles } from './../../theme/customStyles';
import isEmpty from './../../validation/is-empty';
import { getAllPlaces } from './../../actions/place';
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
class places extends Component {
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
		this.props.getAllPlaces();
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
		const { classes, place } = this.props;
		let orgsContent;
		const { places } = place;
		if (places === null) {
			orgsContent = '';
		} else {
			if (isEmpty(this.state.searchTerm)) {
				orgsContent = <PlaceFeed places={places} />;
			} else {
				const filteredOrgs = places.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
				orgsContent = <PlaceFeed places={filteredOrgs} />;
			}
		}
		return (
			<div className={classes.relativeContainer}>
				<CustomSlideShow content={places} />
				<h1 style={{ textAlign: 'center', margin: '20px' }}>Våra lokalar</h1>
				<Grid container spacing={10} justify='center' alignItems='center'>
					{orgsContent}
				</Grid>
				<div />
			</div>
		);
	}
}

places.propTypes = {};

const mapStateToProps = (state) => ({
	place: state.place
});

export default connect(mapStateToProps, { getAllPlaces })(withStyles(styles, { withTheme: true })(places));
