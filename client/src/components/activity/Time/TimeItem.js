import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../../utils/config';
import { Grid, TableRow, TableCell } from '@material-ui/core';
import { deleteTime } from './../../../actions/activity';
import ConfirmDelete from '../../common/ConfirmDelete';
import IconItem from './../../common/icons/IconItem';
import isEmpty from './../../../validation/is-empty';
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
		objectFit: 'cover',
		width: '100%'
	},
	deleteBtn: {
		color: theme.palette.error.main,
		background: theme.palette.error.contrastText,
		margin: '0 auto'
	},
	avatar: {
		margin: '10px auto',
		width: 60,
		height: 60,
		background: theme.palette.error.main
	},
	trashIcon: {
		color: theme.palette.error.main,
		cursor: 'pointer'
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

		this.onDelete = this.onDelete.bind(this);
		this.onConfirmDelete = this.onConfirmDelete.bind(this);
		this.onCancelDelete = this.onCancelDelete.bind(this);
	}

	componentDidCatch(error, info) {
		console.log(error);
	}
	onDelete() {
		this.setState({
			isDelete: true
		});
	}
	onConfirmDelete() {
		this.props.deleteTime(this.props.activityID, this.props.time.id);
	}
	onCancelDelete() {
		this.setState({
			isDelete: false
		});
	}
	render() {
		const { classes, time } = this.props;
		const themeColors = this.props.theme.palette;
		let day = '';
		if (!isEmpty(this.props.activity.days)) {
			day = this.props.activity.days.filter((c) => c.id === this.props.time.day_id)[0].name;
		}

		let place = '';
		if (!isEmpty(this.props.activity.places)) {
			place = this.props.activity.places.filter((c) => c.id === this.props.time.place_id)[0].name;
		}

		return (
			<TableRow key={time.name}>
				<TableCell align='right'>{day}</TableCell>
				<TableCell align='right'>{time.start_time}</TableCell>
				<TableCell align='right'>{time.end_time}</TableCell>
				{time.is_weekly === 1 ? (
					<TableCell align='right'>weekly</TableCell>
				) : (
					<TableCell align='right'>{time.date}</TableCell>
				)}
				<TableCell>{place}</TableCell>
				<TableCell align='right'>
					<span onClick={this.onDelete} className={classes.trashIcon}>
						<IconItem name='trash-2' color={themeColors.error.main} />
					</span>
				</TableCell>
				<ConfirmDelete
					open={this.state.isDelete}
					title='Are you Sure ??'
					text={'do you want to delete ??'}
					onClose={this.onCancelDelete}
					onDelete={this.onConfirmDelete}
				/>
			</TableRow>
		);
	}
}

TimeItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	activity: state.activity
});

export default connect(mapStateToProps, { deleteTime })(withStyles(styles, { withTheme: true })(TimeItem));
