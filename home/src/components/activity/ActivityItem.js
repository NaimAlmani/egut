import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Fade from 'react-reveal/Fade';
import randomColor from './../../utils/randomColor';
import config from './../../utils/config';
import { Grid } from '@material-ui/core';
import customStyles from './../../theme/customStyles';
import ConfirmDelete from './../common/ConfirmDelete';
// Generate required css
import { Card, CardActionArea, CardActions, CardContent, Switch, Button, Typography } from '@material-ui/core';
import CustomScroll from 'react-custom-scroll';
import AOS from 'aos';
import { Col } from 'reactstrap';
const styles = (theme) => ({
	root: {
		color: theme.palette.primary.main,
		height: '350px',
		overflow: 'auto'
	},
	card: {
		maxWidth: '100%',
		height: '350',
		overflow: 'auto',
		textAlign: 'center',
		position: 'relative',
		padding: ''
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
	overlay: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		top: '0',
		left: '0'
	},
	link: {
		textDecoration: 'none !important',
		'&hover': {
			textDecoration: 'none',
			color: '#fff'
		}
	},
	title: {
		color: '#fff'
	},
	description: {
		color: '#fff'
	}
});

class ActivityItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		AOS.init();
	}
	componentDidMount() {}
	componentDidCatch(error, info) {
		// You can also log the error to an error reporting service
	}
	componentWillReceiveProps(nextprops) {
		AOS.refresh();
	}
	render() {
		const { classes, activity } = this.props;
		const imgPath =
			'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) , url(' +
			config.imagesPath +
			activity.logoPath +
			')';
		return (
			<Col sm={12} md={4} lg={3} style={{ padding: '5px' }}>
				<Fade bottom>
					<Card className={classes.card} style={{ background: imgPath, width: '100%' }}>
						<div className={classes.overlay} style={{ background: randomColor(this.props.index) }} />
						<CardActionArea className={classes.root}>
							<Link to={'./../activity/' + activity.id} className={classes.link}>
								<CardContent>
									<Typography className={classes.title} gutterBottom variant='h5' component='h2'>
										{activity.name}
									</Typography>
								</CardContent>
							</Link>
						</CardActionArea>
					</Card>
				</Fade>
			</Col>
		);
	}
}

ActivityItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(ActivityItem));
