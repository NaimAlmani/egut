import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../../utils/config';
import { Grid } from '@material-ui/core';
import { deleteGroup } from './../../../actions/activity';
import ConfirmDelete from '../../common/ConfirmDelete';
import IconItem from './../../common/icons/IconItem';
// Generate required css
import { ListItem, ListItemAvatar, Typography } from '@material-ui/core';

const styles = (theme) => ({
	root: {
		color: theme.palette.primary.main,
		minHeight: '250px'
	},

	deselectedAvatar: {
		background: theme.palette.primary.main
	},
	selectedAvatar: {
		background: theme.palette.pink.main,
		width: '50px',
		height: '50px'
	},
	iconCont: {
		width: '100px',
		height: '50px',
		background: theme.palette.primary.main,
		borderRadius: '4px',
		textAlign: 'center'
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
		width: '100%',
		'&:hover': {
			background: '#e3f2fd'
		}
	},
	listItemRootSelected: {
		border: '1px solid #1976d2',
		background: '#2196f3',
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
class GroupItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false
		};

		this.onDelete = this.onDelete.bind(this);
		this.onConfirmDelete = this.onConfirmDelete.bind(this);
		this.onCancelDelete = this.onCancelDelete.bind(this);
	}
	componentDidCatch(error, info) {}
	onDelete() {
		this.setState({
			isDelete: true
		});
	}
	onConfirmDelete() {
		const group = {
			id: this.props.group.id
		};
		this.props.deleteGroup(this.props.activityID, group);
	}
	onCancelDelete() {
		this.setState({
			isDelete: false
		});
	}
	render() {
		const { classes, group } = this.props;
		return (
			<ListItem classes={{ root: classes.listItemRoot }} alignItems='flex-start'>
				<ListItemAvatar>
					<div className={classes.iconCont}>
						<IconItem name={group.icon_name} font={group.icon_font} color='#fff' size='30px' />
					</div>
				</ListItemAvatar>
				<div className={classes.textCont}>
					<Typography noWrap={true} component='p'>
						<span className={classes.text}> {group.name}</span>
					</Typography>
				</div>
				<div className={classes.IconCont} onClick={this.onDelete}>
					<IconItem name='x' size={25} color='#ff5722' />
				</div>
				<ConfirmDelete
					open={this.state.isDelete}
					title='Are you Sure ??'
					text={'do you want to delete ' + group.name}
					onClose={this.onCancelDelete}
					onDelete={this.onConfirmDelete}
				/>
			</ListItem>
		);
	}
}

GroupItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deleteGroup })(withStyles(styles, { withTheme: true })(GroupItem));
