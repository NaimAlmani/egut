import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../utils/config';

import changeToGallery from './../../utils/changeToGallery';
import isEmpty from './../../validation/is-empty';
import { Grid, Button, Chip, Paper } from '@material-ui/core';
import { startLoading, endLoading, setLoading } from '../../actions/loading';
import { getPlaceById, showEdit } from './../../actions/place';
import customStyles from './../../theme/customStyles';
import ConfirmDelete from './../common/ConfirmDelete';
// Generate required css
import { Tooltip } from '@material-ui/core';
import CustomScroll from 'react-custom-scroll';
import IconItem from '../common/icons/IconItem';
import EditPlace from './EditPlace';
import AddImage from './AddImage';
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
	//pls section
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
	showPlace = () => {
		this.props.showEdit(this.props.pls.currentPlace, true);
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
		const { classes, place } = this.props;
		const pls = place.currentPlace;
		const mainColor = this.props.theme.palette.primary.main;
		const background =
			'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) , url(' + config.imagesPath + pls.image + ')';
		return (
			<div className={classes.container}>
				{/* place info  section */}
				{place.isEdit === true ? <EditPlace /> : null}
				<div className={classes.header} style={{ backgroundImage: background }}>
					<div className={classes.headerContent}>
						<div className={classes.title}>
							<h1>{pls.name}</h1>
						</div>
						{!isEmpty(pls.description) ? (
							<div className={classes.desc}>
								<p dangerouslySetInnerHTML={{ __html: pls.description }} />
							</div>
						) : null}

						<div className={classes.memberBtn}>
							<Button color='primary' onClick={this.showChangeBackground}>
								Ändra bakgrund
							</Button>
						</div>
					</div>
				</div>

				<div className={classes.chipsCont} />

				{this.state.isShowAddImage === true ? <AddImage pls={pls} onCancel={this.cancelShowAddImage} /> : null}
				{this.state.isShowEditBackground === true ? (
					<ChangeBackground place={pls} onCancel={this.hideChangeBackground} />
				) : null}
				<Grid container>
					<Activities title='Aktivititer' activities={this.props.place.activities} />
				</Grid>
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

export default connect(mapStateToProps, { getPlaceById, showEdit, startLoading, endLoading, setLoading })(
	withStyles(styles, { withTheme: true })(ViewPlace)
);
