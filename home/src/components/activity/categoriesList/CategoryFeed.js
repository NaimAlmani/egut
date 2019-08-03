import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';

class CategoryFeed extends Component {
	render() {
		const { categories } = this.props;

		return categories.map((category) => <CategoryItem key={category.id} category={category} />);
	}
}

CategoryFeed.propTypes = {};

export default CategoryFeed;
