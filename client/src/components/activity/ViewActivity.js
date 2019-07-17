import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../utils/config';
import changeToGallery from './../../utils/changeToGallery';
import isEmpty from './../../validation/is-empty';
import { Grid, CircularProgress, Button } from '@material-ui/core';
import { startLoading, endLoading, setLoading } from '../../actions/loading';
import { getActivityById, showEdit, getDays, addNewImage } from './../../actions/activity';
import customStyles from './../../theme/customStyles';
import ConfirmDelete from './../common/ConfirmDelete';
// Generate required css
import { Tooltip } from '@material-ui/core';
import CustomScroll from 'react-custom-scroll';
import IconItem from '../common/icons/IconItem';
import EditActivity from './EditActivity';

import AddOrg from './addOrgs/AddOrg';
import OrgFeed from './Orgs/OrgFeed';

import AddGroup from './addGroups/AddGroup';
import GroupFeed from './Group/GroupFeed';

import AddPlace from './addPlaces/AddPlace';
import PlaceFeed from './Place/PlaceFeed';

import AddCategory from './addCategory/AddCategory';
import CategoryFeed from './Category/CategoryFeed';
import AddTime from './addTime/AddTime';
import TimesTable from './Time/TimesTable';

import AddImage from './AddImage';
import ActivityImages from './ActivityImages';

