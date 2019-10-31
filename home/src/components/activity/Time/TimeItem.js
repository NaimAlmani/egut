import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../../utils/config';
import { ListItem, Typography } from '@material-ui/core';
import IconItem from './../../common/icons/IconItem';
import isEmpty from './../../../validation/is-empty';
import { Fade } from 'react-reveal';
// Generate required css

const styles = (theme) => ({
	root: {
		color: theme.palette.primary.main,
		minHeight: '250px'
	},
	card: {
		maxWidth: 345,
		margin: '24px  auto',
		height: '350',
		overflow: 'auto',
		border: 'none',
		boxShadow: 'none',
		textAlign: 'center'
	},
	mediaContaier: {
		width: '40%',
		height: 'auto',
		margin: '0 auto'
	},
	image: {
		// ⚠️ object-fit is not supported by IE 11.
		width: '100%'
	},
	deleteBtn: {
		color: theme.palette.error.main,
		background: theme.palette.error.contrastText,
		margin: '0 auto'
	},

	deselectedAvatar: {
		background: theme.palette.primary.main
	},
	selectedAvatar: {
		background: theme.palette.pink.main,
		width: '50px',
		height: '50px'
	},
	orgImgCont: {
		width: '100px',
		height: '50px',
		overflow: 'hidden',
		borderTopLeftRadius: '4px',
		borderBottomLeftRadius: '4px'
	},
	textCont: {
		margin: '10px',
		display: 'inline-block',
		textAlign: 'center'
	},
	text: {
		fontSize: '1em',
		color: '#333',
		lineHeight: '2',
		color: '#fff'
	},
	datetext: {
		color: '#bdbdbd',
		fontSize: '1em'
	},
	Placetext: {
		color: '#bdbdbd',
		fontSize: '0.7em'
	},
	selectedText: {
		fontSize: '1.3em',
		color: '#fff',
		lineHeight: '2'
	},
	divRoot: {
		borderBottom: '1px solid #bdbdbd',
		padding: '5px',
		margin: '10px',
		cursor: 'pointer',
		width: '90%',
		margin: '0 auto',
		'&:hover': {
			background: '#000'
		}
	},
	listItemRootSelected: {
		border: '1px solid #1976d2',
		background: '#000',
		padding: '5px',
		margin: '10px',
		borderRadius: '10px',
		cursor: 'pointer',
		'&:hover': {
			background: '#000'
		}
	},
	IconCont: {
		position: 'absolute',
		top: '10px',
		right: '10px'
	},
	rightSection: {
		textAlign: 'right',
		display: 'block',
		width: '80%',
		float: 'right'
	},
	orgs: {
		width: '100%',
		textAlign: 'right',
		float: 'right',
		margin: '10px'
	}
});
class TimeItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false,
			day: '',
			place: ''
		};
	}

	componentDidCatch(error, info) {
		console.log(error);
	}
	render() {
		const { classes, time } = this.props;
		let day = '';
		if (!isEmpty(this.props.activity.days)) {
			day = this.props.activity.days.filter((c) => c.id === this.props.time.day_id)[0].name;
		}

		let place = '';
		if (!isEmpty(this.props.activity.places)) {
			place = this.props.activity.places.filter((c) => c.id === this.props.time.place_id)[0].name;
		}

		return (
			<Fade>
				<ListItem classes={{ root: classes.divRoot }} alignItems='flex-start'>
					<div className={classes.textCont}>
						<Typography noWrap={true} variant='p'>
							<span className={classes.text}>{day}</span>
						</Typography>
					</div>

					<div className={classes.rightSection}>
						<div className={classes.times}>
							<Typography noWrap={true} component='p' variant='body1'>
								<span className={classes.datetext}>{'från :' + time.start_time}</span>
								<span className={classes.datetext}>{' - till: ' + time.end_time}</span>
							</Typography>
						</div>
						<div className={classes.place}>
							<Typography noWrap={true} component='p' variant='body1 '>
								<span className={classes.Placetext}>{place}</span>
							</Typography>
						</div>
					</div>
				</ListItem>
			</Fade>
		);
	}
}

TimeItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	activity: state.activity
});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(TimeItem));
