import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { deleteSubscription } from './../../actions/subscription';
import ConfirmDelete from './../common/ConfirmDelete';
// Generate required css
import { ListItem, ListItemText } from '@material-ui/core';
import IconItem from './../common/icons/IconItem';
const styles = (theme) => ({
	root: {
		color: theme.palette.primary.main,
		minHeight: '250px'
	},
	card: {
		maxWidth: 345,
		margin: '24px  auto',
		height: '300px',
		overflow: 'auto',
		textAlign: 'center'
	},
	mediaContaier: {
		width: '40%',
		height: 'auto',
		margin: '0 auto',
		maxHeight: '150px',
		overflow: 'hidden'
	},
	image: {
		// ⚠️ object-fit is not supported by IE 11.
		objectFit: 'cover',
		width: '100%'
	},
	deleteBtn: {
		color: theme.palette.error.main,
		background: theme.palette.error.contrastText
	},
	btnCont: {},
	linkClass: {
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'none'
		}
	}
});
class SubscriptionItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false
		};
	}
	onDelete = () => {
		this.setState({
			isDelete: true
		});
	};
	onConfirmDelete = () => {
		const sub = {
			id: this.props.sub.id
		};
		this.props.deleteSubscription(sub);
		this.setState({ isDelete: false });
	};
	onCancelDelete = () => {
		this.setState({
			isDelete: false
		});
	};
	render() {
		const { classes, sub } = this.props;
		return (
			<li button key={sub.id}>
				<span>{sub.email} </span>
				<span onClick={this.onDelete}>
					<IconItem name='trash-2' color='#f33' />
				</span>
				<ConfirmDelete
					open={this.state.isDelete === true}
					title='Are you Sure ??'
					text={'do you want to delete ' + sub.email.name}
					onClose={this.onCancelDelete}
					onDelete={this.onConfirmDelete}
				/>
			</li>
		);
	}
}

SubscriptionItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deleteSubscription })(
	withStyles(styles, { withTheme: true })(SubscriptionItem)
);
