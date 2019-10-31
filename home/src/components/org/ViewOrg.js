import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../utils/config';

import changeToGallery from './../../utils/changeToGallery';
import isEmpty from './../../validation/is-empty';
import { Grid, Button, Paper, LinearProgress, Typography } from '@material-ui/core';
import { startLoading, endLoading, setLoading } from '../../actions/loading';
import { getOrgById } from './../../actions/organization';
import Title from '../common/Title';
// Generate required css
import IconItem from '../common/icons/IconItem';
import OrgImages from './OrgImages';
import Activities from './activities/Activities';
import randomBackground from '../../utils/randomBackground';
import { Col, Container, Row } from 'reactstrap';
import { Fade } from 'react-reveal';
const styles = (theme) => ({
	header: {
		position: 'relative',
		width: '100%',
		height: '50vh',
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
		margin: '40px auto',
		textAlign: 'left',
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
		color: '#fff',
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'none'
		}
	},
	white: {
		color: '#fff'
	},
	details: {
		color: '#fff'
	},
	memberBtn: {
		marginTop: '20px'
	},
	btn: {
		color: '#fff',
		borderColor: '#fff',
		padding: '10px',
		margin: '10px',

		borderRadius: '5px',
		border: '1px solid #fff',
		'&:hover': {
			textDecoration: 'none',
			fontWeight: 'bold',
			underline: 'none',
			color: theme.palette.primary.main,
			border: '1px solid ' + theme.palette.primary.main
		}
	},
	desc: {
		fontSize: '1rem'
	},
	subtitle: {
		textAlign: 'left',
		margin: '20px',
		marginTop: '20px',
		paddingTop: '20px',
		color: '#fff',
		borderTop: '1px solid #eee'
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
							<Typography className={classes.white} variant='h5'>
								{org.name}
							</Typography>
						</div>
						{!isEmpty(org.detail) ? (
							<div classNam={classes.desc}>
								<Typography variant='p' className={classes.details}>
									{' '}
									{org.detail}
								</Typography>
							</div>
						) : null}
						{!isEmpty(org.website) ? (
							<div className={classes.memberBtn}>
								<a variant='flat' className={classes.btn} target='#' href={org.website}>
									Besök
								</a>
							</div>
						) : null}
					</div>
				</div>
				{!isEmpty(org.description) ? (
					<Grid container>
						<Grid item md={8} lg={8} sm={'12'} style={{ padding: '20px' }}>
							<div className={classes.orgInfoContainer}>
								<Fade bottom>
									<Typography variant='p' className={classes.desc}>
										<p dangerouslySetInnerHTML={{ __html: org.description }} />
									</Typography>
								</Fade>
							</div>
						</Grid>
						<Grid
							item
							md={4}
							lg={4}
							sm={'12'}
							style={{ background: '#424242', color: '#fff', padding: '10px 10px 20px 10px ' }}
						>
							<div
								className={classes.orgInfoContainer}
								style={{ width: '100%', padding: '20px', margin: '0 auto', color: '#fff' }}
							>
								<Fade top>
									<div className={classes.logoContainer}>
										<img src={logo} className={classes.logo} alt={org.name} />
									</div>
								</Fade>
								<Typography variant='h6' className={classes.subtitle}>
									Kontakt info
								</Typography>
								{!isEmpty(org.website) ? (
									<Fade right>
										<div style={{ marginTop: '10px', fontSize: '0.9em', width: '100%' }}>
											<span style={{ margin: '10px' }}>
												<IconItem name='globe' font='Feather' color={mainColor} size={'1em'} />
											</span>
											<a className={classes.extLink} href={org.website}>
												{org.website}
											</a>
										</div>
									</Fade>
								) : null}
								{!isEmpty(org.contact) ? (
									<Fade right>
										<div style={{ marginTop: '10px', fontSize: '0.9em', width: '100%' }}>
											<span style={{ margin: '10px' }}>
												<IconItem name='user' font='Feather' color={mainColor} size={'1.2em'} />
											</span>

											{org.contact}
										</div>
									</Fade>
								) : null}
								{!isEmpty(org.email) ? (
									<Fade right>
										<div style={{ marginTop: '10px', fontSize: '0.9em', width: '100%' }}>
											<span style={{ margin: '10px' }}>
												<IconItem name='mail' font='Feather' color={mainColor} size={'1.2em'} />
											</span>
											<a className={classes.extLink} href={'mailto:' + org.email}>
												{org.email}
											</a>
										</div>
									</Fade>
								) : null}
								{!isEmpty(org.tel) ? (
									<Fade right>
										<div style={{ marginTop: '10px', fontSize: '0.9em', width: '100%' }}>
											<span style={{ margin: '10px' }}>
												<IconItem
													name='phone-call'
													font='Feather'
													color={mainColor}
													size={'1.2em'}
												/>
											</span>
											<a className={classes.extLink} href={'tel:' + org.email}>
												{org.tel}
											</a>
										</div>
									</Fade>
								) : null}
							</div>
						</Grid>
					</Grid>
				) : null}

				{!isEmpty(this.props.organization.images) ? (
					<div>
						<Container className={classes.organizations}>
							<Row>
								<div style={{ width: '100%', margin: '0 auto' }}>
									<OrgImages images={changeToGallery(this.props.organization.images)} />
								</div>
							</Row>
						</Container>
					</div>
				) : null}
				{!isEmpty(this.props.organization.activities) ? (
					<Grid container justify='center' alignItems='center' style={{ background: '#fff' }}>
						<Activities activities={this.props.organization.activities.filter((c) => c.is_active === 1)} />
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
