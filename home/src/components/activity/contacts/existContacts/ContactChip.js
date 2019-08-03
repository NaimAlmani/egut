import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../../../utils/config';
import { Grid } from '@material-ui/core';
import { SelectContact, deselectContact } from './../../../../actions/activity';
// Generate required css
import { Chip, Avatar } from '@material-ui/core';
import isContain from './../../../../utils/isContain';
const styles = (theme) => ({
	root: {
		color: theme.palette.primary.main,
		minHeight: '250px'
	},
	card: {
		maxWidth: 345,
		margin: '24px  auto',
		height: '350',
		overflow: 'auto'
	},
	Selectedchip: {
		background: theme.palette.select.main,
		color: theme.palette.select.contrastText
	},
	mediaContaier: {
		width: '40%',
		height: 'auto',
		margin: '0 auto'
	},
	image: {
		// ⚠️ object-fit is not supported by IE 11.
		objectFit: 'cover',
		width: 'auto',
		height: '100%'
	},
	chip: {
		paddingLeft: '5px'
	},
	deleteBtn: {
		color: theme.palette.error.main,
		background: theme.palette.error.contrastText
	},
	ChipContainer: {
		display: 'inline-block',
		margin: '5px'
	},
	deselectedAvatar: {
		background: theme.palette.primary.main
	},
	selectedAvatar: {
		background: theme.palette.pink.main
	}
});
class ContactShip extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false
		};
		this.onDeselectContact = this.onDeselectContact.bind(this);
		this.onSelectContact = this.onSelectContact.bind(this);
	}
	componentDidCatch(error, info) {
		// You can also log the error to an error reporting service
	}
	onSelectContact = () => {
		this.props.SelectContact(this.props.contact);
	};
	onDeselectContact = () => {
		this.props.deselectContact(this.props.contact);
	};
	render() {
		const { classes, contact, activity } = this.props;
		let content;
		if (isContain(this.props.activity.selectedContacts, this.props.contact)) {
			content = (
				<Chip
					color='primary'
					onClick={this.onDeselectContact}
					clickable
					label={contact.name}
					avatar={
						<Avatar
							alt={contact.name}
							src={config.imagesPath + 'small/' + contact.image}
							className={classes.avatar}
						/>
					}
				/>
			);
		} else {
			content = (
				<Chip
					color='primary'
					onClick={this.onSelectContact}
					label={contact.name}
					variant='outlined'
					clickable
					avatar={
						<Avatar
							alt={contact.name}
							src={config.imagesPath + 'small/' + contact.image}
							className={classes.avatar}
						/>
					}
				/>
			);
		}
		return <div className={classes.ChipContainer}> {content}</div>;
	}
}

ContactShip.propTypes = {
	classes: PropTypes.object.isRequired,
	activity: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	activity: state.activity
});

export default connect(mapStateToProps, { deselectContact, SelectContact })(
	withStyles(styles, { withTheme: true })(ContactShip)
);
