import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CustomSearchInput from './../../common/CustomSearchInput';
import SearchInput, { createFilter } from 'react-search-input';
import isEmpty from './../../../validation/is-empty';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Paper, Button } from '@material-ui/core';

import Title from './../../common/Title';
import IconItem from './../../common/icons/IconItem';
import MemberTable from './MemberTable';
const KEYS_TO_FILTERS = [ 'name', 'email', 'tel' ];
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
			searchTerm: ''
		};
		this.searchUpdated = this.searchUpdated.bind(this);
	}
	searchUpdated(term) {
		this.setState({ searchTerm: term });
	}
	render() {
		const { classes, theme, activity } = this.props;
		const { members } = activity;
		let memberContent;
		if (members === null) {
			memberContent = '';
		} else {
			if (isEmpty(this.state.searchTerm)) {
				memberContent = <MemberTable members={members} />;
			} else {
				const filteredMemebers = members.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
				memberContent = <MemberTable members={filteredMemebers} />;
			}
		}
		return (
			<Paper className={classes.contDed}>
				<div className={classes.closeIcon}>
					<span onClick={this.props.onCancel} style={{ cursor: 'pointer', width: 'auto' }}>
						<IconItem name='x' type='Feather' />
					</span>
				</div>
				<Title text='Members list ' color={this.props.theme.palette.primary.main} icon='lock' />
				<Grid container>
					<CustomSearchInput
						placeholder='Search by name'
						onChange={this.searchUpdated}
						color={this.props.theme.palette.primary.main}
					/>
					<Grid item>{memberContent}</Grid>
				</Grid>
			</Paper>
		);
	}
}
const mapStateToProps = (state) => ({
	activity: state.activity
});
export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(ContactMain));
