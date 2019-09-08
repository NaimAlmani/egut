import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import config from './../../../utils/config';
import { deleteOrg } from './../../../actions/activity';
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
import CategoryFeed from './CategoryFeed';
import IconItem from './../../common/icons/IconItem';
const styles = (theme) => ({
	mainPanelRoot: {},
	panelRoot: {},
	heading: {
		padding: '10px',
		fontSize: '1rem'
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
class Categories extends React.Component {
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
							<IconItem name='archive' size={'1rem'} />
						</span>
						Kategorier
						<div className={classes.countCont}>{this.props.categories.length + ' Kategorier'}</div>
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<List className={classes.ListRoot}>
						<ListItem classes={{ root: classes.listItemRoot }} onClick={this.props.onClick}>
							<span className={classes.addIcon}>
								<IconItem name='plus' color='#fff' />{' '}
							</span>
							<div className={classes.textCont}>
								<Typography noWrap={true} component='p'>
									<span className={classes.text}>lägg till en ny kategori</span>
								</Typography>
							</div>
						</ListItem>
						<CategoryFeed categories={this.props.categories} activityID={this.props.activityID} />
					</List>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		);
	}
}

Categories.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deleteOrg })(withStyles(styles, { withTheme: true })(Categories));
