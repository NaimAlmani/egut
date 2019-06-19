import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../utils/config';
import { Grid, CircularProgress } from '@material-ui/core';
import { startLoading, endLoading, setLoading } from '../../actions/loading';
import { getActivityById, showEdit } from './../../actions/activity';
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
import CategoryFeed from './addCategory/CategoryFeed';

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
			isShowGroup: false,
			isShowPlace: false,
			isShowCategory: false,
			loading: true
		};
		this.props.startLoading();
	}

	componentDidMount() {
		this.props.setLoading(true);
		this.props.getActivityById(this.props.match.params.id);
		// You can also log the error to an error reporting service
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
	cancelShowAddCategory = () => {
		this.setState({
			isShowCategory: false
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
				<AddOrg open={this.state.isShowOrg} onCancel={this.cancelShowAddOrg} currentActivity={act} />

				<AddGroup open={this.state.isShowGroup} onCancel={this.cancelShowAddGroup} currentActivity={act} />

				<AddPlace open={this.state.isShowPlace} onCancel={this.cancelShowAddPlace} currentActivity={act} />

				<AddCategory
					open={this.state.isShowCategory}
					onCancel={this.cancelShowAddCategory}
					currentActivity={act}
				/>
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

export default connect(mapStateToProps, { getActivityById, showEdit, startLoading, endLoading, setLoading })(
	withStyles(styles, { withTheme: true })(ViewActivity)
);
