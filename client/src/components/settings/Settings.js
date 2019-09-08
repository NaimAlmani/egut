import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SlideFeed from './SlideFeed';
import SlideForm from './SlideForm';
import EditSlide from './EditSlide';
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
	DialogContent,
	Button
} from '@material-ui/core';
import { customStyles } from './../../theme/customStyles';
import isEmpty from './../../validation/is-empty';
import { getAllSlides } from './../../actions/slide';
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
	}
});
class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			isAddNew: false
		};
		this.searchUpdated = this.searchUpdated.bind(this);
		this.ShowCreateForm = this.ShowCreateForm.bind(this);
		this.onHideNewSlide = this.onHideNewSlide.bind(this);
	}
	componentDidMount() {
		this.props.getAllSlides();
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
	render() {
		const { classes, slide } = this.props;
		let placeContent;
		const { slides } = slide;
		if (slides === null) {
			placeContent = '';
		} else {
			if (isEmpty(this.state.searchTerm)) {
				placeContent = <SlideFeed slides={slides} />;
			} else {
				const filteredOrgs = slides.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
				placeContent = <SlideFeed slides={filteredOrgs} />;
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
					<Typography variant='h3' align='center' color='#333'>
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
						{placeContent}
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
	slide: state.slide
});

export default connect(mapStateToProps, { getAllSlides })(withStyles(styles, { withTheme: true })(Settings));
