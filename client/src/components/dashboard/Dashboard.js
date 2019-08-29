import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import customStyles from './../../theme/customStyles';
import { registerUser } from '../../actions/auth';
import { Fade } from 'react-reveal';
import randomColor from './../../utils/randomColor';
import {
	Paper,
	Typography,
	TextField,
	Button,
	Grid,
	Card,
	CardActionArea,
	CardContent,
	Avatar
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import Title from '../common/Title';
import IconItem from '../common/icons/IconItem';
const styles = (theme) => ({
	root: {
		color: theme.palette.primary.main,
		minHeight: '250px',

		textAlign: 'center'
	},
	card: {
		maxWidth: 345,
		margin: '24px  auto',
		height: '350',
		overflow: 'auto'
	},
	avatar: {
		margin: '10px auto',
		width: 60,
		height: 60,
		background: theme.palette.primary.main,
		border: '1px solid #fff'
	},
	Link: {
		textDecoration: 'none !important'
	},
	whiteText: {
		color: '#fff'
	}
});

class Dashboard extends Component {
	componentDidMount() {}
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.cont}>
				<Title
					text=' Home'
					subText='Admin area to manage the website'
					color={this.props.theme.palette.primary.main}
				/>
				<Grid container spacing={10}>
					<Grid item xs={4}>
						<Fade bottom>
							<Card style={{ background: randomColor(0), margin: '10px' }}>
								<Link to='/orgs' className={classes.Link}>
									<CardActionArea className={classes.root}>
										<CardContent>
											<Avatar className={classes.avatar}>
												<IconItem name={'globe'} color='#fff' size='30px' />
											</Avatar>
											<Typography
												className={classes.whiteText}
												gutterBottom
												variant='h5'
												component='h2'
											>
												{'Organizations'}
											</Typography>
											<Typography className={classes.whiteText} component='p'>
												{'Manage organizations'}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Link>
							</Card>
						</Fade>
					</Grid>

					<Grid item xs={4}>
						<Fade bottom>
							<Card style={{ background: randomColor(1), margin: '10px' }}>
								<Link to='/places' className={classes.Link}>
									<CardActionArea className={classes.root}>
										<CardContent>
											<Avatar className={classes.avatar}>
												<IconItem name={'map'} color='#fff' size='30px' />
											</Avatar>
											<Typography
												className={classes.whiteText}
												gutterBottom
												variant='h5'
												component='h2'
											>
												{'Places'}
											</Typography>
											<Typography className={classes.whiteText} component='p'>
												{'Manage places'}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Link>
							</Card>
						</Fade>
					</Grid>

					<Grid item xs={4}>
						<Fade bottom>
							<Card style={{ background: randomColor(2), margin: '10px' }}>
								<Link to='/groups' className={classes.Link}>
									<CardActionArea className={classes.root}>
										<CardContent>
											<Avatar className={classes.avatar}>
												<IconItem name={'crosshair'} color='#fff' size='30px' />
											</Avatar>
											<Typography
												className={classes.whiteText}
												gutterBottom
												variant='h5'
												component='h2'
											>
												{'Target groups'}
											</Typography>
											<Typography className={classes.whiteText} component='p'>
												{'Manage target groups'}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Link>
							</Card>
						</Fade>
					</Grid>

					<Grid item xs={4}>
						<Fade bottom>
							<Card style={{ background: randomColor(3), margin: '10px' }}>
								<Link to='/categories' className={classes.Link}>
									<CardActionArea className={classes.root}>
										<CardContent>
											<Avatar className={classes.avatar}>
												<IconItem name={'archive'} color='#fff' size='30px' />
											</Avatar>
											<Typography
												className={classes.whiteText}
												gutterBottom
												variant='h5'
												component='h2'
											>
												{'Categories'}
											</Typography>
											<Typography className={classes.whiteText} component='p'>
												{'Manage categories'}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Link>
							</Card>
						</Fade>
					</Grid>

					<Grid item xs={4}>
						<Fade bottom>
							<Card style={{ background: randomColor(4), margin: '10px' }}>
								<Link to='/activities' className={classes.Link}>
									<CardActionArea className={classes.root}>
										<CardContent>
											<Avatar className={classes.avatar}>
												<IconItem name={'heart'} color='#fff' size='30px' />
											</Avatar>
											<Typography
												className={classes.whiteText}
												gutterBottom
												variant='h5'
												component='h2'
											>
												{'Activities'}
											</Typography>
											<Typography className={classes.whiteText} component='p'>
												{'Manage activities '}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Link>
							</Card>
						</Fade>
					</Grid>

					<Grid item xs={4}>
						<Fade bottom>
							<Card style={{ background: randomColor(0), margin: '10px' }}>
								<Link to='/register' className={classes.Link}>
									<CardActionArea className={classes.root}>
										<CardContent>
											<Avatar className={classes.avatar}>
												<IconItem name={'user-plus'} color='#fff' size='30px' />
											</Avatar>
											<Typography
												className={classes.whiteText}
												gutterBottom
												variant='h5'
												component='h2'
											>
												{'Add user'}
											</Typography>
											<Typography className={classes.whiteText} component='p'>
												{'add site admin'}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Link>
							</Card>
						</Fade>
					</Grid>

					<Grid item xs={4}>
						<Fade bottom>
							<Card style={{ background: randomColor(1), margin: '10px' }}>
								<Link to='/emails' className={classes.Link}>
									<CardActionArea className={classes.root}>
										<CardContent>
											<Avatar className={classes.avatar}>
												<IconItem
													name={'email'}
													color='#fff'
													size='30px'
													font='MaterialIcons'
												/>
											</Avatar>
											<Typography
												className={classes.whiteText}
												gutterBottom
												variant='h5'
												component='h2'
											>
												{'Emails'}
											</Typography>
											<Typography className={classes.whiteText} component='p'>
												{' View recieved emails'}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Link>
							</Card>
						</Fade>
					</Grid>
				</Grid>
			</div>
		);
	}
}

Dashboard.propTypes = {};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
	loading: state.loading
});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(Dashboard));
