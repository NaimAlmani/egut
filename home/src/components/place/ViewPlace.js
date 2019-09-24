import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../utils/config';

import changeToGallery from './../../utils/changeToGallery';
import isEmpty from './../../validation/is-empty';
import { Grid, Button, Paper, LinearProgress } from '@material-ui/core';
import { startLoading, endLoading, setLoading } from '../../actions/loading';
import { getPlaceById } from './../../actions/place';
import Title from '../common/Title';
// Generate required css
import IconItem from '../common/icons/IconItem';
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
class ViewPlace extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowAddImage: false,
			isShowEditBackground: false
		};
		this.props.startLoading();
	}

	componentDidMount() {
		this.props.getPlaceById(this.props.match.params.id);
	}
	render() {
		const { classes, place } = this.props;
		const org = place.currentPlace;
		const mainColor = this.props.theme.palette.primary.main;
		const backgroundSrc = isEmpty(org.image) ? randomBackground(0) : config.imagesPath + org.image;
		const background = 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)) , url(' + backgroundSrc + ')';
		return (
			<div className={classes.container}>
				{this.props.loading === true ? <LinearProgress disableShrink /> : null}
				{/* place info  section */}
				<div className={classes.header} style={{ backgroundImage: background, backgroundAttachment: 'fixed' }}>
					<div className={classes.headerContent}>
						<div className={classes.title}>
							<h1>{org.name}</h1>
						</div>
						{!isEmpty(org.description) ? (
							<div classNam={classes.desc}>
								<p dangerouslySetInnerHTML={{ __html: org.description }} />
							</div>
						) : null}
					</div>
				</div>
				{!isEmpty(this.props.place.activities) ? (
					<Grid container>
						<Activities activities={this.props.place.activities} />
					</Grid>
				) : null}
			</div>
		);
	}
}

ViewPlace.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	place: state.place,
	loading: state.loading
});

export default connect(mapStateToProps, { getPlaceById, startLoading, endLoading, setLoading })(
	withStyles(styles, { withTheme: true })(ViewPlace)
);
