import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import config from './../../../utils/config';
import { Grid } from '@material-ui/core';
import { deleteOrg } from './../../../actions/activity';
import ConfirmDelete from '../../common/ConfirmDelete';
// Generate required css
import { ListItem, ListItemAvatar, Typography } from '@material-ui/core';
import IconItem from './../../common/icons/IconItem';
const styles = (theme) => ({
	root: {
		color: theme.palette.primary.main,
		minHeight: '250px'
	},
	card: {
		maxWidth: 345,
		margin: '24px  auto',
		height: '350',
		overflow: 'auto',
		border: 'none',
		boxShadow: 'none',
		textAlign: 'center'
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
		background: theme.palette.error.contrastText,
		margin: '0 auto'
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
		borderTopLeftRadius: '4px',
		borderBottomLeftRadius: '4px'
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
		width: '100%',
		'&:hover': {
			background: '#e3f2fd'
		}
	},
	listItemRootSelected: {
		border: '1px solid #1976d2',
		background: '#2196f3',
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

		this.onDelete = this.onDelete.bind(this);
		this.onConfirmDelete = this.onConfirmDelete.bind(this);
		this.onCancelDelete = this.onCancelDelete.bind(this);
	}
	componentDidCatch(error, info) {
		// You can also log the error to an error reporting service
		console.log('error');
		console.log(error);
		console.log('info');
		console.log(info);
	}
	onDelete() {
		this.setState({
			isDelete: true
		});
	}
	onConfirmDelete() {
		const org = {
			id: this.props.org.id
		};
		this.props.deleteOrg(this.props.activityID, org);
	}
	onCancelDelete() {
		this.setState({
			isDelete: false
		});
	}
	render() {
		const { classes, org } = this.props;
		return (
			<ListItem classes={{ root: classes.listItemRoot }} alignItems='flex-start'>
				<ListItemAvatar>
					<div className={classes.orgImgCont}>
						<img className={classes.image} src={config.imagesPath + org.logoPath} alt='org' />
					</div>
				</ListItemAvatar>
				<div className={classes.textCont}>
					<Typography noWrap={true} component='p'>
						<span className={classes.text}>{org.name}</span>
					</Typography>
				</div>
				<div className={classes.IconCont} onClick={this.onDelete}>
					<IconItem name='x' size={25} color='#ff5722' />
				</div>
				<ConfirmDelete
					open={this.state.isDelete}
					title='Are you Sure ??'
					text={'do you want to delete ' + org.name}
					onClose={this.onCancelDelete}
					onDelete={this.onConfirmDelete}
				/>
			</ListItem>
		);
	}
}

OrgItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deleteOrg })(withStyles(styles, { withTheme: true })(OrgItem));
