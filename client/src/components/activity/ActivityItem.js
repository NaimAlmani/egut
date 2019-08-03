import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';
import randomColor from './../../utils/randomColor';
import config from './../../utils/config';
import { Grid } from '@material-ui/core';
import { showEdit, deleteActivity, ActivateActivity } from './../../actions/activity';
import customStyles from './../../theme/customStyles';
import ConfirmDelete from './../common/ConfirmDelete';
// Generate required css
import { Card, CardActionArea, CardActions, CardContent, Switch, Button, Typography } from '@material-ui/core';
import CustomScroll from 'react-custom-scroll';
import AOS from 'aos';
const styles = (theme) => ({
	root: {
		color: theme.palette.primary.main,
		height: '350px',
		overflow: 'auto'
	},
	card: {
		maxWidth: 345,
		margin: '24px  auto',
		height: '350',
		overflow: 'auto',
		textAlign: 'center',
		position: 'relative'
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
	overlay: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: '0',
		left: '0'
	},
	link: {
		textDecoration: 'none !important',
		'&hover': {
			textDecoration: 'none',
			color: '#fff'
		}
	},
	title: {
		color: '#fff'
	},
	description: {
		color: '#fff'
	}
});

class ActivityItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false,
			isActive: false
		};
		AOS.init();
		this.selectActivity = this.selectActivity.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onConfirmDelete = this.onConfirmDelete.bind(this);
		this.onCancelDelete = this.onCancelDelete.bind(this);
		this.onActivate = this.onActivate.bind(this);
	}
	componentDidMount() {
		this.setState({
			isActive: this.props.activity.is_active === 1 ? true : false
		});
	}
	componentDidCatch(error, info) {
		// You can also log the error to an error reporting service
	}
	componentWillReceiveProps(nextprops) {
		AOS.refresh();
	}
	onDelete() {
		this.setState({
			isDelete: true
		});
	}
	onConfirmDelete() {
		const activity = {
			id: this.props.activity.id
		};
		this.props.deleteActivity(activity);
	}
	onCancelDelete() {
		this.setState({
			isDelete: false
		});
	}
	selectActivity = () => {
		this.props.showEdit(this.props.activity, true);
	};
	onActivate = (event) => {
		this.setState({
			isActive: event.target.checked
		});
		this.props.ActivateActivity(this.props.activity.id, event.target.checked);
	};
	render() {
		const { classes, activity } = this.props;
		const imgPath =
			'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) , url(' +
			config.imagesPath +
			activity.logoPath +
			')';
		return (
			<Grid item xs={12} sm={6} md={3}>
				<Fade bottom>
					<Card className={classes.card} style={{ background: imgPath }}>
						<div className={classes.overlay} style={{ background: randomColor(this.props.index) }} />
						<CardActionArea className={classes.root}>
							<Link to={'activity/' + activity.id} className={classes.link}>
								<CardContent>
									<Typography className={classes.title} gutterBottom variant='h5' component='h2'>
										{activity.name}
									</Typography>
									<Typography className={classes.description} component='p'>
										{activity.description}
									</Typography>
								</CardContent>
							</Link>
						</CardActionArea>
						<CardActions style={{ background: '#fff', textAlign: 'center' }}>
							<Button size='small' className={classes.deleteBtn} onClick={this.onDelete}>
								Delete
							</Button>
							<Button size='small' color='#f00' onClick={this.selectActivity}>
								Edit
							</Button>
							<Switch
								checked={activity.is_active === 1 ? true : false}
								onChange={this.onActivate}
								value='checkedB'
								color='primary'
							/>
						</CardActions>
					</Card>
					<ConfirmDelete
						open={this.state.isDelete}
						title='Are you Sure ??'
						text={'do you want to delete ' + activity.name}
						onClose={this.onCancelDelete}
						onDelete={this.onConfirmDelete}
					/>
				</Fade>
			</Grid>
		);
	}
}

ActivityItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { showEdit, deleteActivity, ActivateActivity })(
	withStyles(styles, { withTheme: true })(ActivityItem)
);
