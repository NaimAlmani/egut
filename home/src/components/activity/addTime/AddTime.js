import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
	Select,
	Input,
	TextField,
	FormControl,
	FormControlLabel,
	Checkbox,
	InputLabel,
	Dialog,
	DialogContent,
	Slide,
	DialogTitle,
	DialogActions,
	Button
} from '@material-ui/core';
import isEmpty from './../../../validation/is-empty';
import { addTimesToActivity } from './../../../actions/activity';
import IconItem from './../../common/icons/IconItem';
function Transition(props) {
	return <Slide direction='up' {...props} />;
}

const styles = (theme) => ({
	contentContainer: {
		marginTop: '70px',
		width: '100%'
	},
	dialogPapers: {
		width: '50%',
		textAlign: 'center',
		overflow: 'none'
	},
	FormControl: {
		margin: '10px',
		width: '90%'
	}
});
class AddTime extends Component {
	constructor(props) {
		super(props);
		this.state = {
			place: '',
			places: [],
			selectedDate: new Date(),
			is_weekly: true,
			days: [],
			day: '',
			date: '',
			start_time: '7:30 AM',
			end_time: '7:30 AM'
		};
		this.changePlace = this.changePlace.bind(this);
		this.changeDay = this.changeDay.bind(this);
		this.onDateChange = this.onDateChange.bind(this);
		this.onStartTimeChange = this.onStartTimeChange.bind(this);
		this.onEndTimeChange = this.onEndTimeChange.bind(this);
		this.AddTimes = this.AddTimes.bind(this);
	}
	handleDateChange(date) {
		this.setState({
			selectedDate: date
		});
	}
	changePlace(e) {
		this.setState({
			place: e.target.value
		});
	}
	changeDay(e) {
		this.setState({
			day: e.target.value
		});
	}
	onDateChange(e) {
		this.setState({
			date: e.target.value
		});
	}
	onStartTimeChange(e) {
		this.setState({
			start_time: e.target.value
		});
	}
	onEndTimeChange(e) {
		this.setState({
			end_time: e.target.value
		});
	}
	componentDidMount() {
		if (!isEmpty(this.props.activity.places)) {
			this.setState({
				place: this.props.activity.places[0].id
			});
		}
	}
	isWeeklyChange = (e) => {
		this.setState({
			is_weekly: !this.state.is_weekly
		});
	};

	AddTimes() {
		console.log(this.state.start_time);
		console.log('this.state.start_time');
		const newTime = {
			activity_id: this.props.activity.currentActivity.id,
			is_weekly: this.state.is_weekly,
			day_id: this.state.day,
			place_id: this.state.place,
			start_time: this.state.start_time,
			end_time: this.state.end_time,
			date: isEmpty(this.state.date) ? Date(Date.now()) : this.state.date
		};
		this.props.addTimesToActivity(newTime);
		this.props.onCancel();
	}
	render() {
		const { classes, activity } = this.props;
		let places;
		let days;
		places = activity.places.map((place) => {
			return (
				<option value={place.id} key={place.id}>
					{place.name}
				</option>
			);
		});
		days = this.props.days.map((day) => {
			return (
				<option value={day.id} key={day.id}>
					{day.name}
				</option>
			);
		});
		return (
			<Dialog
				open={this.props.open}
				TransitionComponent={Transition}
				keepMounted
				onClose={this.handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'
				classes={{
					paper: classes.dialogPapers
				}}
			>
				<DialogTitle id='alert-dialog-slide-title'>
					{'Add time to  ' + this.props.activity.currentActivity.name}
				</DialogTitle>
				<DialogContent style={{ overflow: 'none !important' }}>
					<FormControl className={classes.FormControl}>
						<InputLabel htmlFor='age-native-helper'>place</InputLabel>
						<Select
							value={this.state.place}
							onChange={this.changePlace}
							input={<Input name='place' id='place-native-helper' />}
						>
							{places}
						</Select>
					</FormControl>
					<FormControl className={classes.FormControl}>
						<FormControlLabel
							control={
								<Checkbox
									checked={this.state.is_weekly}
									onChange={this.isWeeklyChange}
									value='checkedB'
									color='primary'
								/>
							}
							label='weekly'
						/>
					</FormControl>
					<FormControl className={classes.FormControl}>
						<TextField
							id='time'
							label='start time'
							type='time'
							defaultValue='07:30'
							className={classes.textField}
							InputLabelProps={{
								shrink: true
							}}
							inputProps={{
								step: 300 // 5 min
							}}
							onChange={this.onStartTimeChange}
						/>
					</FormControl>
					<FormControl className={classes.FormControl}>
						<TextField
							id='end_time'
							label='end time'
							type='time'
							defaultValue='07:30'
							className={classes.textField}
							InputLabelProps={{
								shrink: true
							}}
							inputProps={{
								step: 300 // 5 min
							}}
							onChange={this.onEndTimeChange}
						/>
					</FormControl>
					{this.state.is_weekly === true ? (
						<FormControl className={classes.FormControl}>
							<InputLabel htmlFor='day-native-helper'>Select day : </InputLabel>
							<Select
								value={this.state.day}
								onChange={this.changeDay}
								input={<Input name='day' id='day-native-helper' />}
							>
								{days}
							</Select>
						</FormControl>
					) : (
						<FormControl className={classes.FormControl}>
							<TextField
								id='date'
								label='Date'
								type='date'
								defaultValue='2017-05-24'
								className={classes.textField}
								InputLabelProps={{
									shrink: true
								}}
								onChange={this.onDateChange}
							/>
						</FormControl>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={this.props.onCancel} color='primary'>
						Cancel
					</Button>
					<Button onClick={this.AddTimes} color='primary'>
						Add
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

AddTime.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	group: state.group,
	activity: state.activity
});

export default connect(mapStateToProps, { addTimesToActivity })(withStyles(styles, { withTheme: true })(AddTime));
