import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CategoryItem from './CategoryItem';
const styles = (theme) => {};
class CategoryFeed extends Component {
	render() {
		const { categories } = this.props;

		return categories.map((category) => (
			<CategoryItem key={category.id} category={category} activityID={this.props.activityID} />
		));
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(CategoryFeed));
