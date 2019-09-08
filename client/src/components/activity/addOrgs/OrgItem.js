import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../../utils/config';
import { Grid, Typography } from '@material-ui/core';
import { SelectOrg, deselectOrg } from './../../../actions/activity';
// Generate required css
import { ListItem, ListItemAvatar } from '@material-ui/core';
import IconItem from '../../common/icons/IconItem';
import isContain from './../../../utils/isContain';
const styles = (theme) => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	},
	inline: {
		display: 'inline'
	},
	mediaContaier: {
		width: '40%',
		height: 'auto',
		margin: '0 auto'
	},
	image: {
		// ⚠️ object-fit is not supported by IE 11.
		objectFit: 'cover',
		width: '100%',
		height: 'auto'
	},
	deselectedAvatar: {
		background: theme.palette.primary.main
	},
	selectedAvatar: {
		background: theme.palette.pink.main,
		width: '50px',
		height: '50px'
	},
	orgImgCont: {
		width: '100px',
		height: '50px',
		overflow: 'hidden',
		borderTopLeftRadius: '10px',
		borderBottomLeftRadius: '10px'
	},
	textCont: {
		margin: '10px'
	},
	text: {
		fontSize: '1.3em',
		color: '#333',
		lineHeight: '2'
	},
	selectedText: {
		fontSize: '1.3em',
		color: '#fff',
		lineHeight: '2'
	},
	listItemRoot: {
		border: '1px solid #bdbdbd',
		padding: '5px',
		margin: '10px',
		borderRadius: '10px',
		cursor: 'pointer',
		'&:hover': {
			background: '#e3f2fd'
		}
	},
	listItemRootSelected: {
		border: '1px solid #1976d2',
		background: '#43a047',
		padding: '5px',
		margin: '10px',
		borderRadius: '10px',
		cursor: 'pointer',
		'&:hover': {
			background: '#e3f2fd'
		}
	},
	IconCont: {
		position: 'absolute',
		top: '10px',
		right: '10px'
	}
});
class OrgItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false
		};
		this.onDeselectOrg = this.onDeselectOrg.bind(this);
		this.onSelectOrg = this.onSelectOrg.bind(this);
	}
	onSelectOrg = () => {
		this.props.SelectOrg(this.props.org);
	};
	onDeselectOrg = () => {
		this.props.deselectOrg(this.props.org);
	};
	render() {
		const { classes, org, activity } = this.props;
		const isSelected = isContain(this.props.activity.selectedOrgs, this.props.org);
		return (
			<ListItem
				classes={{ root: isSelected === true ? classes.listItemRootSelected : classes.listItemRoot }}
				alignItems='flex-start'
				onClick={isSelected === true ? this.onDeselectOrg : this.onSelectOrg}
			>
				<ListItemAvatar>
					<div className={classes.orgImgCont}>
						<img className={classes.image} src={config.imagesPath + org.logoPath} alt='org' />
					</div>
				</ListItemAvatar>
				<div className={classes.textCont}>
					<Typography noWrap={true} component='p'>
						<span className={isSelected === true ? classes.selectedText : classes.text}>{org.name}</span>
					</Typography>
				</div>
				<div className={classes.IconCont}>
					{isSelected === true ? (
						<IconItem name='check-circle' size={25} color='#fff' />
					) : (
						<IconItem name='circle' size={25} color='#333' />
					)}
				</div>
			</ListItem>
		);
	}
}

OrgItem.propTypes = {
	classes: PropTypes.object.isRequired,
	activity: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	activity: state.activity
});

export default connect(mapStateToProps, { deselectOrg, SelectOrg })(withStyles(styles, { withTheme: true })(OrgItem));
