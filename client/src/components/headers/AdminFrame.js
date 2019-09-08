import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ScrollArea from 'react-scrollbar';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Icon from '@material-ui/core/Icon';
import Errors from './../common/Errors';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { setCurrentUser, logoutUser } from './../../actions/auth';
import IconItem from '../common/icons/IconItem';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Pusher from 'pusher-js';
import config from './../../utils/config';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { getAllEmails, addPushedEmail, clearNewEmail } from './../../actions/email';
import { addPushedNotification } from './../../actions/notification';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import isEmpty from './../../validation/is-empty';
import { LinearProgress } from '@material-ui/core';
const drawerWidth = 240;

const styles = (theme) => ({
	root: {
		display: 'flex'
	},
	grow: {
		flexGrow: 1
	},
	appBar: {
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	mainContainer: {
		padding: '5px',
		width: '100vw',
		marginTop: '60px'
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20
	},
	hide: {
		display: 'none'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: '0 8px',
		...theme.mixins.toolbar,
		justifyContent: 'flex-end'
	},
	content: {
		flexGrow: 1,
		padding: '0',
		marginTop: '50px',
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: -drawerWidth
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: 0
	},

	ListLink: {
		display: 'inline-block'
	},
	Link: {
		textDecoration: 'none !important'
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex'
		}
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none'
		}
	},
	subMenu: {
		maxWidth: '600px',
		width: '50%',
		minWidth: '200px'
	},
	subMenuItemRoot: {
		height: 'auto'
	},
	loadingCont: {
		position: 'fixed',
		width: '100%',
		height: '5px',
		top: '0',
		left: '0',
		zIndex: '9999'
	}
});

