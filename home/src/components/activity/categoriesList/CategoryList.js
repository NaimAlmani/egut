import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { ListItem, List } from '@material-ui/core';

import CategoryFeed from './CategoryFeed';
const styles = (theme) => ({
	root: {}
});

class CategoryList extends React.Component {
	render() {
		const { classes, categories } = this.props;
		return (
			<List className={classes.root}>
				<CategoryFeed categories={categories} />
			</List>
		);
	}
}
CategoryList.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(CategoryList));
