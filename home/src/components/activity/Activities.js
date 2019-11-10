import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ActivityFeed from './ActivityFeed';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button, FormControl, InputLabel, Select } from '@material-ui/core';
import ReactPaginate from 'react-paginate';
import isEmpty from './../../validation/is-empty';
import { getAllActivities, getDays } from './../../actions/activity';
import { createFilter } from 'react-search-input';
import CustomSearchInput from './../common/CustomSearchInput';
import Title from '../common/Title';
import IconItem from '../common/icons/IconItem';
import CustomSlideShow from './CustomSlideShow';
import MultiSelect from '../common/MultiSelect';
import getArrayOfValues from './../../utils/getArrayOfValues';
import CategoriesSlider from './categoriesList/CategoriesSlider';
import HCategoriesSlider from './categoriesList/HCategoriesSlider';
import { Scrollbars } from 'react-custom-scrollbars';

import GroupFeed from './groupList/GroupFeed';
import GroupsSlider from './groupList/GroupsSlider';
import { Container, Col, Row } from 'reactstrap';
import MediaQuery from 'react-responsive';

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
	AKtivCont: {},
	filter: {
		display: 'inline-block',
		textAlign: 'center'
	},
	searchCont: {
		width: '90%',
		textAlign: 'right',
		margin: '10px auto'
	},
	filterIconCont: {
		display: 'inline-block'
	},
	searchTextField: {
		margin: '10px',
		marginTop: '10px'
	},
	btnRoot: {
		borderRadius: '10px'
	},
	pagination: {
		margin: '10px auto',
		padding: '10px',
		width: '200px',
		minWidth: '200px'
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
	},
	groupsCont: {
		overflow: 'auto',
		width: '100vw'
	},
	groups: {
		width: 'auto'
	},
	sliderCont: {
		width: '80%',
		margin: '0 auto'
	},
	paginateCont: {
		width: 'auto',
		margin: '0 auto'
	},
	hContainer: {
		marginTop: '20px'
	},
	selectRoot: {
		margin: '10px'
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
		this.props.getDays();
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
		const currAct = this.props.activity.fActivities.filter(
			(c) => c.times.filter((d) => d.day_id.toString() === e.target.value).length > 0
		).slice(this.state.selectedPage, this.state.perPage);
		console.log('currAct');
		console.log(currAct);
		this.setState({
			selectedDays: e.target.value
		});
		const newData = e.target.value !== '0' ? currAct : this.props.activity.fActivities;
		this.setState({ data: newData });
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
		const selected = data.selected;
		let start = selected * this.state.perPage;
		let end = start + this.state.perPage;
		const newArr = this.props.activity.fActivities.slice(start, end);
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
		const days = activity.days;
		const daysOptions = days.map((day) => {
			return <option value={day.id}>{day.name}</option>;
		});
		const allCategories = activity.categories;
		const allGroups = activity.groups;

		return (
			<div className={classes.relativeContainer} id='activities'>
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
					<div className={classes.filterIconCont}>
						<Button
							color='secondary'
							variant='outlined'
							classes={{ root: classes.btnRoot }}
							style={{ margin: '10px 20px', height: '40px' }}
							onClick={this.state.showFilters === true ? this.onHideFilter : this.onShowFilters}
						>
							<IconItem name='filter' size={20} color='#333' />
						</Button>
						<FormControl className={classes.formControl}>
							<Select
								native
								value={this.state.selectedDays}
								onChange={this.onDayChange}
								inputProps={{
									name: '',
									id: 'age-native-simple'
								}}
								classes={{ root: classes.selectRoot }}
							>
								<option value={0}>Alla dagar</option>
								{daysOptions}
							</Select>
						</FormControl>
					</div>
				</div>
				<div style={{ marginTop: '30px' }}>
					{this.state.showFilters === true ? (
						<div className={classes.hContainer}>
							<GroupsSlider groups={allGroups} />
						</div>
					) : null}

					{this.state.showFilters === true ? (
						<div>
							<MediaQuery minDeviceWidth={850}>
								{(matches) =>
									matches ? (
										<Container fluid={true}>
											<Row>
												<Col xs={1}>
													<CategoriesSlider categories={allCategories} />
												</Col>
												<Col item xs={11}>
													<Container fluid={true}>
														<Row style={{ paddingTop: '30px' }}>{actsContent} </Row>
													</Container>
												</Col>
											</Row>
										</Container>
									) : (
										<div>
											<div className={classes.hContainer}>
												<HCategoriesSlider categories={allCategories} />
											</div>
											<Container fluid={true}>
												<Row>
													<Col item xs={12}>
														<Container fluid={true}>
															<Row style={{ paddingTop: '30px' }}>{actsContent}</Row>
														</Container>
													</Col>
												</Row>
											</Container>
										</div>
									)}
							</MediaQuery>
						</div>
					) : (
						<Container fluid={true} style={{ minHeight: '60vh' }}>
							<Row>
								<Col item xs={12}>
									<Container fluid={true}>
										<Row>{actsContent}</Row>
									</Container>
								</Col>
							</Row>
						</Container>
					)}

					<div className={classes.paginateCont}>
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
					</div>
				</div>
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

export default connect(mapStateToProps, { getAllActivities, getDays })(
	withStyles(styles, { withTheme: true })(activities)
);
