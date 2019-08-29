import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, fade } from '@material-ui/core/styles';
import EmailFeed from './EmailFeed';
import { List, ListSubheader, ListItem } from '@material-ui/core';
import isEmpty from './../../../validation/is-empty';
import SearchInput, { createFilter } from 'react-search-input';
import CustomSearchInput from './../../common/CustomSearchInput';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
const KEYS_TO_FILTERS = [ 'name' ];
const styles = (theme) => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
		height: 'calc(100vh - 200px)',
		overflow: 'auto'
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: '#fff',
		'&:hover': {
			backgroundColor: '#fff'
		},
		marginRight: '2px',
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: '3px',
			width: 'auto'
		}
	},
	searchIcon: {
		width: '10px',
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputRoot: {
		color: 'inherit',
		width: '100%',
		borderBottom: '1px dashed #333',
		padding: '5px'
	},
	inputInput: {
		padding: '1px 1px 1px 15px',
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: 200
		}
	}
});
class EmailList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: ''
		};
	}
	onChange = (e) => {
		this.setState({
			searchTerm: e.target.value
		});
	};
	render() {
		const { emails, classes } = this.props;
		let content;
		if (emails === null) {
			content = '';
		} else {
			if (isEmpty(this.state.searchTerm)) {
				content = <EmailFeed emails={emails} />;
			} else {
				const filtered = emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
				content = <EmailFeed emails={filtered} />;
			}
		}
		return (
			<List
				component='nav'
				aria-labelledby='nested-list-subheader'
				subheader={
					<ListItem className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							onChange={this.onChange}
							placeholder='Search…'
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</ListItem>
				}
				className={classes.root}
			>
				{content}
			</List>
		);
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(EmailList));
