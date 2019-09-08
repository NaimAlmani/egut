import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoryFeed from './CategoryFeed';
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
import { getAllCategories } from './../../../actions/category';
import { addCategoriesToActivity } from './../../../actions/activity';
import foriegnItems from './../../../utils/foriegnItems';
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
		marginTop: '70px',
		width: '100%'
	},
	dialogPapers: {
		width: '50%',
		textAlign: 'center'
	}
});
class AddCategory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			isAddNew: false
		};
		this.searchUpdated = this.searchUpdated.bind(this);
	}

	componentDidMount() {
		this.props.getAllCategories();
	}
	searchUpdated(term) {
		this.setState({ searchTerm: term });
	}

	AddCategorys = () => {
		this.props.addCategoriesToActivity(this.props.currentActivity, this.props.activity.selectedCategories);
		this.props.onCancel();
	};
	render() {
		const { classes, category } = this.props;
		let content;
		const { categories } = category;
		const foreign = foriegnItems(categories, this.props.activity.categories);
		if (categories === null) {
			content = '';
		} else {
			if (isEmpty(this.state.searchTerm)) {
				content = <CategoryFeed categories={foreign} />;
			} else {
				const filtered = foreign.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
				content = <CategoryFeed categories={filtered} />;
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
				classes={{
					paper: classes.dialogPapers
				}}
			>
				<DialogTitle id='alert-dialog-slide-title'>
					{'Add category to  ' + this.props.activity.currentActivity.name}
				</DialogTitle>
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
					<Button onClick={this.AddCategorys} color='primary'>
						Add
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

AddCategory.propTypes = {
	errors: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	category: state.category,
	activity: state.activity
});

export default connect(mapStateToProps, { getAllCategories, addCategoriesToActivity })(
	withStyles(styles, { withTheme: true })(AddCategory)
);
