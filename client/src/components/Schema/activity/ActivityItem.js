import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../../utils/config';
import { ListItem, ListItemAvatar, Typography } from '@material-ui/core';
import OrgFeed from './../orgs/OrgFeed';
// Generate required css
const styles = (theme) => ({
	root: {
		color: theme.palette.primary.main,
		minHeight: '250px'
	},
	card: {
		maxWidth: 345,
		margin: '24px  auto',
		height: '350',
		overflow: 'auto',
		border: 'none',
		boxShadow: 'none',
		textAlign: 'center'
	},
	mediaContaier: {
		width: '40%',
		height: 'auto',
		margin: '0 auto'
	},
	image: {
		// ⚠️ object-fit is not supported by IE 11.
		width: '100%'
	},
	deleteBtn: {
		color: theme.palette.error.main,
		background: theme.palette.error.contrastText,
		margin: '0 auto'
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
		borderTopLeftRadius: '4px',
		borderBottomLeftRadius: '4px'
	},
	textCont: {
		margin: '10px'
	},
	text: {
		fontSize: '1em',
		color: '#333',
		lineHeight: '2'
	},
	datetext: {
		color: '#bdbdbd',
		fontSize: '0.7em'
	},
	Placetext: {
		color: '#bdbdbd',
		fontSize: '0.7em'
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
	},
	rightSection: {
		textAlign: 'center',
		display: 'block'
	},
	orgs: {
		width: '100%',
		textAlign: 'right',
		float: 'right',
		margin: '10px'
	}
});
class ActivityItem extends React.Component {
	render() {
		const { classes, activity, activityState } = this.props;
		const actInfo = activityState.activities.find((c) => c.id === activity.activity_id);

		return (
			<ListItem classes={{ root: classes.listItemRoot }} alignItems='flex-start'>
				<ListItemAvatar>
					<div className={classes.orgImgCont}>
						<img className={classes.image} src={config.imagesPath + actInfo.logoPath} alt='activity' />
					</div>
				</ListItemAvatar>
				<div className={classes.textCont}>
					<Typography noWrap={true} component='p'>
						<span className={classes.text}>{actInfo.name}</span>
					</Typography>
				</div>

				<div className={classes.rightSection}>
					<div className={classes.times}>
						<Typography noWrap={true} component='p' variant='body1'>
							<span className={classes.datetext}>{'från :' + activity.start_time}</span>
							<span className={classes.datetext}>{' - till: ' + activity.end_time}</span>
						</Typography>
					</div>
					<div className={classes.place}>
						<Typography noWrap={true} component='p' variant='body1 '>
							<span className={classes.Placetext}>{activity.place.name}</span>
						</Typography>
					</div>
				</div>
				<div className={classes.orgs}>
					<OrgFeed orgs={actInfo.organizations} />
				</div>
			</ListItem>
		);
	}
}

ActivityItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	activityState: state.activity
});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(ActivityItem));
