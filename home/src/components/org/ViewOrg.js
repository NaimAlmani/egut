import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../utils/config';

import changeToGallery from './../../utils/changeToGallery';
import isEmpty from './../../validation/is-empty';
import { Grid, CircularProgress, Button, Paper, LinearProgress } from '@material-ui/core';
import { startLoading, endLoading, setLoading } from '../../actions/loading';
import { getOrgById } from './../../actions/organization';
import Title from '../common/Title';
// Generate required css
import IconItem from '../common/icons/IconItem';
import OrgImages from './OrgImages';
import Activities from './activities/Activities';
import randomBackground from '../../utils/randomBackground';
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
		width: '200px',
		height: 'auto',
		maxHeight: '200px',
		overflow: 'hidden',
		margin: '20px auto'
	},
	logo: {
		width: '100%',
		height: '100%'
	},
	activityContainer: {
		textAlign: 'center'
	},
	extLink: {
		color: '#333',
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'none'
		}
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
	render() {
		const { classes, organization } = this.props;
		const org = organization.currentOrganization;
		const mainColor = this.props.theme.palette.primary.main;
		const backgroundSrc = isEmpty(org.background) ? randomBackground(0) : config.imagesPath + org.background;
		const background = 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)) , url(' + backgroundSrc + ')';
		const logo = config.imagesPath + org.logoPath;
		return (
			<div className={classes.container}>
				{this.props.loading === true ? <LinearProgress disableShrink /> : null}
				{/* organization info  section */}
				<div className={classes.header} style={{ backgroundImage: background, backgroundAttachment: 'fixed' }}>
					<div className={classes.headerContent}>
						<div className={classes.logoContainer}>
							<img src={logo} className={classes.logo} alt={org.name} />
						</div>
						<div className={classes.title}>
							<h1>{org.name}</h1>
						</div>
						{!isEmpty(org.detail) ? (
							<div classNam={classes.desc}>
								<p> {org.detail}</p>
							</div>
						) : null}
						{!isEmpty(org.website) ? (
							<div className={classes.memberBtn}>
								<Button className={classes.btn} color='secondary' variant='outlined' href={org.website}>
									visa mer
								</Button>
							</div>
						) : null}
					</div>
				</div>

				<div className={classes.chipsCont}>
					<Paper
						style={{
							width: '100%',
							margin: ' 20px auto',
							marginTop: '0',
							padding: '20px 10px'
						}}
					>
						<h3 style={{ textAlign: 'center' }}>Kontakt info</h3>
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
				{!isEmpty(org.description) ? (
					<div className={classes.orgInfoContainer}>
						<p className={classes.desc}>{org.description}</p>
					</div>
				) : null}
				{!isEmpty(this.props.organization.images) ? (
					<div className={classes.organizations}>
						<div className={classes.orgHeader}>
							<Title text={'Galleri'} subText='' color={this.props.theme.palette.primary.main} />
						</div>

						<div style={{ width: '80%', margin: '0 auto' }}>
							<OrgImages images={changeToGallery(this.props.organization.images)} />
						</div>
					</div>
				) : null}
				{!isEmpty(this.props.organization.activities) ? (
					<Grid container>
						<Activities activities={this.props.organization.activities} />
					</Grid>
				) : null}
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
