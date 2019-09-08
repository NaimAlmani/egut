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
import { ListItem, ListItemAvatar, Typography } from '@material-ui/core';
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
	},
	iconCont: {
		width: '100px',
		height: '50px',
		background: theme.palette.primary.main,
		borderRadius: '4px',
		textAlign: 'center'
	},
	deselectedAvatar: {
		background: theme.palette.primary.main
	},
	selectedAvatar: {
		background: theme.palette.pink.main,
		width: '50px',
		height: '50px'
	},
	orgImgCont: {
		width: '100px',
		height: '50px',
		overflow: 'hidden',
		borderTopLeftRadius: '10px',
		borderBottomLeftRadius: '10px'
	},
	textCont: {
		margin: '10px'
	},
	text: {
		fontSize: '1.3em',
		color: '#333',
		lineHeight: '2'
	},
	selectedText: {
		fontSize: '1.3em',
		color: '#fff',
		lineHeight: '2'
	},
	listItemRoot: {
		border: '1px solid #bdbdbd',
		padding: '5px',
		margin: '10px',
		borderRadius: '10px',
		cursor: 'pointer',
		'&:hover': {
			background: '#e3f2fd'
		}
	},
	listItemRootSelected: {
		border: '1px solid #1976d2',
		background: '#43a047',
		padding: '5px',
		margin: '10px',
		borderRadius: '10px',
		cursor: 'pointer',
		'&:hover': {
			background: '#e3f2fd'
		}
	},
	IconCont: {
		position: 'absolute',
		top: '10px',
		right: '10px'
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
		const isSelected = isContain(this.props.activity.selectedCategories, this.props.category);

		return (
			<ListItem
				classes={{ root: isSelected === true ? classes.listItemRootSelected : classes.listItemRoot }}
				alignItems='flex-start'
				onClick={isSelected === true ? this.onDeselectCategory : this.onSelectCategory}
			>
				<ListItemAvatar>
					<div className={classes.iconCont}>
						<IconItem name={category.icon_name} font={category.icon_font} color='#fff' size='30px' />
					</div>
				</ListItemAvatar>
				<div className={classes.textCont}>
					<Typography noWrap={true} component='p'>
						<span className={isSelected === true ? classes.selectedText : classes.text}>
							{category.name}
						</span>
					</Typography>
				</div>
				<div className={classes.IconCont}>
					{isSelected === true ? (
						<IconItem name='check-circle' size={25} color='#fff' />
					) : (
						<IconItem name='circle' size={25} color='#333' />
					)}
				</div>
			</ListItem>
		);
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
