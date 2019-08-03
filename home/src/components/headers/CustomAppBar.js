import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { Divider, Button, AppBar, Toolbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { setCurrentUser, logoutUser } from './../../actions/auth';
import IconItem from '../common/icons/IconItem';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import config from '../../utils/config';

const styles = (theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: '2px'
	},
	imgCont: {
		width: '50px',
		height: '50px',
		overflow: 'hidden'
	},
	img: {
		width: '100%',
		height: 'auto'
	},
	title: {
		flexGrow: 1
	},
	Link: {
		textDecoration: 'none !important',
		color: '#fff'
	}
});

class CustomAppBar extends React.Component {
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
			<div className={classes.root}>
				<AppBar position='static'>
					<Toolbar>
						<IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='Menu'>
							<div className={classes.imgCont}>
								<img className={classes.img} src={'/images/rg.png'} alt='RG' />
							</div>
						</IconButton>
						<Typography variant='P' className={classes.title}>
							RESTAD GÅRD UTBILDNING AB
						</Typography>
						<Link to='/orgs' className={classes.Link}>
							<Button color='inherit'>Home</Button>
						</Link>
						<Link to='/orgs' className={classes.Link}>
							<Button color='inherit'>Our activities</Button>
						</Link>

						<Link to='/orgs' className={classes.Link}>
							<Button color='inherit'>About us</Button>
						</Link>

						<Link to='/orgs' className={classes.Link}>
							<Button color='inherit'>About us</Button>
						</Link>

						<div id='translate' />
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

CustomAppBar.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});
export default connect(mapStateToProps, { logoutUser, setCurrentUser })(
	withStyles(styles, { withTheme: true })(CustomAppBar)
);
