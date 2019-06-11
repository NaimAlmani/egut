import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../utils/config';
import { Grid } from '@material-ui/core';
import { showEdit, deleteActivity } from './../../actions/activity';
import customStyles from './../../theme/customStyles';
import ConfirmDelete from './../common/ConfirmDelete';
// Generate required css
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
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
	}
});
class ActivityItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false
		};
		AOS.init();
		this.selectActivity = this.selectActivity.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onConfirmDelete = this.onConfirmDelete.bind(this);
		this.onCancelDelete = this.onCancelDelete.bind(this);
	}
	componentDidMount() {}
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
	render() {
		const { classes, activity } = this.props;
		return (
			<Grid item xs={12} sm={6} md={3}>
				<div data-aos='fade-up'>
					<Card className={classes.card}>
						<CardActionArea className={classes.root}>
							<Link to={'activity/' + activity.id}>
								<div className={classes.mediaContaier}>
									<img
										className={classes.image}
										src={config.imagesPath + activity.logoPath}
										alt='logo'
									/>
								</div>
								<CardContent>
									<Typography gutterBottom variant='h5' component='h2'>
										{activity.name}
									</Typography>
									<Typography component='p'>{activity.description}</Typography>
								</CardContent>
							</Link>
						</CardActionArea>
						<CardActions>
							<Button size='small' className={classes.deleteBtn} onClick={this.onDelete}>
								Delete
							</Button>
							<Button size='small' color='primary' onClick={this.selectActivity}>
								Edit
							</Button>
						</CardActions>
					</Card>
					<ConfirmDelete
						open={this.state.isDelete}
						title='Are you Sure ??'
						text={'do you want to delete ' + activity.name}
						onClose={this.onCancelDelete}
						onDelete={this.onConfirmDelete}
					/>
				</div>
			</Grid>
		);
	}
}

ActivityItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { showEdit, deleteActivity })(
	withStyles(styles, { withTheme: true })(ActivityItem)
);
