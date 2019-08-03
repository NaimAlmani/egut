import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoryFeed from './CategoryFeed';
import CategoryForm from './CategoryForm';
import EditCategory from './EditCategory';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import isEmpty from './../../validation/is-empty';
import { getAllCategories } from './../../actions/category';
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
class Categories extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			isAddNew: false
		};
		this.searchUpdated = this.searchUpdated.bind(this);
		this.ShowCreateForm = this.ShowCreateForm.bind(this);
		this.onHideNewPlace = this.onHideNewPlace.bind(this);
	}
	componentDidMount() {
		this.props.getAllCategories();
	}
	// function to search array using for loop
	searchUpdated(term) {
		this.setState({ searchTerm: term });
	}
	ShowCreateForm() {
		this.setState({
			isAddNew: true
		});
	}
	onHideNewPlace() {
		this.setState({
			isAddNew: false
		});
	}
	render() {
		const { classes, category } = this.props;
		let categoriesContent;
		const { categories } = category;
		if (categories === null) {
			categoriesContent = '';
		} else {
			if (isEmpty(this.state.searchTerm)) {
				categoriesContent = <CategoryFeed categories={categories} />;
			} else {
				const filteredCategories = categories.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
				categoriesContent = <CategoryFeed categories={filteredCategories} />;
			}
		}
		return (
			<div className={classes.relativeContainer}>
				<Title
					text=' Categories'
					subText='You can manage the Categories here'
					color={this.props.theme.palette.primary.main}
				/>
				<CustomSearchInput
					placeholder='Search by name'
					onChange={this.searchUpdated}
					color={this.props.theme.palette.primary.main}
				/>
				<Grid container spacing={10}>
					{categoriesContent}
					<Grid item xs={12} sm={6} md={3} style={{ textAlign: 'center' }}>
						<Button color='primary' className={classes.addBtn} onClick={this.ShowCreateForm}>
							<IconItem name='plus' type='Feather' size={50} color='#fff' />
						</Button>
					</Grid>
				</Grid>
				<div />
				{this.state.isAddNew ? <CategoryForm onCancel={this.onHideNewPlace} /> : null}
				{this.props.category.isEdit === true ? <EditCategory /> : null}
			</div>
		);
	}
}

Categories.propTypes = {
	errors: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	category: PropTypes.object
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	category: state.category
});

export default connect(mapStateToProps, { getAllCategories })(withStyles(styles, { withTheme: true })(Categories));