class AdminFrame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			emailsAnchor: ''
		};
		this.onLogout = this.onLogout.bind(this);
		this.goto = this.goto.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated === true) {
			this.props.setCurrentUser();

			// start pusher to get emails
			var pusherEmail = new Pusher(config.pusher.key, {
				cluster: 'eu',
				forceTLS: true,
				authEndpoint: config.endPoint + '/api/login',
				auth: {
					headers: {
						Authorization: `Bearer ${localStorage.jwtToken}`,
						Accept: 'application/json'
					}
				}
			});

			var channel = pusherEmail.subscribe('new-email-channel');
			channel.bind('new-email-event', (data) => {
				this.props.addPushedEmail(data.email);
			});
			//end pusher

			// start pusher to get emails
			var pusherSubscrip = new Pusher(config.pusher.key, {
				cluster: 'eu',
				forceTLS: true,
				authEndpoint: config.endPoint + '/api/login',
				auth: {
					headers: {
						Authorization: `Bearer ${localStorage.jwtToken}`,
						Accept: 'application/json'
					}
				}
			});

			var channelNotification = pusherSubscrip.subscribe('new-notification-channel');
			channelNotification.bind('new-notification-event', (data) => {
				this.props.addPushedNotification(data.note);
			});
			//end pusher

			this.props.getAllEmails();
		}
	}
	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};
	onLogout = () => {
		this.props.logoutUser();
	};
	goto(link) {
		return <Redirect to={link} />;
	}

	//start email
	openEmailMenu = (e) => {
		this.setState({
			emailsAnchor: e.currentTarget
		});
	};
	closeEmailMenu = () => {
		this.setState({
			emailsAnchor: ''
		});
	};

	onCloseEmailNotification = () => {
		this.props.clearNewEmail();
	};
	render() {
		const { classes, theme, email } = this.props;
		const { open, emailsAnchor } = this.state;
		const { isAuthenticated, admin } = this.props.auth;
		const { emails, newEmail } = email;
		const unreadEmails = emails.filter((c) => c.read === 0);
		const latestEmails = emails.slice(0, 5);
		const emailMenu = (
			<Menu
				id='email-menu'
				anchorEl={emailsAnchor}
				keepMounted
				open={Boolean(emailsAnchor)}
				onClose={this.closeEmailMenu}
				classes={{ paper: classes.subMenu }}
			>
				{latestEmails.map((email) => {
					return (
						<MenuItem classes={{ root: classes.subMenuItemRoot }}>
							<div className={classes.subMenuItem}>
								<span style={{ margin: '10px' }}>
									{email.read === 1 ? (
										<IconItem name='drafts' font='MaterialIcons' color='#9E9E9E' size={15} />
									) : (
										<IconItem name='email' font='MaterialIcons' color='#8BC34A' size={15} />
									)}
								</span>
								<Typography
									component='h3'
									style={{
										fontWeight: 'bold',
										display: 'inline-block'
									}}
								>
									{email.email}
								</Typography>
								<Typography noWrap style={{ paddingLeft: '40px' }}>
									{'    ' + email.message}
								</Typography>
							</div>
						</MenuItem>
					);
				})}

				<MenuItem>More</MenuItem>
			</Menu>
		);

		return (
			<div>
				{this.props.loading === true ? (
					<div className={classes.loadingCont}>
						<LinearProgress color='primary' />
					</div>
				) : null}
				<div className={classes.root}>
					<CssBaseline />
					<AppBar position='fixed' className={classNames(classes.appBar)}>
						<Toolbar disableGutters={!open}>
							<IconButton
								color='inherit'
								aria-label='Open drawer'
								onClick={this.handleDrawerOpen}
								className={classNames(classes.menuButton, open && classes.hide)}
							>
								<MenuIcon />
							</IconButton>
							<Typography variant='h6' color='inherit' noWrap>
								RG utbildning
							</Typography>
							<div className={classes.grow} />
							{isAuthenticated && (
								<div>
									<div className={classes.sectionDesktop}>
										<IconButton
											aria-controls='email-menu'
											aria-label='show 4 new mails'
											color='inherit'
											onClick={this.openEmailMenu}
										>
											<Badge badgeContent={unreadEmails.length} color='secondary'>
												<MailIcon />
											</Badge>
										</IconButton>
										<IconButton aria-label='show 17 new notifications' color='inherit'>
											<Badge badgeContent={17} color='secondary'>
												<NotificationsIcon />
											</Badge>
										</IconButton>
										<IconButton
											edge='end'
											aria-label='account of current user'
											aria-haspopup='true'
											color='inherit'
										>
											<AccountCircle />
										</IconButton>
									</div>
									<div className={classes.sectionMobile}>
										<IconButton aria-label='show more' aria-haspopup='true' color='inherit'>
											<MoreIcon />
										</IconButton>
									</div>
								</div>
							)}
						</Toolbar>
					</AppBar>
					{/* * start email notification */}
					{emailMenu}

					<Snackbar
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right'
						}}
						open={!isEmpty(newEmail)}
						autoHideDuration={6000}
						onClose={this.onCloseEmailNotification}
					>
						<SnackbarContent
							onClose={this.onCloseEmailNotification}
							variant='success'
							message={newEmail.email + ' : ' + newEmail.message}
						/>
					</Snackbar>
					{/* * end email notification */}
					<Drawer anchor='left' open={open} onClose={this.handleDrawerClose}>
						<div className={classes.drawerHeader}>
							<IconButton onClick={this.handleDrawerClose}>
								{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
							</IconButton>
						</div>
						<Divider />
						{isAuthenticated ? (
							<List>
								<ListItem button key={'user'}>
									<ListItemIcon>
										<IconItem name='user' font='Feather' />
									</ListItemIcon>
									<ListItemText primary={admin.name} />
								</ListItem>
								<Link to='/' className={classes.Link}>
									<ListItem button key={'dashboard'}>
										<ListItemIcon>
											<IconItem name='home' />
										</ListItemIcon>
										<ListItemText primary={'Home'} />
									</ListItem>
								</Link>
								<Link to='/orgs' className={classes.Link}>
									<ListItem button key={'orgs'}>
										<ListItemIcon>
											<IconItem name='globe' />
										</ListItemIcon>
										<ListItemText primary={'Organizations'} />
									</ListItem>
								</Link>

								<Link to='/places' className={classes.Link}>
									<ListItem button key={'places'}>
										<ListItemIcon>
											<IconItem name='map' />
										</ListItemIcon>
										<ListItemText primary={'Places'} />
									</ListItem>
								</Link>

								<Link to='/groups' className={classes.Link}>
									<ListItem button key={'groups'}>
										<ListItemIcon>
											<IconItem name='crosshair' />
										</ListItemIcon>
										<ListItemText primary={'Groups'} />
									</ListItem>
								</Link>

								<Link to='/categories' className={classes.Link}>
									<ListItem button key={'groups'}>
										<ListItemIcon>
											<IconItem name='ios-pricetags' font='Ionicons' />
										</ListItemIcon>
										<ListItemText primary={'Categories'} />
									</ListItem>
								</Link>

								<Link to='/activities' className={classes.Link}>
									<ListItem button key={'activities'}>
										<ListItemIcon>
											<IconItem name='heart' />
										</ListItemIcon>
										<ListItemText primary={'Activities'} />
									</ListItem>
								</Link>

								<Link to='/schema' className={classes.Link}>
									<ListItem button key={'Schema'}>
										<ListItemIcon>
											<IconItem name='calendar' />
										</ListItemIcon>
										<ListItemText primary={'Schema'} />
									</ListItem>
								</Link>

								<ListItem button key={'logout'} onClick={this.onLogout}>
									<ListItemIcon>
										<IconItem name='unlock' font='Feather' />
									</ListItemIcon>
									<ListItemText primary='Logout' />
								</ListItem>
							</List>
						) : (
							<List>
								<Link to='/login' style={{ textDecoration: 'none' }}>
									<ListItem button key={'login'}>
										<ListItemIcon>
											<IconItem name='lock' font='Feather' />
										</ListItemIcon>
										<ListItemText primary={'login'} />
									</ListItem>
								</Link>
							</List>
						)}

						<Divider />
					</Drawer>
					<main>
						<div className={classes.mainContainer}>{this.props.children}</div>
					</main>
					<Errors errors={this.props.errors} />
				</div>
			</div>
		);
	}
}

AdminFrame.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
	email: state.email,
	notification: state.notification,
	loading: state.loading
});
export default connect(mapStateToProps, {
	logoutUser,
	setCurrentUser,
	getAllEmails,
	addPushedEmail,
	clearNewEmail,
	addPushedNotification
})(withStyles(styles, { withTheme: true })(AdminFrame));
