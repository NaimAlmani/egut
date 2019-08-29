import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../utils/config';

import changeToGallery from './../../utils/changeToGallery';
import isEmpty from './../../validation/is-empty';
import { Grid, CircularProgress, Button, Chip, Paper } from '@material-ui/core';
import { startLoading, endLoading, setLoading } from '../../actions/loading';
import { getOrgById, showEdit } from './../../actions/organization';
import customStyles from './../../theme/customStyles';
import ConfirmDelete from './../common/ConfirmDelete';
// Generate required css
import { Tooltip } from '@material-ui/core';
import CustomScroll from 'react-custom-scroll';
import IconItem from '../common/icons/IconItem';
import EditOrg from './EditOrg';
import AddImage from './AddImage';
import OrgImages from './OrgImages';
import Activities from './activities/Activities';
import ChangeBackground from './ChangeBackground';
const styles = (theme) => ({
	header: {
		position: 'relative',
		width: '100%',
		height: '80vh',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
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
		width: '80%',
		margin: '40px auto',
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
		padding: '5px',
		maxWidth: '500px'
	},
	img: {
		// ⚠️ object-fit is not supported by IE 11.
		objectFit: 'cover',
		width: '100%',
		height: 'auto',
		maxHeight: '200px'
	},
	activityContainer: {
		textAlign: 'center'
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
	}

	componentDidMount() {
		this.props.getOrgById(this.props.match.params.id);
	}
	showOrganization = () => {
		this.props.showEdit(this.props.organization.currentOrg, true);
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
	showChangeBackground = () => {
		this.setState({
			isShowEditBackground: true
		});
	};
	hideChangeBackground = () => {
		this.setState({
			isShowEditBackground: false
		});
	};
	render() {
		const { classes, organization } = this.props;
		const org = organization.currentOrganization;
		const mainColor = this.props.theme.palette.primary.main;
		const background =
			'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) , url(' + config.imagesPath + org.background + ')';
		const logo = config.imagesPath + org.logoPath;
		return (
			<div className={classes.container}>
				{/* organization info  section */}
				{organization.isEdit === true ? <EditOrg /> : null}
				<div className={classes.header} style={{ backgroundImage: background }}>
					<div className={classes.headerContent}>
						<div className={classes.logoContainer}>
							<img src={logo} className={classes.img} alt={org.name} />
						</div>
						<div className={classes.title}>
							<h1>{org.name}</h1>
						</div>
						{!isEmpty(org.detail) ? (
							<div className={classes.desc}>
								<p> {org.detail}</p>
							</div>
						) : null}

						<div className={classes.memberBtn}>
							<Button color='primary' onClick={this.showChangeBackground}>
								Change background
							</Button>
						</div>
					</div>
				</div>

				<div className={classes.chipsCont}>
					<Paper
						style={{
							width: '100%',
							margin: ' 20px auto',
							padding: '20px 10px'
						}}
					>
						<h3 style={{ textAlign: 'center' }}>Contact info</h3>

						<Grid container justify='center'>
							{!isEmpty(org.website) ? (
								<Grid
									item
									xs={12}
									sm={6}
									md={3}
									style={{
										fontSize: '1.25em',
										textAlign: 'center'
									}}
								>
									<span style={{ margin: '2px' }}>
										<IconItem name='globe' font='Feather' color={mainColor} size={'1em'} />
									</span>
									<a className={classes.extLink} href={org.website}>
										{org.website}
									</a>
								</Grid>
							) : null}

							{!isEmpty(org.contact) ? (
								<Grid
									item
									xs={12}
									sm={6}
									md={3}
									style={{
										fontSize: '1.25em',
										textAlign: 'center'
									}}
								>
									<span style={{ margin: '2px' }}>
										<IconItem name='user' font='Feather' color={mainColor} size={'1.2em'} />
									</span>

									{org.contact}
								</Grid>
							) : null}
							{!isEmpty(org.email) ? (
								<Grid
									item
									xs={12}
									sm={6}
									md={3}
									style={{
										fontSize: '1.25em',
										textAlign: 'center'
									}}
								>
									<span style={{ margin: '2px' }}>
										<IconItem name='mail' font='Feather' color={mainColor} size={'1.2em'} />
									</span>
									<a className={classes.extLink} href={'mailto:' + org.email}>
										{org.email}
									</a>
								</Grid>
							) : null}
							{!isEmpty(org.tel) ? (
								<Grid
									item
									xs={12}
									sm={6}
									md={3}
									style={{
										fontSize: '1.25em',
										textAlign: 'center'
									}}
								>
									<span style={{ margin: '2px' }}>
										<IconItem name='phone-call' font='Feather' color={mainColor} size={'1.2em'} />
									</span>
									<a className={classes.extLink} href={'tel:' + org.email}>
										{org.tel}
									</a>
								</Grid>
							) : null}
						</Grid>
					</Paper>
				</div>

				<div className={classes.orgInfoContainer}>
					<p className={classes.desc}>{org.description}</p>
				</div>

				<div className={classes.organizations}>
					<div className={classes.orgHeader}>
						<h1> Images </h1>
						<div onClick={this.showAddImage} className={classes.iconCont}>
							<IconItem name='plus' color='#fff' size='2em' />
						</div>
					</div>
					{!isEmpty(this.props.organization.images) ? (
						<div style={{ width: '80%', margin: '0 auto' }}>
							<OrgImages images={changeToGallery(this.props.organization.images)} />
						</div>
					) : null}
				</div>
				{this.state.isShowAddImage === true ? <AddImage org={org} onCancel={this.cancelShowAddImage} /> : null}
				{this.state.isShowEditBackground === true ? (
					<ChangeBackground org={org} onCancel={this.hideChangeBackground} />
				) : null}
				<Grid container>
					<Activities title='Activities' activities={this.props.organization.activities} />
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

export default connect(mapStateToProps, { getOrgById, showEdit, startLoading, endLoading, setLoading })(
	withStyles(styles, { withTheme: true })(ViewOrg)
);
