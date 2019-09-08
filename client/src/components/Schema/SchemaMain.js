import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import config from './../../utils/config';
import Title from './../common/Title';
import SchemaDay from './SchemaDay';
import { getWeeklyActivities, getDays } from './../../actions/activity';
import { Grid } from '@material-ui/core';
// Generate required css

const styles = (theme) => ({
	mainPanelRoot: {},
	panelRoot: {},
	heading: {
		padding: '10px',
		fontSize: '1rem'
	},
	mainIconCont: {
		margin: '0 10px 0 0'
	},
	AddIconContainer: {
		position: 'absolute',
		right: '20px',
		top: '2px'
	},
	ListRoot: {
		width: '100%'
	},
	listItemRoot: {
		border: '1px dashed #bdbdbd',
		padding: '5px',
		margin: '10px',
		borderRadius: '10px',
		cursor: 'pointer',
		width: '100%',
		'&:hover': {
			background: '#b9f6ca'
		}
	},
	textCont: {
		margin: '10px'
	},
	text: {
		fontSize: '1.2em',
		color: '#333',
		lineHeight: '2'
	},
	addIcon: {
		width: '100px',
		height: '50px',
		background: '#69f0ae',
		borderRadius: '4px',
		textAlign: 'center'
	},
	countCont: {
		fontSize: '0.8em',
		color: '#bdbdbd',
		margin: '2px 30px'
	},
	content: {
		padding: '10px'
	}
});
class SchemaMain extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false
		};
	}
	componentDidMount() {
		this.props.getWeeklyActivities();
		this.props.getDays();
	}
	render() {
		const { classes, activity } = this.props;
		const times = this.props.activity.times;
		let content = this.props.activity.days.map((day) => {
			return <SchemaDay day={day.name} activities={times.filter((c) => c.day_id === day.id)} />;
		});
		return (
			<div className={classes.cont}>
				<Title iconName='calendar' text='Schema' color={this.props.theme.palette.primary.main} />
				<div className={classes.content}>{content}</div>
			</div>
		);
	}
}

SchemaMain.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	activity: state.activity
});

export default connect(mapStateToProps, { getWeeklyActivities, getDays })(
	withStyles(styles, { withTheme: true })(SchemaMain)
);
