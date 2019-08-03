import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Icons from './Icons';
import isEmpty from './../../validation/is-empty';
function TabContainer({ children, dir }) {
	return (
		<Typography component='div' dir={dir} style={{ padding: 8 * 3 }}>
			{children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
	dir: PropTypes.string.isRequired
};

const styles = (theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: '70%',
		position: 'fixed',
		zIndex: '999',
		top: '100px',
		left: '15%',
		height: '70vh',
		overflow: 'auto',
		borderRadius: '0.3em',
		padding: '10px'
	},
	ikonLista: {
		textAlign: 'center',
		padding: '20px',
		fontSize: '2em',
		background: '#f5f5f5'
	},
	iconsContainer: {
		padding: '10px'
	}
});

class IconsList extends React.Component {
	state = {
		value: 0
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	handleChangeIndex = (index) => {
		this.setState({ value: index });
	};

	render() {
		const { classes, theme } = this.props;
		const {
			IconsFeather,
			IconsfontAwsome,
			IconsAntDesign,
			IconsEntypoIcon,
			IconsEvillcons,
			IconsFoundation,
			IconsIonicons,
			IconsMaterialCommunityIcons,
			IconsMaterialIcons,
			IconsOcticons,
			IconsSimpleLineIcons,
			IconsZocial,
			allIcons
		} = this.props.icon;
		return (
			<div className={classes.root}>
				<div className='xbtn' style={{ float: 'right' }}>
					<span onClick={this.props.onClose} />
				</div>
				<div className={classes.ikonLista} color='primary'>
					Ikoner lista
				</div>
				<div className={classes.iconsContainer}>
					<Icons icons={allIcons} iconParent={this.props.iconParent} />
				</div>
			</div>
		);
	}
}

IconsList.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	icon: state.icon
});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(IconsList));
