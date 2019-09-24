import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SlideFeed from './SlideFeed';
import SlideForm from './SlideForm';
import EditSlide from './EditSlide';
import { withStyles } from '@material-ui/core/styles';
import {
	Grid,
	FormControlLabel,
	FormControl,
	InputLabel,
	Select,
	Typography,
	CardActions,
	Dialog,
	DialogContent,
	Button,
	MenuItem
} from '@material-ui/core';
import { customStyles } from './../../theme/customStyles';
import isEmpty from './../../validation/is-empty';
import { getAllSlides } from './../../actions/slide';
import { getSettings, changeMainOrg } from './../../actions/settings';
import SearchInput, { createFilter } from 'react-search-input';
import CustomSearchInput from './../common/CustomSearchInput';
import { Link } from 'react-router-dom';
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
	},
	addBtn: {
		background: theme.palette.green.main,
		width: '100px',
		height: '100px',
		borderRadius: '50%',
		color: theme.palette.green.main,
		marginTop: '25%',
		'&:hover': {
			background: theme.palette.primary.main
		}
	},
	formControl: {
		width: '100%',
		marginBottom: '40px',
		borderBottom: '1px solid #333'
	}
});
class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			isAddNew: false,
			selectedOrg: ''
		};
		this.searchUpdated = this.searchUpdated.bind(this);
		this.ShowCreateForm = this.ShowCreateForm.bind(this);
		this.onHideNewSlide = this.onHideNewSlide.bind(this);
		this.selectChange = this.selectChange.bind(this);
	}
	componentDidMount() {
		this.props.getAllSlides();
		this.props.getSettings();
		if (!isEmpty(this.props.settings.mainOrg)) {
			this.setState({
				selectedOrg: this.props.settings.mainOrg.id
			});
		}
	}
	// function to search array using for loop
	searchUpdated(term) {
		this.setState({ searchTerm: term });
	}
	ShowCreateForm() {
		this.setState({
			isAddNew: true
		});
	}
	onHideNewSlide() {
		this.setState({
			isAddNew: false
		});
	}
	selectChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
		this.props.changeMainOrg(event.target.value);
	}
	render() {
		const { classes, slide, settings } = this.props;
		const { organizations } = settings;
		let slideContent;
		const { slides } = slide;
		if (slides === null) {
			slideContent = '';
		} else {
			if (isEmpty(this.state.searchTerm)) {
				slideContent = <SlideFeed slides={slides} />;
			} else {
				const filteredOrgs = slides.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
				slideContent = <SlideFeed slides={filteredOrgs} />;
			}
		}
		return (
			<div className={classes.relativeContainer}>
				<Title
					text=' Settings'
					subText='You can manage the Settings here'
					color={this.props.theme.palette.primary.main}
				/>

				<div className={classes.section}>
					<Typography variant='h5' align='center' color='#333'>
						Main Organization
					</Typography>

					<Grid container spacing={10} justify='center' alignItems='center'>
						<Grid item xs={12} sm={6} md={3} style={{ textAlign: 'center' }}>
							<FormControl className={classes.formControl}>
								<InputLabel htmlFor='age-simple'>Main Organization</InputLabel>
								<Select
									value={this.props.settings.mainOrg.id}
									onChange={this.selectChange}
									inputProps={{
										name: 'age',
										id: 'age-simple'
									}}
								>
									{organizations.map((org) => {
										return <MenuItem value={org.id}>{org.name}</MenuItem>;
									})}
								</Select>
							</FormControl>
						</Grid>
						{slideContent}
					</Grid>
					<div />
				</div>

				<div className={classes.section}>
					<Typography variant='h5' align='center' color='#333'>
						Home slider
					</Typography>
					<CustomSearchInput
						placeholder='Search by name'
						onChange={this.searchUpdated}
						color={this.props.theme.palette.primary.main}
					/>
					<Grid container spacing={10}>
						<Grid item xs={12} sm={6} md={3} style={{ textAlign: 'center' }}>
							<Button color='primary' className={classes.addBtn} onClick={this.ShowCreateForm}>
								<IconItem name='plus' type='Feather' size={50} color='#fff' />
							</Button>
						</Grid>
						{slideContent}
					</Grid>
					<div />
				</div>

				{this.state.isAddNew ? <SlideForm onCancel={this.onHideNewSlide} /> : null}
				{this.props.slide.isEdit === true ? <EditSlide /> : null}
			</div>
		);
	}
}

Settings.propTypes = {
	errors: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	slide: PropTypes.object
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	slide: state.slide,
	settings: state.settings
});

export default connect(mapStateToProps, { getAllSlides, getSettings, changeMainOrg })(
	withStyles(styles, { withTheme: true })(Settings)
);
