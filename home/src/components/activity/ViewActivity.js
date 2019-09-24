import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../utils/config';
import changeToGallery from './../../utils/changeToGallery';
import isEmpty from './../../validation/is-empty';
import { Grid, CircularProgress, Button } from '@material-ui/core';
import { startLoading, endLoading, setLoading } from '../../actions/loading';
import { getActivityById, getDays } from './../../actions/activity';

// Generate required css
import { Tooltip, Typography } from '@material-ui/core';
import CustomScroll from 'react-custom-scroll';

import OrgFeed from './Orgs/OrgFeed';

import GroupFeed from './Group/GroupFeed';

import PlaceFeed from './Place/PlaceFeed';

import CategoryFeed from './Category/CategoryFeed';

import TimesTable from './Time/TimesTable';

import ActivityImages from './ActivityImages';

import ContactFeed from './contacts/ContactFeed';

import Participate from './Participate';

import MemberMain from './members/MemberMain';

import randomBackground from '../../utils/randomBackground';

import { Container, Row, Col } from 'reactstrap';
const styles = (theme) => ({
	header: {
		position: 'relative',
		width: '100%',
		height: '60vh',
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
		color: '#333',
		background: '#fff'
	},
	sectionBlack: {
		color: '#fff',
		background: theme.palette.secondary.main
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
	},
	memberBtn: {
		marginTop: '10px'
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

			isShowMembers: false,

			isParticipate: false
		};
		this.props.startLoading();
	}
	onParticipate = () => {
		this.setState({
			isParticipate: true
		});
	};
	hideParticipation = () => {
		this.setState({
			isParticipate: false
		});
	};

	componentDidMount() {
		this.props.getActivityById(this.props.match.params.id);
		this.props.getDays();
	}
	render() {
		const { classes, activity } = this.props;
		const act = activity.currentActivity;
		const imgPath = isEmpty(act.logoPath)
			? randomBackground(0)
			: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) , url(' + config.imagesPath + act.logoPath + ')';
		return (
			<div className={classes.container}>
				{/* activity info  section */}
				<div className={classes.header} style={{ backgroundImage: imgPath }}>
					<div className={classes.headerContent}>
						<div className={classes.title}>
							<Typography variant='h4' style={{ color: '#fff' }}>
								{act.name}
							</Typography>
						</div>
						<div className={classes.memberBtn}>
							<Button color='primary' variant='outlined' onClick={this.onParticipate}>
								Delta nu
							</Button>
						</div>
					</div>
				</div>

				{/**Activity times */}
				<Grid container justify='center'>
					<Grid
						item
						md={8}
						lg={8}
						sm={12}
						className={classes.sectionWhite}
						style={{ background: '#fff', paddingLeft: '20px' }}
					>
						<div style={{ textAlign: 'center', display: 'inline-block', margin: '20px' }}>
							<GroupFeed isWhite={false} groups={this.props.activity.groups} activityID={act.id} />
						</div>
						<div style={{ textAlign: 'center', display: 'inline-block', margin: '20px' }}>
							<CategoryFeed
								isWhite={true}
								categories={this.props.activity.categories}
								activityID={act.id}
							/>
						</div>
						<div style={{ marginLeft: '30px' }}>
							<p dangerouslySetInnerHTML={{ __html: act.description }} />
						</div>
					</Grid>

					{/* activity orgs */}

					<Grid
						item
						justify='center'
						alignContent='center'
						md={4}
						lg={4}
						sm={12}
						className={classes.sectionWhite}
						style={{ background: 'rgb(97, 96, 84)' }}
					>
						<Grid container justify='center' alignItems='center'>
							<ContactFeed contacts={this.props.activity.contacts} activityID={act.id} />
						</Grid>
						<div>
							<TimesTable times={this.props.activity.times} />
						</div>
					</Grid>
				</Grid>
				<Grid>
					<div className={classes.orgHeader} style={{ margin: '40px' }}>
						<Typography variant='h6'>Arrangerat av</Typography>
					</div>
					<Grid container justify={'center'} alignItems={'center'}>
						<OrgFeed orgs={this.props.activity.orgs} activityID={act.id} />
					</Grid>
				</Grid>

				{/**Activity images */}

				{!isEmpty(this.props.activity.images) ? (
					<div>
						<Container className={classes.organizations}>
							<Row>
								<div style={{ width: '80%', margin: '0 auto' }}>
									<ActivityImages images={changeToGallery(this.props.activity.images)} />
								</div>
							</Row>
						</Container>
					</div>
				) : null}
				{/**end activity images */}
				<Participate open={this.state.isParticipate} activity={act} onClose={this.hideParticipation} />
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

export default connect(mapStateToProps, { getActivityById, getDays, startLoading, endLoading, setLoading })(
	withStyles(styles, { withTheme: true })(ViewActivity)
);
