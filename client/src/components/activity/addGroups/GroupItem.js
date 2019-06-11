import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../../utils/config';
import { Grid } from '@material-ui/core';
import { SelectGroup, deselectGroup } from './../../../actions/activity';
// Generate required css
import { Chip } from '@material-ui/core';
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
	chip: {},
	deleteBtn: {
		color: theme.palette.error.main,
		background: theme.palette.error.contrastText
	}
});
class GroupItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false
		};
		this.onDeselectGroup = this.onDeselectGroup.bind(this);
		this.onSelectGroup = this.onSelectGroup.bind(this);
	}
	componentDidCatch(error, info) {
		// You can also log the error to an error reporting service
	}
	onSelectGroup = () => {
		this.props.SelectGroup(this.props.group);
	};
	onDeselectGroup = () => {
		this.props.deselectGroup(this.props.group);
	};
	render() {
		const { classes, group, activity } = this.props;
		let content;
		if (isContain(this.props.activity.selectedGroups, this.props.group)) {
			content = (
				<Chip
					icon={<img className={classes.image} src={config.imagesPath + group.logoPath} alt='logo' />}
					label={group.name}
					clickable
					className={classes.Selectedchip}
					color='select'
					variant='outlined'
					onClick={this.onDeselectGroup}
				/>
			);
		} else {
			content = (
				<Chip
					icon={<img className={classes.image} src={config.imagesPath + group.logoPath} alt='logo' />}
					label={group.name}
					clickable
					className={classes.chip}
					color='primary'
					variant='outlined'
					onClick={this.onSelectGroup}
				/>
			);
		}
		return <div> {content}</div>;
	}
}

GroupItem.propTypes = {
	classes: PropTypes.object.isRequired,
	activity: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	activity: state.activity
});

export default connect(mapStateToProps, { deselectGroup, SelectGroup })(
	withStyles(styles, { withTheme: true })(GroupItem)
);
