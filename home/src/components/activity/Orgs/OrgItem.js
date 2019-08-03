import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../../utils/config';
import { Grid } from '@material-ui/core';
import { Fade } from 'react-reveal';
// Generate required css
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
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
	}
});
class OrgItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false
		};
	}

	render() {
		const { classes, org } = this.props;
		return (
			<Grid item xs={12} sm={3} md={2}>
				<Fade>
					<Card className={classes.card}>
						<CardActionArea className={classes.root}>
							<Link to={'./../organization/' + org.id}>
								<div className={classes.mediaContaier}>
									<img
										className={classes.image}
										src={config.imagesPath + org.logoPath}
										alt={org.name}
									/>
								</div>
								<CardContent>
									<Typography gutterBottom variant='h5' component='h2'>
										{org.name}
									</Typography>
									<Typography component='p'>{org.description}</Typography>
								</CardContent>
							</Link>
						</CardActionArea>
					</Card>
				</Fade>
			</Grid>
		);
	}
}

OrgItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(OrgItem));
