import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconFeed from './IconFeed';
import isEmpty from './../../validation/is-empty';
import SearchInput, { createFilter } from 'react-search-input';
import { withStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';
const KEYS_TO_FILTERS = [ 'name' ];

const styles = (theme) => ({
	root: {
		width: '100%'
	},
	searchInput: {
		position: 'relative',
		width: '200px',
		float: 'right',
		borderBottom: '1px solid #f0f0f0'
	},
	button: {
		float: 'right',
		width: '100px',
		margin: theme.spacing.unit,
		marginTop: '22px'
	}
});
class Icons extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errors: {},
			searchTerm: ''
		};
		this.searchUpdated = this.searchUpdated.bind(this);
	}
	componentDidMount() {}
	// function to search array using for loop
	searchUpdated(term) {
		this.setState({ searchTerm: term });
	}
	render() {
		const { icons, errors, classes } = this.props;
		let iconContent;

		if (icons === null) {
			iconContent = null;
		} else {
			if (isEmpty(this.state.searchTerm)) {
				iconContent = <IconFeed icons={icons} iconParent={this.props.iconParent} />;
			} else {
				const filteredIcons = icons.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
				iconContent = <IconFeed icons={filteredIcons} iconParent={this.props.iconParent} />;
			}
		}
		return (
			<div className='container-fluid'>
				<div className='row'>
					<div className={classes.root}>
						<div className={classes.searchInput}>
							<i
								className='fas fa-search'
								style={{
									position: 'absolute',
									right: '0',
									top: '40px',
									color: '#a9a9a9'
								}}
							/>
							<SearchInput onChange={this.searchUpdated} placeholder='Sök' />
						</div>
						<h3 className='lead'>Välj en Ikon</h3>
					</div>
				</div>
				<div
					className='row'
					style={{
						height: 'calc(70vh-50px)'
					}}
				>
					{iconContent}
				</div>
			</div>
		);
	}
}

Icons.propTypes = {
	icons: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	errors: state.errors,
	auth: state.auth,
	loading: state.loading,
	question: state.question
});

export default connect(mapStateToProps, {})(withStyles(styles)(Icons));
