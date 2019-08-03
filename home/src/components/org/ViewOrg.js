import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../utils/config';

import changeToGallery from './../../utils/changeToGallery';
import isEmpty from './../../validation/is-empty';
import { Grid, CircularProgress, Button, Chip, LinearProgress } from '@material-ui/core';
import { startLoading, endLoading, setLoading } from '../../actions/loading';
import { getOrgById } from './../../actions/organization';
import Title from '../common/Title';
// Generate required css
import IconItem from '../common/icons/IconItem';
import OrgImages from './OrgImages';
import Activities from './activities/Activities';
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
	},
	orgInfoContainer: {
		width: '50%',
		margin: '0 auto',
		textAlign: 'center',
		fontSize: '1.25em'
	},
	chipsCont: {
		textAlign: 'center'
	},
	chip: {
		margin: '10px'
	},
	logoContainer: {
		background: '#fff',
		borderRadius: '15px',
		maxHeight: '500px',
		margin: '0 auto',
		overflow: 'hidden',
		boxShadow: '1px 1px 1px #f0f0f0',
		padding: '5px'
	},
	img: {
		width: '90%',
		height: 'auto'
	},
	activityContainer: {
		textAlign: 'center'
	},
	btn: {
		color: '#fff',
		fontWeight: 'bold',
		borderColor: '#fff',
		borderRadius: '10px'
	}
});
class ViewOrg extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowAddImage: false,
			isShowEditBackground: false
		};
		this.props.startLoading();
		this.props.getOrgById(this.props.match.params.id);
	}

	componentDidMount() {
		this.props.getOrgById(this.props.match.params.id);
	}
	render() {
		const { classes, organization } = this.props;
		const org = organization.currentOrganization;
		const mainColor = this.props.theme.palette.primary.main;
		const background =
			'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)) , url(' + config.imagesPath + org.background + ')';
		const logo = config.imagesPath + org.logoPath;
		return (
			<div className={classes.container}>
				{this.props.loading === true ? <LinearProgress disableShrink /> : null}
				{/* organization info  section */}
				<div className={classes.header} style={{ backgroundImage: background, backgroundAttachment: 'fixed' }}>
					<div className={classes.headerContent}>
						<div className={classes.logoContainer}>
							<img src={logo} classsName={classes.img} alt={org.name} />
						</div>
						<div className={classes.title}>
							<h1>{org.name}</h1>
						</div>
						<div classNam={classes.desc}>
							<p> {org.detail}</p>
						</div>
						<div className={classes.memberBtn}>
							<Button className={classes.btn} color='secondary' variant='outlined' href={org.website}>
								visa mer
							</Button>
						</div>
					</div>
				</div>
				<div className={classes.orgInfoContainer}>
					<p className={classes.desc}>{org.description}</p>
				</div>
				<div className={classes.chipsCont}>
					{!isEmpty(org.website) ? (
						<Chip
							icon={
								<span style={{ margin: '2px' }}>
									<IconItem name='globe' font='Feather' color={mainColor} size={'1.2em'} />
								</span>
							}
							label={org.website}
							clickable
							className={classes.chip}
							color='primary'
							variant='outlined'
						/>
					) : null}

					{!isEmpty(org.contact) ? (
						<Chip
							icon={
								<span style={{ margin: '2px' }}>
									<IconItem name='user' font='Feather' color={mainColor} size={'1.2em'} />
								</span>
							}
							label={org.contact}
							clickable
							className={classes.chip}
							color='primary'
							variant='outlined'
						/>
					) : null}
					{!isEmpty(org.email) ? (
						<Chip
							icon={
								<span style={{ margin: '2px' }}>
									<IconItem name='mail' font='Feather' color={mainColor} size={'1.2em'} />
								</span>
							}
							label={org.email}
							clickable
							className={classes.chip}
							color='primary'
							variant='outlined'
						/>
					) : null}
					{!isEmpty(org.tel) ? (
						<Chip
							icon={
								<span style={{ margin: '2px' }}>
									<IconItem name='phone-call' font='Feather' color={mainColor} size={'1.2em'} />
								</span>
							}
							label={org.tel}
							clickable
							className={classes.chip}
							color='primary'
							variant='outlined'
						/>
					) : null}
				</div>
				<div className={classes.organizations}>
					<div className={classes.orgHeader}>
						<Title text={'Galleri'} subText='' color={this.props.theme.palette.primary.main} />
					</div>
					{!isEmpty(this.props.organization.images) ? (
						<div style={{ width: '80%', margin: '0 auto' }}>
							<OrgImages images={changeToGallery(this.props.organization.images)} />
						</div>
					) : null}
				</div>
				<Grid container>
					<Activities activities={this.props.organization.activities} />
				</Grid>
			</div>
		);
	}
}

ViewOrg.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	organization: state.organization,
	loading: state.loading
});

export default connect(mapStateToProps, { getOrgById, startLoading, endLoading, setLoading })(
	withStyles(styles, { withTheme: true })(ViewOrg)
);
