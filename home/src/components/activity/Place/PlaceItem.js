import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../../utils/config';
import { Grid } from '@material-ui/core';
import IconItem from './../../common/icons/IconItem';
// Generate required css
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	Avatar
} from '@material-ui/core';

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
		border: 'none',
		boxShadow: 'none',
		textAlign: 'center'
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
		background: theme.palette.error.contrastText,
		margin: '0 auto'
	},
	avatar: {
		margin: '10px auto',
		width: 60,
		height: 60,
		background: theme.palette.primary.main
	}
});
class PlaceItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false
		};
	}
	componentDidCatch(error, info) {}

	render() {
		const { classes, place } = this.props;
		return (
			<Grid item xs={12} sm={6} md={3}>
				<Card className={classes.card}>
					<CardActionArea className={classes.root}>
						<div className={classes.mediaContaier}>
							<img className={classes.image} src={config.imagesPath + place.image} alt={place.name} />
						</div>
						<CardContent>
							<Typography gutterBottom variant='h5' component='h2'>
								{place.name}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			</Grid>
		);
	}
}

PlaceItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(PlaceItem));
