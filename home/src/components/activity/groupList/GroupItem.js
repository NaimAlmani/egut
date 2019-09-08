import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import IconItem from './../../common/icons/IconItem';
import { connect } from 'react-redux';
import { selectGroup } from '../../../actions/activity';
import isContain from './../../../utils/isContain';
import isEmpty from '../../../validation/is-empty';
import { Typography } from '@material-ui/core';
const styles = (theme) => ({
	root: {
		width: '100%'
	},
	catCont: {
		width: '100%',
		borderRadius: '10px',
		textAlign: 'center',
		cursor: 'pointer',
		transition: 'all 0.3s ease-in-out'
	},
	hoveredcatCont: {
		width: '100%',
		borderRadius: '10px',
		textAlign: 'center',
		cursor: 'pointer',
		transition: 'all 0.3s ease-in-out'
	},
	selectedcatCont: {
		width: '100%',
		borderRadius: '10px',
		textAlign: 'center',
		cursor: 'pointer'
	},
	iconCont: {
		width: '50px',
		height: '50px',
		borderRadius: '50%',
		background: '#616054',
		margin: '0 auto',
		border: '1px solid #616054',
		padding: '2px',
		transition: 'all 0.3s ease-in-out'
	},
	hoveredIconCont: {
		width: '50px',
		height: '50px',
		borderRadius: '50%',
		border: '1px solid #616054',
		margin: '0 auto',
		padding: '2px',

		transition: 'all 0.5s ease-in-out'
	},
	selectedIconCont: {
		width: '50px',
		height: '50px',
		borderRadius: '50%',
		background: theme.palette.select.main,
		margin: '0 auto',
		padding: '2px',

		transition: 'all 0.5s ease-in-out',
		border: '1px solid ' + theme.palette.primary.main
	}
});
class GroupItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isHovered: false,
			isSelected: false
		};
		this.onSelect = this.onSelect.bind(this);
	}
	componentDidMount() {
		if (!isEmpty(this.props.activity.selectedGroups)) {
			this.setState({
				isSelected: isContain(this.props.activity.selectedGroups, this.props.group)
			});
		}
	}
	onMouseEnter = () => {
		this.setState({
			isHovered: true
		});
	};
	onMouseLeave = () => {
		this.setState({
			isHovered: false
		});
	};
	onSelect() {
		this.setState({
			isSelected: !this.state.isSelected
		});
		this.props.selectGroup(this.props.group.id, !this.state.isSelected);
	}
	render() {
		const { classes, group } = this.props;
		return (
			<div className={classes.ActiveListItem}>
				<div
					className={
						this.state.isSelected ? (
							classes.selectedcatCont
						) : this.state.isHovered ? (
							classes.hoveredcatCont
						) : (
							classes.catCont
						)
					}
					onClick={this.onSelect}
					onMouseEnter={this.onMouseEnter}
					onMouseLeave={this.onMouseLeave}
				>
					<div
						className={
							this.state.isSelected ? (
								classes.selectedIconCont
							) : this.state.isHovered ? (
								classes.hoveredIconCont
							) : (
								classes.iconCont
							)
						}
					>
						<IconItem
							name={group.icon_name}
							font={group.icon_font}
							size={30}
							color={
								this.state.isSelected ? (
									'#fff'
								) : this.state.isHovered === true ? (
									'#616054'
								) : (
									this.props.theme.palette.primary.main
								)
							}
						/>
					</div>
					<Typography variant='body' Component='p'>
						{group.name}
					</Typography>
				</div>
			</div>
		);
	}
}

GroupItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	activity: state.activity
});

export default connect(mapStateToProps, { selectGroup })(withStyles(styles, { withTheme: true })(GroupItem));
