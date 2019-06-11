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
		width: '100%',
		position: 'fixed',
		zIndex: '999',
		top: '50px',
		left: '0'
	},
	ikonLista: {
		textAlign: 'center',
		padding: '20px',
		fontSize: '2em',
		background: '#f5f5f5'
	}
});

class IconsTabs extends React.Component {
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
			IconsZocial
		} = this.props.icon;
		return (
			<div className={classes.root}>
				<div className='xbtn' style={{ float: 'right' }}>
					<span onClick={this.props.onClose} />
				</div>
				<div className={classes.ikonLista} color='primary'>
					Ikoner lista
				</div>
				<AppBar position='static' color='default' style={{ boxShadow: 'none', overflow: 'auto' }}>
					<Tabs
						value={this.state.value}
						onChange={this.handleChange}
						indicatorColor='primary'
						textColor='primary'
						style={{ overflow: 'auto' }}
					>
						{!isEmpty(IconsFeather) ? <Tab label='Feather' /> : null}
						{!isEmpty(IconsfontAwsome) ? <Tab label='font awsome' /> : ''}
						{!isEmpty(IconsAntDesign) ? <Tab label='AntDesign' /> : null}
						{!isEmpty(IconsEntypoIcon) ? <Tab label='Entypo' /> : null}
						{!isEmpty(IconsEvillcons) ? <Tab label=' Evillcons' /> : null}
						{!isEmpty(IconsFoundation) ? <Tab label='Foundation' /> : null}
						{!isEmpty(IconsIonicons) ? <Tab label='Ionicons' /> : null}
						{!isEmpty(IconsMaterialCommunityIcons) ? <Tab label='MaterialCommunityIcons' /> : null}
						{!isEmpty(IconsMaterialIcons) ? <Tab label='MaterialIcons' /> : null}
						{!isEmpty(IconsOcticons) ? <Tab label='Octicons' /> : null}
						{!isEmpty(IconsSimpleLineIcons) ? <Tab label='IconsSimpleLineIcons' /> : null}
						{!isEmpty(IconsZocial) ? <Tab label='Zocial' /> : null}
					</Tabs>
				</AppBar>
				<SwipeableViews
					axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={this.state.value}
					onChangeIndex={this.handleChangeIndex}
				>
					{!isEmpty(IconsFeather) ? (
						<TabContainer dir={theme.direction}>
							<Icons icons={IconsFeather} iconParent={this.props.iconParent} />
						</TabContainer>
					) : null}

					{!isEmpty(IconsfontAwsome) ? (
						<TabContainer dir={theme.direction}>
							<Icons icons={IconsfontAwsome} iconParent={this.props.iconParent} />
						</TabContainer>
					) : null}
					{!isEmpty(IconsAntDesign) ? (
						<TabContainer dir={theme.direction}>
							<Icons icons={IconsAntDesign} iconParent={this.props.iconParent} />
						</TabContainer>
					) : null}

					{!isEmpty(IconsEntypoIcon) ? (
						<TabContainer dir={theme.direction}>
							<Icons icons={IconsEntypoIcon} iconParent={this.props.iconParent} />
						</TabContainer>
					) : null}

					{!isEmpty(IconsEvillcons) ? (
						<TabContainer dir={theme.direction}>
							<Icons icons={IconsEvillcons} iconParent={this.props.iconParent} />
						</TabContainer>
					) : null}

					{!isEmpty(IconsFoundation) ? (
						<TabContainer dir={theme.direction}>
							<Icons icons={IconsFoundation} iconParent={this.props.iconParent} />
						</TabContainer>
					) : null}

					{!isEmpty(IconsIonicons) ? (
						<TabContainer dir={theme.direction}>
							<Icons icons={IconsIonicons} iconParent={this.props.iconParent} />
						</TabContainer>
					) : null}

					{!isEmpty(IconsMaterialCommunityIcons) ? (
						<TabContainer dir={theme.direction}>
							<Icons icons={IconsMaterialCommunityIcons} iconParent={this.props.iconParent} />
						</TabContainer>
					) : null}

					{!isEmpty(IconsMaterialIcons) ? (
						<TabContainer dir={theme.direction}>
							<Icons icons={IconsMaterialIcons} iconParent={this.props.iconParent} />
						</TabContainer>
					) : null}

					{!isEmpty(IconsOcticons) ? (
						<TabContainer dir={theme.direction}>
							<Icons icons={IconsOcticons} iconParent={this.props.iconParent} />
						</TabContainer>
					) : null}

					{!isEmpty(IconsSimpleLineIcons) ? (
						<TabContainer dir={theme.direction}>
							<Icons icons={IconsSimpleLineIcons} iconParent={this.props.iconParent} />
						</TabContainer>
					) : null}

					{!isEmpty(IconsZocial) ? (
						<TabContainer dir={theme.direction}>
							<Icons icons={IconsZocial} iconParent={this.props.iconParent} />
						</TabContainer>
					) : null}
				</SwipeableViews>
			</div>
		);
	}
}

IconsTabs.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	icon: state.icon
});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(IconsTabs));
