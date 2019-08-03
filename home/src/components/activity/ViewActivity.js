import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../utils/config';
import changeToGallery from './../../utils/changeToGallery';
import isEmpty from './../../validation/is-empty';
import { Grid, CircularProgress, Button } from '@material-ui/core';
import { startLoading, endLoading, setLoading } from '../../actions/loading';
import { getActivityById } from './../../actions/activity';

// Generate required css
import { Tooltip } from '@material-ui/core';
import CustomScroll from 'react-custom-scroll';

import OrgFeed from './Orgs/OrgFeed';

import GroupFeed from './Group/GroupFeed';

import PlaceFeed from './Place/PlaceFeed';

import CategoryFeed from './Category/CategoryFeed';

import TimesTable from './Time/TimesTable';

import ActivityImages from './ActivityImages';

import ContactTable from './contacts/ContactTable';

import randomColor from './../../utils/randomColor';
import MemberMain from './members/MemberMain';
const styles = (theme) => ({
	header: {
		position: 'relative',
		width: '100%',
		height: '80vh',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover'
	},
	headerContent: {
		textAlign: 'center',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%,-50%)',
		color: 'white'
	},
	editIcon: {
		position: 'absolute',
		right: '10px',
		top: '10px',
		cursor: 'pointer'
	},
	editIconText: {
		color: '#fff',
		fontSize: '1.5em'
	},
	root: {
		color: theme.palette.primary.main,
		height: '350px',
		overflow: 'auto'
	},
	card: {
		maxWidth: 345,
		margin: '24px  auto',
		height: '350',
		overflow: 'auto'
	},
	sectionWhite: {
		padding: '50px 20px',
		color: '#333',
		background: '#fff'
	},
	sectionBlack: {
		padding: '50px 20px',
		color: '#fff',
		background: '#333'
	},
	mediaContaier: {
		width: '40%',
		height: 'auto',
		margin: '0 auto'
	},
	image: {
		// ⚠️ object-fit is not supported by IE 11.
		objectFit: 'cover',
		width: '100%'
	},
	deleteBtn: {
		color: theme.palette.error.main,
		background: theme.palette.error.contrastText
	},
	//org section
	orgHeader: {
		textAlign: 'center'
	},
	iconCont: {
		float: 'right',
		width: '50px',
		height: '50px',
		background: theme.palette.primary.main,
		borderRadius: '50%',
		marginRight: '10px',
		cursor: 'pointer'
	}
});
class ViewActivity extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false,
			isShowOrg: false,
			isShowContact: false,
			isShowGroup: false,
			isShowPlace: false,
			isShowCategory: false,
			isShowTime: false,
			loading: false,
			isShowAddImage: false,

			isShowMembers: false
		};
		this.props.startLoading();
	}

	componentDidMount() {
		this.props.getActivityById(this.props.match.params.id);
	}
	render() {
		const { classes, activity } = this.props;
		const act = activity.currentActivity;
		const imgPath =
			'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) , url(' + config.imagesPath + act.logoPath + ')';
		return (
			<div className={classes.container}>
				{this.props.loading === true ? <CircularProgress disableShrink /> : null}
				{/* activity info  section */}
				<div className={classes.header} style={{ backgroundImage: imgPath }}>
					<div className={classes.headerContent}>
						<div className={classes.title}>
							<h1>{act.name}</h1>
						</div>
						<div className={classes.desc}>
							<p> {act.description}</p>
						</div>
						<div className={classes.memberBtn}>
							<Button color='primary'>Ansluta</Button>
						</div>
					</div>
				</div>
				{/* activity orgs */}
				{!isEmpty(this.props.activity.orgs) ? (
					<div className={classes.sectionWhite}>
						<div className={classes.orgHeader}>
							<h1>Organizations</h1>
						</div>
						<Grid container justify={'center'} alignItems={'center'}>
							<OrgFeed orgs={this.props.activity.orgs} activityID={act.id} />
						</Grid>
					</div>
				) : null}
				{/* activity groups */}
				{!isEmpty(this.props.activity.groups) ? (
					<div className={classes.sectionBlack}>
						<div className={classes.orgHeader}>
							<h1>Groups</h1>
						</div>
						<Grid container justify={'center'} alignItems={'center'}>
							<GroupFeed groups={this.props.activity.groups} activityID={act.id} />
						</Grid>
					</div>
				) : null}

				{/* activity categories */}
				{!isEmpty(this.props.activity.categories) ? (
					<div className={classes.sectionWhite}>
						<div className={classes.orgHeader}>
							<h1>Categories</h1>
						</div>
						<Grid container justify={'center'} alignItems={'center'}>
							<CategoryFeed categories={this.props.activity.categories} activityID={act.id} />
						</Grid>
					</div>
				) : null}
				{/**Activity contacts */}
				{!isEmpty(this.props.activity.contacts) ? (
					<div className={classes.organizations}>
						<div className={classes.orgHeader}>
							<h1> Contact info </h1>
						</div>
						<Grid container justify={'center'} alignItems={'center'}>
							<ContactTable contacts={this.props.activity.contacts} activityID={act.id} />
						</Grid>
					</div>
				) : null}
				{/**end activity contacts */}
				{/**Activity times */}
				{!isEmpty(this.props.activity.times) ? (
					<div className={classes.organizations}>
						<div className={classes.orgHeader}>
							<h1> Times </h1>
						</div>
						<Grid container justify={'center'} alignItems={'center'}>
							<TimesTable times={this.props.activity.times} activityID={act.id} />
						</Grid>
					</div>
				) : null}
				{/**end activity times */}

				{/**Activity images */}
				{!isEmpty(this.props.activity.images) ? (
					<div className={classes.organizations}>
						<div className={classes.orgHeader}>
							<h1> Images </h1>
						</div>

						<div style={{ width: '80%', margin: '0 auto' }}>
							<ActivityImages images={changeToGallery(this.props.activity.images)} />
						</div>
					</div>
				) : null}
				{/**end activity images */}
			</div>
		);
	}
}

ViewActivity.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	activity: state.activity,
	loading: state.loading
});

export default connect(mapStateToProps, { getActivityById, startLoading, endLoading, setLoading })(
	withStyles(styles, { withTheme: true })(ViewActivity)
);
