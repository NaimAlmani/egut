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
const drawerWidth = 240;

const styles = (theme) => ({
	root: {
		display: 'flex'
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
	}
});

class AdminFrame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
		this.onLogout = this.onLogout.bind(this);
		this.goto = this.goto.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated === true) {
			this.props.setCurrentUser();
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

	render() {
		const { classes, theme } = this.props;
		const { open } = this.state;
		const { isAuthenticated, admin } = this.props.auth;
		return (
			<ScrollArea speed={0.8} className='area' contentClassName='content' horizontal={true}>
				<div className={classes.root}>
					<CssBaseline />
					<AppBar
						position='fixed'
						className={classNames(classes.appBar, {
							[classes.appBarShift]: open
						})}
					>
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
						</Toolbar>
						<div className={classes.grow} />
					</AppBar>
					<Drawer
						className={classes.drawer}
						variant='persistent'
						anchor='left'
						open={open}
						classes={{
							paper: classes.drawerPaper
						}}
					>
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

								<ListItem button key={'logout'} onClick={this.onLogout}>
									<ListItemIcon>
										<IconItem name='unlock' font='Feather' />
									</ListItemIcon>
									<ListItemText primary='Logout' />
								</ListItem>

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

								<Link to='/activities' className={classes.Link}>
									<ListItem button key={'activities'}>
										<ListItemIcon>
											<IconItem name='heart' />
										</ListItemIcon>
										<ListItemText primary={'Activities'} />
									</ListItem>
								</Link>

								<ListItem button key={'trans'}>
									<ListItemIcon>
										<IconItem name='globe' />
									</ListItemIcon>
									<div id='translate' />
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
					<main
						className={classNames(classes.content, {
							[classes.contentShift]: open
						})}
					>
						<div className={classes.drawerHeader} />
						<div className={classes.mainContainer}>{this.props.children}</div>
					</main>
					<Errors errors={this.props.errors} />
				</div>
			</ScrollArea>
		);
	}
}

AdminFrame.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});
export default connect(mapStateToProps, { logoutUser, setCurrentUser })(
	withStyles(styles, { withTheme: true })(AdminFrame)
);
