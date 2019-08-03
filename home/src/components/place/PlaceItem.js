import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../utils/config';
import { Grid } from '@material-ui/core';
import { showEditPlace, deletePlace } from './../../actions/place';
import ConfirmDelete from './../common/ConfirmDelete';
import IconItem from './../common/icons/IconItem';
// Generate required css
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

const styles = (theme) => ({
	root: {
		color: theme.palette.primary.main,
		minHeight: '250px'
	},
	card: {
		maxWidth: 345,
		margin: '24px  auto',
		height: '350',
		overflow: 'auto',
		textAlign: 'center',
		position: 'relative'
	},
	mediaContaier: {
		width: '40%',
		height: 'auto',
		margin: '0 auto'
	},
	image: {
		// ⚠️ object-fit is not supported by IE 11.
		objectFit: 'cover',
		width: '100%'
	},
	deleteBtn: {
		color: theme.palette.error.main,
		background: theme.palette.error.contrastText
	},
	btnCont: {
		margin: '10px auto'
	}
});
class PlaceItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false
		};

		this.selectPlace = this.selectPlace.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onConfirmDelete = this.onConfirmDelete.bind(this);
		this.onCancelDelete = this.onCancelDelete.bind(this);
	}
	onDelete() {
		this.setState({
			isDelete: true
		});
	}
	onConfirmDelete() {
		const place = {
			id: this.props.place.id
		};
		this.props.deletePlace(place);
	}
	onCancelDelete() {
		this.setState({
			isDelete: false
		});
	}
	selectPlace = () => {
		this.props.showEditPlace(this.props.place, true);
	};
	render() {
		const { classes, place } = this.props;
		return (
			<Grid item xs={12} sm={6} md={3}>
				<Card className={classes.card}>
					{place.favorite === 1 ? <IconItem name='star' color='#C5B358' /> : null}
					<CardActionArea className={classes.root}>
						<div className={classes.mediaContaier}>
							<img className={classes.image} src={config.imagesPath + place.image} alt='logo' />
						</div>
						<CardContent>
							<Typography gutterBottom variant='h5' component='h2'>
								{place.name}
							</Typography>
							<Typography component='p'>{place.description}</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions className={classes.cardAction}>
						<div className={classes.btnCont}>
							<Button size='small' className={classes.deleteBtn} onClick={this.onDelete}>
								Delete
							</Button>
							<Button size='small' color='primary' onClick={this.selectPlace}>
								Edit
							</Button>
						</div>
					</CardActions>
				</Card>
				<ConfirmDelete
					open={this.state.isDelete}
					title='Are you Sure ??'
					text={'do you want to delete ' + place.name}
					onClose={this.onCancelDelete}
					onDelete={this.onConfirmDelete}
				/>
			</Grid>
		);
	}
}

PlaceItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { showEditPlace, deletePlace })(
	withStyles(styles, { withTheme: true })(PlaceItem)
);
