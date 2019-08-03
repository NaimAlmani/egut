import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlaceFeed from './PlaceFeed';
import PlaceForm from './PlaceForm';
import EditPlace from './EditPlace';
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
import { getAllPlaces } from './../../actions/place';
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
class Places extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			isAddNew: false
		};
		this.searchUpdated = this.searchUpdated.bind(this);
		this.ShowCreateForm = this.ShowCreateForm.bind(this);
		this.onHideNewPlace = this.onHideNewPlace.bind(this);
	}
	componentDidMount() {
		this.props.getAllPlaces();
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
	onHideNewPlace() {
		this.setState({
			isAddNew: false
		});
	}
	render() {
		const { classes, place } = this.props;
		let placeContent;
		const { places } = place;
		if (places === null) {
			placeContent = '';
		} else {
			if (isEmpty(this.state.searchTerm)) {
				placeContent = <PlaceFeed places={places} />;
			} else {
				const filteredOrgs = places.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
				placeContent = <PlaceFeed places={filteredOrgs} />;
			}
		}
		return (
			<div className={classes.relativeContainer}>
				<Title
					text=' Places'
					subText='You can manage the Places here'
					color={this.props.theme.palette.primary.main}
				/>
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
				{this.state.isAddNew ? <PlaceForm onCancel={this.onHideNewPlace} /> : null}
				{this.props.place.isEdit === true ? <EditPlace /> : null}
			</div>
		);
	}
}

Places.propTypes = {
	errors: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	place: PropTypes.object
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	place: state.place
});

export default connect(mapStateToProps, { getAllPlaces })(withStyles(styles, { withTheme: true })(Places));