import ContactMain from './contacts/ContactMain';
import ContactTable from './contacts/ContactTable';

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
		this.props.getDays();
	}
	showActivity = () => {
		this.props.showEdit(this.props.activity.currentActivity, true);
	};

	//org functions
	showAddOrg = () => {
		this.setState({
			isShowOrg: true
		});
	};
	cancelShowAddOrg = () => {
		this.setState({
			isShowOrg: false
		});
	};

	//contacts functions
	showAddContact = () => {
		this.setState({
			isShowContact: true
		});
	};
	cancelShowAddContact = () => {
		this.setState({
			isShowContact: false
		});
	};

	//group functions
	showAddGroup = () => {
		this.setState({
			isShowGroup: true
		});
	};
	cancelShowAddGroup = () => {
		this.setState({
			isShowGroup: false
		});
	};

	//place functions
	showAddPlace = () => {
		this.setState({
			isShowPlace: true
		});
	};
	cancelShowAddPlace = () => {
		this.setState({
			isShowPlace: false
		});
	};

	//category functions
	showAddCategory = () => {
		this.setState({
			isShowCategory: true
		});
	};
	showAddTimes = () => {
		this.setState({
			isShowTime: true
		});
	};
	cancelShowAddCategory = () => {
		this.setState({
			isShowCategory: false
		});
	};
	cancelShowAddTime = () => {
		this.setState({
			isShowTime: false
		});
	};

	showAddImage = () => {
		this.setState({
			isShowAddImage: true
		});
	};
	cancelShowAddImage = () => {
		this.setState({
			isShowAddImage: false
		});
	};

	showMembers = () => {
		this.setState({
			isShowMembers: true
		});
	};
	cancelShowMembers = () => {
		this.setState({
			isShowMembers: false
		});
	};
	render() {
		const { classes, activity } = this.props;
		const act = activity.currentActivity;
		const imgPath =
			'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) , url(' + config.imagesPath + act.logoPath + ')';
		return (
			<div className={classes.container}>
				{this.props.loading === true ? <CircularProgress disableShrink /> : null}
				{/* activity info  section */}
				{activity.isEdit === true ? <EditActivity /> : null}
				<div className={classes.header} style={{ backgroundImage: imgPath }}>
					<Tooltip title='Edit the header items' placement='bottom'>
						<div onClick={this.showActivity} className={classes.editIcon}>
							<IconItem name='edit' font='Feather' color='#fff' />
						</div>
					</Tooltip>
					<div className={classes.headerContent}>
						<div className={classes.title}>
							<h1>{act.name}</h1>
						</div>
						<div classNam={classes.desc}>
							<p> {act.description}</p>
						</div>
						<div className={classes.memberBtn}>
							<Button color='primary' onClick={this.showMembers}>
								Show members
							</Button>
						</div>
					</div>
					{activity.is_active ? <div className={classes.activeSign} /> : null}
				</div>
				{/* activity orgs */}
				<div className={classes.organizations}>
					<div className={classes.orgHeader}>
						<h1>Organizations</h1>
						<div onClick={this.showAddOrg} className={classes.iconCont}>
							<IconItem name='plus' color='#fff' size='2em' />
						</div>
					</div>
					<Grid container justify={'center'} alignItems={'center'}>
						<OrgFeed orgs={this.props.activity.orgs} activityID={act.id} />
					</Grid>
				</div>
				{/* activity groups */}
				<div className={classes.organizations}>
					<div className={classes.orgHeader}>
						<h1>Groups</h1>
						<div onClick={this.showAddGroup} className={classes.iconCont}>
							<IconItem name='plus' color='#fff' size='2em' />
						</div>
					</div>
					<Grid container justify={'center'} alignItems={'center'}>
						<GroupFeed groups={this.props.activity.groups} activityID={act.id} />
					</Grid>
				</div>
				{/* activity places */}
				<div className={classes.organizations}>
					<div className={classes.orgHeader}>
						<h1>Places</h1>
						<div onClick={this.showAddPlace} className={classes.iconCont}>
							<IconItem name='plus' color='#fff' size='2em' />
						</div>
					</div>
					<Grid container justify={'center'} alignItems={'center'}>
						<PlaceFeed places={this.props.activity.places} activityID={act.id} />
					</Grid>
				</div>
				{/* activity categories */}
				<div className={classes.organizations}>
					<div className={classes.orgHeader}>
						<h1>Categories</h1>
						<div onClick={this.showAddCategory} className={classes.iconCont}>
							<IconItem name='plus' color='#fff' size='2em' />
						</div>
					</div>
					<Grid container justify={'center'} alignItems={'center'}>
						<CategoryFeed categories={this.props.activity.categories} activityID={act.id} />
					</Grid>
				</div>
				{/**Activity contacts */}
				<div className={classes.organizations}>
					<div className={classes.orgHeader}>
						<h1> Contact info </h1>
						<div onClick={this.showAddContact} className={classes.iconCont}>
							<IconItem name='plus' color='#fff' size='2em' />
						</div>
					</div>
					<Grid container justify={'center'} alignItems={'center'}>
						<ContactTable contacts={this.props.activity.contacts} activityID={act.id} />
					</Grid>
				</div>
				{/**end activity contacts */}
				{/**Activity times */}
				<div className={classes.organizations}>
					<div className={classes.orgHeader}>
						<h1> Times </h1>
						<div onClick={this.showAddTimes} className={classes.iconCont}>
							<IconItem name='plus' color='#fff' size='2em' />
						</div>
					</div>
					<Grid container justify={'center'} alignItems={'center'}>
						<TimesTable times={this.props.activity.times} activityID={act.id} />
					</Grid>
				</div>
				{/**end activity times */}

				{/**Activity images */}
				<div className={classes.organizations}>
					<div className={classes.orgHeader}>
						<h1> Images </h1>
						<div onClick={this.showAddImage} className={classes.iconCont}>
							<IconItem name='plus' color='#fff' size='2em' />
						</div>
					</div>
					{!isEmpty(this.props.activity.images) ? (
						<div style={{ width: '80%', margin: '0 auto' }}>
							<ActivityImages images={changeToGallery(this.props.activity.images)} />
						</div>
					) : null}
				</div>
				{/**end activity images */}
				{/**start activity contacts */}
				{this.state.isShowContact === true ? (
					<ContactMain
						open={this.state.isShowContact}
						onCancel={this.cancelShowAddContact}
						currentActivity={act}
					/>
				) : null}
				{/**end activity contacts */}
				{/**start activity members */}
				{this.state.isShowMembers === true ? (
					<MemberMain
						open={this.state.isShowMembers}
						onCancel={this.cancelShowMembers}
						currentActivity={act}
						members={act.members}
					/>
				) : null}
				{/**end activity members */}
				<AddOrg open={this.state.isShowOrg} onCancel={this.cancelShowAddOrg} currentActivity={act} />

				<AddGroup open={this.state.isShowGroup} onCancel={this.cancelShowAddGroup} currentActivity={act} />

				<AddPlace open={this.state.isShowPlace} onCancel={this.cancelShowAddPlace} currentActivity={act} />

				<AddCategory
					open={this.state.isShowCategory}
					onCancel={this.cancelShowAddCategory}
					currentActivity={act}
				/>

				<AddTime
					open={this.state.isShowTime}
					onCancel={this.cancelShowAddTime}
					currentActivity={act}
					days={this.props.activity.days}
				/>

				{this.state.isShowAddImage === true ? (
					<AddImage activity={act} onCancel={this.cancelShowAddImage} />
				) : null}
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

export default connect(mapStateToProps, { getActivityById, getDays, showEdit, startLoading, endLoading, setLoading })(
	withStyles(styles, { withTheme: true })(ViewActivity)
);
