import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import IconItem from './../../common/icons/IconItem';
import { connect } from 'react-redux';
import { selectGroup } from '../../../actions/activity';
import isContain from './../../../utils/isContain';
import isEmpty from '../../../validation/is-empty';
const styles = (theme) => ({
	root: {
		width: '100%',
		maxWidth: 360
	},
	ActiveListItem: {
		display: 'inline-block',
		width: '150px',
		margin: '20px'
	},
	catCont: {
		width: '100%',
		borderRadius: '10px',
		textAlign: 'center',
		padding: '5px',
		 paddingTop:'16px',
		paddingTop: '16px',
		cursor: 'pointer',
		transition: 'all 0.3s ease-in-out'
	},
	hoveredcatCont: {
		width: '100%',
		borderRadius: '10px',
		textAlign: 'center',
		padding: '5px',
		paddingTop: '16px',
		cursor: 'pointer',
		boxShadow: '1px 8px 8px 3px #33333340',
		transition: 'all 0.3s ease-in-out'
	},
	selectedcatCont: {
		width: '100%',
		borderRadius: '10px',
		textAlign: 'center',
		padding: '5px',
		paddingTop: '16px',
		cursor: 'pointer',
		boxShadow: '0px 0px 16px 0px #33333340',
		transition: 'all 0.3s ease-in-out',
		background: theme.palette.select.light
	},
	iconCont: {
		width: '60px',
		height: '60px',
		borderRadius: '50%',
		background: theme.palette.primary.main,
		margin: '0 auto',
		transition: 'all 0.3s ease-in-out'
	},
	hoveredIconCont: {
		width: '60px',
		height: '60px',
		borderRadius: '50%',
		background: theme.palette.select.light,
		margin: '0 auto',
		transition: 'all 0.5s ease-in-out'
	},
	selectedIconCont: {
		width: '60px',
		height: '60px',
		borderRadius: '50%',
		background: '#fff',
		margin: '0 auto',
		transition: 'all 0.5s ease-in-out'
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
							size={40}
							color={this.state.isSelected ? this.props.theme.palette.select.mainL : '#fff'}
						/>
					</div>
					<p>{group.name}</p>
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
