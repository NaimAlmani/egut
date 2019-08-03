import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../../utils/config';
import { Grid } from '@material-ui/core';
import { selectPlace, deselectPlace } from './../../../actions/activity';
// Generate required css
import { Chip, Avatar } from '@material-ui/core';
import IconItem from '../../common/icons/IconItem';
import isContain from './../../../utils/isContain';
const styles = (theme) => ({
	root: {
		color: theme.palette.primary.main,
		minHeight: '250px'
	},
	card: {
		maxWidth: 345,
		margin: '24px  auto',
		height: '350',
		overflow: 'auto'
	},
	Selectedchip: {
		background: theme.palette.select.main,
		color: theme.palette.select.contrastText
	},
	mediaContaier: {
		width: '40%',
		height: 'auto',
		margin: '0 auto'
	},
	image: {
		// ⚠️ object-fit is not supported by IE 11.
		objectFit: 'cover',
		width: 'auto',
		height: '100%'
	},
	chip: {
		paddingLeft: '5px'
	},
	deleteBtn: {
		color: theme.palette.error.main,
		background: theme.palette.error.contrastText
	},
	ChipContainer: {
		display: 'inline-block',
		margin: '5px'
	},
	deselectedAvatar: {
		background: theme.palette.primary.main
	},
	selectedAvatar: {
		background: theme.palette.pink.main
	}
});
class PlaceItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false
		};
		this.onDeselectPlace = this.onDeselectPlace.bind(this);
		this.onselectPlace = this.onselectPlace.bind(this);
	}
	componentDidCatch(error, info) {
		// You can also log the error to an error reporting service
	}
	onselectPlace = () => {
		this.props.selectPlace(this.props.place);
	};
	onDeselectPlace = () => {
		this.props.deselectPlace(this.props.place);
	};
	render() {
		const { classes, place, activity } = this.props;
		let content;
		if (isContain(this.props.activity.selectedPlaces, this.props.place)) {
			content = (
				<Chip
					color='primary'
					onClick={this.onDeselectPlace}
					clickable
					label={place.name}
					avatar={
						<Avatar className={classes.selectedAvatar}>
							<img className={classes.image} src={config.imagesPath + place.image} alt='place' />
						</Avatar>
					}
				/>
			);
		} else {
			content = (
				<Chip
					color='primary'
					onClick={this.onselectPlace}
					label={place.name}
					variant='outlined'
					clickable
					avatar={
						<Avatar className={classes.deselectedAvatar}>
							<img className={classes.image} src={config.imagesPath + place.image} alt='place' />
						</Avatar>
					}
				/>
			);
		}
		return <div className={classes.ChipContainer}> {content}</div>;
	}
}

PlaceItem.propTypes = {
	classes: PropTypes.object.isRequired,
	activity: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	activity: state.activity
});

export default connect(mapStateToProps, { deselectPlace, selectPlace })(
	withStyles(styles, { withTheme: true })(PlaceItem)
);
