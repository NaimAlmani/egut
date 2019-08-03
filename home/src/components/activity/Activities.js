import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ActivityFeed from './ActivityFeed';
import { withStyles } from '@material-ui/core/styles';
import {
	Grid,
	Button,
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
import ReactPaginate from 'react-paginate';
import isEmpty from './../../validation/is-empty';
import { getAllActivities } from './../../actions/activity';
import SearchInput, { createFilter } from 'react-search-input';
import CustomSearchInput from './../common/CustomSearchInput';
import Title from '../common/Title';
import IconItem from '../common/icons/IconItem';
import CustomSlideShow from './CustomSlideShow';
import MultiSelect from '../common/MultiSelect';
import getArrayOfValues from './../../utils/getArrayOfValues';
import CategoryList from './categoriesList/CategoryList';
import GroupList from './groupList/GroupList';
import { Scrollbars } from 'react-custom-scrollbars';
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
	},
	AKtivCont: {
		marginTop: '40px'
	},
	filter: {
		display: 'inline-block',
		textAlign: 'center'
	},
	searchCont: {
		width: '100%',
		textAlign: 'center'
	},
	filterIconCont: {
		display: 'inline-block'
	},
	searchTextField: {
		position: 'relative',
		display: 'inline-block',
		top: '32px'
	},
	btnRoot: {
		borderRadius: '10px'
	},
	pagination: {
		margin: '10px auto',
		padding: '10px',
		boxShadow: '0px 6px 9px 1px #00000061'
	},

	paginationSubContainer: {
		background: '#333'
	},
	pageNumber: {
		cursor: 'pointer',
		paddingTop: '10px',
		color: '#3c3c3c',
		'&:hover': {
			background: theme.palette.primary.main,
			color: '#fff',
			borderRadius: '50%'
		},
		'&:hover a': {
			color: '#fff'
		}
	},
	pageLinkClassName: {
		textDecoration: 'none',
		padding: '10px 18px',
		width: '20px',
		height: '20px',
		'&:hover': {
			underline: 'none',
			textDecoration: 'none',
			color: '#fff'
		},
		'&:focus': {
			outline: 'none'
		}
	},
	activeClassName: {
		background: theme.palette.primary.main,
		color: '#fff',
		borderRadius: '50%'
	},
	activeLinkClassName: {
		color: '#fff'
	},
	nextClassName: {
		padding: '0 10px',
		cursor: 'pointer',
		borderLeft: '1px solid #f0f0f0',
		marginLeft: '5px',
		'&:hover': {
			underline: 'none',
			textDecoration: 'none'
		}
	},
	previousClassName: {
		padding: '0 10px',
		cursor: 'pointer',
		borderRight: '1px solid #f0f0f0',
		marginRight: '5px',
		'&:hover': {
			underline: 'none',
			textDecoration: 'none'
		}
	},
	nextLinkClassName: {
		textDecoration: 'none',
		'&:focus': {
			outline: 'none',
			underline: 'none',
			textDecoration: 'none'
		}
	},
	previousLinkClassName: {
		textDecoration: 'none ',
		'&:focus': {
			underline: 'none',
			textDecoration: 'none',
			border: 'none',
			outline: 'none'
		}
	}
});
class activities extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			selectedDays: [],
			showFilters: false,
			pageCount: 2,
			data: [],
			selectedPage: 0,
			perPage: 12
		};
		this.searchUpdated = this.searchUpdated.bind(this);
		this.ShowCreateForm = this.ShowCreateForm.bind(this);
		this.onHideNewAct = this.onHideNewAct.bind(this);
	}

	componentDidMount() {
		this.props.getAllActivities();
		const actsCont = this.props.activity.fActivities.length / this.state.perPage;
		this.setState({
			data: this.props.activity.fActivities.slice(this.state.selectedPage, this.state.perPage),
			pageCount: actsCont
		});
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.activity.fActivities !== null) {
			const actsCont = nextProps.activity.fActivities.length / this.state.perPage;
			this.setState({
				data: nextProps.activity.fActivities.slice(0, this.state.perPage),
				pageCount: actsCont
			});
		}
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
	onDayChange = (e) => {
		this.setState({
			selectedDays: e.target.value
		});
	};
	onShowFilters = () => {
		this.setState({
			showFilters: true
		});
	};
	onHideFilter = () => {
		this.setState({
			showFilters: false
		});
	};

	handlePageClick = (data) => {
		console.log(data);
		console.log(this.props.activity.fActivities);
		console.log(this.props.activity.fActivities.slice(data.selected * 2, 3));
		const selected = data.selected;
		let start = selected * this.state.perPage;
		let end = start + this.state.perPage;
		const newArr = this.props.activity.fActivities.slice(start, end);
		console.log(newArr);
		this.setState({
			data: newArr
		});
	};

	render() {
		const { classes, activity } = this.props;
		let actsContent;
		const { fActivities, activities } = activity;
		const target = this.state.data;
		if (target === null) {
			actsContent = '';
		} else {
			if (isEmpty(this.state.searchTerm)) {
				actsContent = <ActivityFeed activities={target} />;
			} else {
				const filteredActs = target.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
				actsContent = <ActivityFeed activities={filteredActs} />;
			}
		}
		//get slider info
		const slidesContent = activities.slice(0, 5);
		//get select days
		const days = getArrayOfValues(activity.days, 'name');
		const allCategories = activity.categories;
		const allGroups = activity.groups;
		return (
			<div className={classes.relativeContainer} id='activities'>
				<CustomSlideShow content={slidesContent} />
				<div className={classes.AKtivCont}>
					<Title
						iconName='heart'
						text=' Aktiviteter'
						subText=''
						color={this.props.theme.palette.primary.main}
					/>
				</div>
				<div className={classes.searchCont}>
					<div className={classes.searchTextField}>
						<CustomSearchInput
							placeholder='Sök'
							onChange={this.searchUpdated}
							color={this.props.theme.palette.primary.main}
						/>
					</div>
					<div className={classes.filter}>
						<MultiSelect
							options={days}
							onChange={this.onDayChange}
							value={this.state.selectedDays}
							label={'Välj dag'}
						/>
					</div>
					<div className={classes.filterIconCont}>
						<Button
							color='primary'
							variant='outlined'
							classes={{ root: classes.btnRoot }}
							style={{ marginTop: '10px' }}
							onClick={this.state.showFilters === true ? this.onHideFilter : this.onShowFilters}
						>
							<IconItem name='filter' size={20} />
						</Button>
					</div>
				</div>
				<Grid container style={{ background: '#fff', position: 'relative' }}>
					{this.state.showFilters === true ? (
						<Grid item xs={12}>
							<GroupList groups={allGroups} />
						</Grid>
					) : null}
					{this.state.showFilters === true ? (
						<Grid item xs={2} style={{ height: '1000px', overflow: 'auto' }}>
							<CategoryList categories={allCategories} />
						</Grid>
					) : null}
					{this.state.showFilters === true ? (
						<Grid item xs={10}>
							<Grid container spacing={10}>
								{actsContent}
							</Grid>
						</Grid>
					) : (
						<Grid item xs={12}>
							<Grid container spacing={10}>
								{actsContent}
							</Grid>
						</Grid>
					)}

					<ReactPaginate
						previousLabel={<IconItem name='chevron-left' size={'30px'} />}
						nextLabel={<IconItem name='chevron-right' size={'30px'} />}
						breakLabel={'...'}
						breakClassName={'break-me'}
						pageCount={this.state.pageCount}
						marginPagesDisplayed={2}
						pageRangeDisplayed={5}
						onPageChange={this.handlePageClick}
						initialPage={this.state.selectedPage}
						containerClassName={classes.pagination + ' pagination'}
						pageClassName={classes.pageNumber}
						pageLinkClassName={classes.pageLinkClassName}
						activeClassName={classes.activeClassName}
						activeLinkClassName={classes.activeLinkClassName}
						previousClassName={classes.previousClassName}
						nextClassName={classes.nextClassName}
						nextLinkClassName={classes.nextLinkClassName}
						previousLinkClassName={classes.previousLinkClassName}
						subContainerClassName={classes.paginationSubContainer + ' pages pagination'}
					/>
				</Grid>
				<div />
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
