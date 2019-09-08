import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ActivityFeed from './activity/ActivityFeed';
// Generate required css
import {
	ExpansionPanel,
	ExpansionPanelDetails,
	ExpansionPanelSummary,
	Typography,
	List,
	ListItem
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OrgFeed from './orgs/OrgFeed';
import IconItem from './../common/icons/IconItem';
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
	}
});
class SchemaDay extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false
		};
	}
	render() {
		const { classes } = this.props;
		return (
			<ExpansionPanel classes={{ root: classes.mainPanelRoot, expanded: classes.mainPanelRoot }}>
				<ExpansionPanelSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1a-content'
					id='panel1a-header'
					classes={{ root: classes.panelRoot }}
				>
					<Typography className={classes.heading}>
						<span style={{ marginRight: '10px' }}>
							<IconItem name='calendar' size={'1rem'} />
						</span>
						{this.props.day}
						<div className={classes.countCont}>{this.props.activities.length + ' aktivitater'}</div>
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<List className={classes.ListRoot}>
						<ActivityFeed activities={this.props.activities} />
					</List>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		);
	}
}

SchemaDay.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(SchemaDay));
