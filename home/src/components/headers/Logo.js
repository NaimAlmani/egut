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
		flexGrow: 1,
		margin: '0 auto',
		width: '100%'
	},
	logoCont: {
		width: '150px',
		height: '150px',
		margin: '0 auto'
	},
	img: {
		width: '150px',
		height: '150px',
		margin: '0 auto',
		textAlign: 'center'
	}
});

class Logo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
	}
	render() {
		const { classes, theme } = this.props;

		return (
			<div className={classes.root}>
				<div className={classes.logoCont}>
					<img className={classes.img} src={'/images/rg.png'} alt='rg' />
				</div>
			</div>
		);
	}
}

Logo.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});
export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(Logo));
