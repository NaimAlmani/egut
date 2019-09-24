import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Grid, Avatar } from '@material-ui/core'; // Generate required css
import { Card, CardActionArea, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import IconItem from '../common/icons/IconItem';
import { Col } from 'reactstrap';
import Flash from 'react-reveal/Flash';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
	root: {
		color: theme.palette.primary.main,

		textAlign: 'center'
	},
	whiteRoot: {
		color: '#fff'
	},
	card: {
		overflow: 'auto',
		cursor: 'pointer'
	},
	avatar: {
		margin: '10px auto',
		padding: '10px',
		width: 70,
		height: 70,
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
		background: theme.palette.error.contrastText
	},

	whiteColor: {
		color: '#fff'
	},
	blackColor: {
		color: '#333'
	},
	linkClass: {
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'none'
		}
	}
});
class GroupItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false
		};
	}
	componentDidCatch(error, info) {
		// You can also log the error to an error reporting service
	}
	render() {
		const { classes, group, isWhite } = this.props;
		return (
			<Col item sm={6} md={3} lg={3}>
				<Flash>
					<Link to={'group/' + group.id} className={classes.linkClass}>
						<div className={classes.card}>
							<div className={isWhite === true ? classes.whiteRoot : classes.root}>
								<div>
									<Avatar className={classes.avatar}>
										{isWhite === true ? (
											<IconItem
												name={group.icon_name}
												font={group.icon_font}
												color='#fff'
												size='3em'
											/>
										) : (
											<IconItem
												name={group.icon_name}
												font={group.icon_font}
												color={this.props.theme.palette.primary.main}
												size='3em'
											/>
										)}
									</Avatar>
									<Typography
										gutterBottom
										variant='h5'
										component='h2'
										className={isWhite === true ? classes.whiteColor : classes.blackColor}
									>
										{group.name}
									</Typography>
								</div>
							</div>
						</div>
					</Link>
				</Flash>
			</Col>
		);
	}
}

GroupItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(GroupItem));
