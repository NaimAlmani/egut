import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../../utils/config';
import { Grid } from '@material-ui/core';
import { SelectCategory, deselectCategory } from './../../../actions/activity';
// Generate required css
import { Chip, Avatar } from '@material-ui/core';
import IconItem from '../../common/icons/IconItem';
import isContain from './../../../utils/isContain';
const styles = (theme) => ({
	root: {
		color: theme.palette.primary.main,
		minHeight: '250px'
	},
	card: {
		maxWidth: 345,
		margin: '24px  auto',
		height: '350',
		overflow: 'auto'
	},
	Selectedchip: {
		background: theme.palette.select.main,
		color: theme.palette.select.contrastText
	},
	mediaContaier: {
		width: '40%',
		height: 'auto',
		margin: '0 auto'
	},
	image: {
		// ⚠️ object-fit is not supported by IE 11.
		objectFit: 'cover',
		width: 'auto',
		height: '100%'
	},
	chip: {
		paddingLeft: '5px'
	},
	deleteBtn: {
		color: theme.palette.error.main,
		background: theme.palette.error.contrastText
	},
	ChipContainer: {
		display: 'inline-block',
		margin: '5px'
	},
	deselectedAvatar: {
		background: theme.palette.primary.main
	},
	selectedAvatar: {
		background: theme.palette.pink.main
	}
});
class CategoryItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false
		};
		this.onDeselectCategory = this.onDeselectCategory.bind(this);
		this.onSelectCategory = this.onSelectCategory.bind(this);
	}
	componentDidCatch(error, info) {
		// You can also log the error to an error reporting service
	}
	onSelectCategory = () => {
		this.props.SelectCategory(this.props.category);
	};
	onDeselectCategory = () => {
		this.props.deselectCategory(this.props.category);
	};
	render() {
		const { classes, category, activity } = this.props;
		let content;
		if (isContain(this.props.activity.selectedCategories, this.props.category)) {
			content = (
				<Chip
					color='primary'
					onClick={this.onDeselectCategory}
					clickable
					label={category.name}
					avatar={
						<Avatar className={classes.selectedAvatar}>
							<IconItem
								size='16px'
								color='#fff'
								name={this.props.category.icon_name}
								font={this.props.category.icon_font}
							/>
						</Avatar>
					}
				/>
			);
		} else {
			content = (
				<Chip
					color='primary'
					onClick={this.onSelectCategory}
					label={category.name}
					variant='outlined'
					clickable
					avatar={
						<Avatar className={classes.deselectedAvatar}>
							<IconItem
								size='16px'
								name={this.props.category.icon_name}
								font={this.props.category.icon_font}
								color='#fff'
							/>
						</Avatar>
					}
				/>
			);
		}
		return <div className={classes.ChipContainer}> {content}</div>;
	}
}

CategoryItem.propTypes = {
	classes: PropTypes.object.isRequired,
	activity: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	activity: state.activity
});

export default connect(mapStateToProps, { deselectCategory, SelectCategory })(
	withStyles(styles, { withTheme: true })(CategoryItem)
);
