import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../../utils/config';
import { Grid } from '@material-ui/core';
import { selectPlace, deselectPlace } from './../../../actions/activity';
// Generate required css
import IconItem from '../../common/icons/IconItem';
import isContain from './../../../utils/isContain';
import { ListItem, ListItemAvatar, Typography } from '@material-ui/core';

const styles = (theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	},
	inline: {
		display: 'inline'
	},
	mediaContaier: {
		width: '40%',
		height: 'auto',
		margin: '0 auto'
	},
	image: {
		// ⚠️ object-fit is not supported by IE 11.
		objectFit: 'cover',
		width: '100%',
		height: 'auto'
	},
	deselectedAvatar: {
		background: theme.palette.primary.main
	},
	selectedAvatar: {
		background: theme.palette.pink.main,
		width: '50px',
		height: '50px'
	},
	orgImgCont: {
		width: '100px',
		height: '50px',
		overflow: 'hidden',
		borderTopLeftRadius: '10px',
		borderBottomLeftRadius: '10px'
	},
	textCont: {
		margin: '10px'
	},
	text: {
		fontSize: '1.3em',
		color: '#333',
		lineHeight: '2'
	},
	selectedText: {
		fontSize: '1.3em',
		color: '#fff',
		lineHeight: '2'
	},
	listItemRoot: {
		border: '1px solid #bdbdbd',
		padding: '5px',
		margin: '10px',
		borderRadius: '10px',
		cursor: 'pointer',
		'&:hover': {
			background: '#e3f2fd'
		}
	},
	listItemRootSelected: {
		border: '1px solid #1976d2',
		background: '#43a047',
		padding: '5px',
		margin: '10px',
		borderRadius: '10px',
		cursor: 'pointer',
		'&:hover': {
			background: '#e3f2fd'
		}
	},
	IconCont: {
		position: 'absolute',
		top: '10px',
		right: '10px'
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
		const isSelected = isContain(this.props.activity.selectedPlaces, this.props.place);

		return (
			<ListItem
				classes={{ root: isSelected === true ? classes.listItemRootSelected : classes.listItemRoot }}
				alignItems='flex-start'
				onClick={isSelected === true ? this.onDeselectPlace : this.onselectPlace}
			>
				<ListItemAvatar>
					<div className={classes.orgImgCont}>
						<img className={classes.image} src={config.imagesPath + place.image} alt='place' />
					</div>
				</ListItemAvatar>
				<div className={classes.textCont}>
					<Typography noWrap={true} component='p'>
						<span className={isSelected === true ? classes.selectedText : classes.text}>{place.name}</span>
					</Typography>
				</div>
				<div className={classes.IconCont}>
					{isSelected === true ? (
						<IconItem name='check-circle' size={25} color='#fff' />
					) : (
						<IconItem name='circle' size={25} color='#333' />
					)}
				</div>
			</ListItem>
		);
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
