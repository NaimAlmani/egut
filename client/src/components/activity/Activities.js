import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ActivityFeed from './ActivityFeed';
import ActivityForm from './ActivityForm';
import EditActivity from './EditActivity';
import { withStyles } from '@material-ui/core/styles';
import {
	Grid,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Dialog,
	DialogContent
} from '@material-ui/core';
import { customStyles } from './../../theme/customStyles';
import isEmpty from './../../validation/is-empty';
import { getAllActivities } from './../../actions/activity';
import SearchInput, { createFilter } from 'react-search-input';
import CustomSearchInput from './../common/CustomSearchInput';
import Title from '../common/Title';
import IconItem from '../common/icons/IconItem';
const KEYS_TO_FILTERS = [ 'name' ];
const styles = (theme) => ({
	root: {
		position: 'relative',
		marginTop: '50px',
		display: 'inline-block',
		width: '100%'
	},
	actionColor: {
		color: theme.palette.green.active
	},
	paperTitle: {
		position: 'absolute',
		top: '-15px',
		background: '#fff',
		padding: '0 10px'
	},
	card: {
		maxWidth: 345,
		margin: '24px auto',
		height: '350',
		overflow: 'auto'
	},
	relativeContainer: {
		position: 'relative'
	}
});
class activities extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			isAddNew: false
		};
		this.searchUpdated = this.searchUpdated.bind(this);
		this.ShowCreateForm = this.ShowCreateForm.bind(this);
		this.onHideNewAct = this.onHideNewAct.bind(this);
	}

	componentDidMount() {
		this.props.getAllActivities();
	}
	searchUpdated(term) {
		this.setState({ searchTerm: term });
	}
	ShowCreateForm() {
		this.setState({
			isAddNew: true
		});
	}
	onHideNewAct() {
		this.setState({
			isAddNew: false
		});
	}
	render() {
		const { classes, activity } = this.props;
		let actsContent;
		const { activities } = activity;
		if (activities === null) {
			actsContent = '';
		} else {
			if (isEmpty(this.state.searchTerm)) {
				actsContent = <ActivityFeed activities={activities} />;
			} else {
				const filteredActs = activities.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
				actsContent = <ActivityFeed activities={filteredActs} />;
			}
		}
		return (
			<div className={classes.relativeContainer}>
				<Title
					iconName='globe'
					text=' Activity'
					subText='You can manage the activity here'
					color={this.props.theme.palette.primary.main}
				/>
				<CustomSearchInput
					placeholder='Search by name'
					onChange={this.searchUpdated}
					color={this.props.theme.palette.primary.main}
				/>
				<Grid container spacing={10}>
					<Grid item xs={12} sm={6} md={3} onClick={this.ShowCreateForm}>
						<Card className={classes.card}>
							<CardActionArea style={{ height: '396px' }} className={classes.actionColor}>
								<CardContent>
									<Typography gutterBottom variant='h5' component='h2'>
										<IconItem name='plus' type='Feather' size={50} />
										Add new activity
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
					{actsContent}
				</Grid>
				<div />
				{this.state.isAddNew ? <ActivityForm onCancel={this.onHideNewAct} /> : null}
				{this.props.activity.isEdit ? <EditActivity /> : null}
			</div>
		);
	}
}

activities.propTypes = {
	errors: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	activity: state.activity
});

export default connect(mapStateToProps, { getAllActivities })(withStyles(styles, { withTheme: true })(activities));
