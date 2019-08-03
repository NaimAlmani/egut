import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../../utils/config';
import { Grid } from '@material-ui/core';
import ConfirmDelete from '../../common/ConfirmDelete';
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
import Fade from 'react-reveal/Fade';
const styles = (theme) => ({
	root: {
		color: theme.palette.primary.main,
		minHeight: '250px'
	},
	card: {
		maxWidth: 345,
		margin: '0  auto',
		border: 'none',
		boxShadow: 'none',
		textAlign: 'center',
		background: 'transparent'
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
		background: theme.palette.secondary.main
	}
});
class CategoryItem extends React.Component {
	componentDidCatch(error, info) {}

	render() {
		const { classes, category } = this.props;
		return (
			<Grid item xs={12} sm={3} md={2}>
				<Fade>
					<div className={classes.card}>
						<div className={classes.mediaContaier}>
							<Avatar className={classes.avatar}>
								<IconItem
									name={category.icon_name}
									font={category.icon_font}
									color='#fff'
									size='30px'
								/>
							</Avatar>
						</div>
						<Typography gutterBottom variant='h5' component='h2' style={{ color: '#333' }} color='#fff'>
							{category.name}
						</Typography>
					</div>
				</Fade>
			</Grid>
		);
	}
}

CategoryItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(CategoryItem));
