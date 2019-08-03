import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../../utils/config';
import { deleteContact } from './../../../actions/activity';
import ConfirmDelete from '../../common/ConfirmDelete';
import IconItem from './../../common/icons/IconItem';
import Fade from 'react-reveal/Fade';
// Generate required css
import { TableRow, TableCell, Avatar } from '@material-ui/core';

const styles = (theme) => ({
	avatar: {
		margin: 10
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
	trashIcon: {
		width: '40px',
		height: '40px',
		cursor: 'pointer'
	}
});
class CotnactItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false
		};

		this.onDelete = this.onDelete.bind(this);
		this.onConfirmDelete = this.onConfirmDelete.bind(this);
		this.onCancelDelete = this.onCancelDelete.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
		this.onMouseEnter = this.onMouseEnter.bind(this);
	}

	onDelete() {
		this.setState({
			isDelete: true
		});
	}
	onConfirmDelete() {
		const contact = {
			id: this.props.contact.id
		};
		this.props.deleteContact(this.props.activityID, contact.id);
	}
	onCancelDelete() {
		this.setState({
			isDelete: false
		});
	}
	onMouseEnter() {
		this.setState({
			isHover: true
		});
	}

	onMouseLeave() {
		this.setState({
			isHover: false
		});
	}
	render() {
		const { classes, contact } = this.props;
		const themeColors = this.props.theme.palette;
		return (
			<TableRow key={contact.name} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
				<TableCell align='center'>
					<Avatar
						alt='Remy Sharp'
						src={config.imagesPath + 'small/' + contact.image}
						className={classes.avatar}
					/>
				</TableCell>
				<TableCell align='center'>{contact.name}</TableCell>
				<TableCell align='center'>{contact.email}</TableCell>
				<TableCell align='center'>{contact.tel}</TableCell>
			</TableRow>
		);
	}
}

CotnactItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(CotnactItem));
