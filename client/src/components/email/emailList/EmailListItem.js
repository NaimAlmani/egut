import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { ListItem, Typography } from '@material-ui/core';
import IconItem from './../../common/icons/IconItem';
import isEmpty from './../../../validation/is-empty';
import { SelectEmail } from './../../../actions/email';
const styles = (theme) => ({
	subMenuItem: {
		width: '100%',
		overflow: '',
		padding: '10px'
	},
	date: {
		position: 'absolute',
		right: '0',
		top: '0',
		fontSize: '0.6em',
		color: '#9E9E9E'
	},
	selectedListItem: {
		background: '#2196F3',
		color: '#fff'
	}
});
class EmailListItem extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		if (!isEmpty(this.props.email)) {
			this.setState({
				read: this.props.email.read === 1 ? true : false
			});
		}
	}
	onClick = () => {
		this.props.SelectEmail(this.props.email.id, this.state.read);
		this.setState({
			read: true
		});
	};
	render() {
		const { email, classes, emailReducer } = this.props;
		const { selectedEmail } = emailReducer;
		const isSelected = selectedEmail.id === email.id;
		return (
			<ListItem
				className={isSelected === true ? classes.selectedListItem : classes.normalListItem}
				button
				onClick={this.onClick}
			>
				<div className={classes.subMenuItem}>
					<span style={{ margin: '10px' }}>
						{this.state.read === true ? (
							<IconItem name='drafts' font='MaterialIcons' color='#9E9E9E' size={15} />
						) : (
							<IconItem name='email' font='MaterialIcons' color='#8BC34A' size={15} />
						)}
					</span>
					<span className={classes.date}>{email.created_at}</span>
					<Typography
						component='h3'
						noWrap
						style={{
							fontWeight: 'bold',
							display: 'inline-block'
						}}
					>
						{email.subject}
					</Typography>
					<Typography
						noWrap
						component='h4'
						style={{ paddingLeft: '40px', color: '#9E9E9E', fontSize: '1em' }}
					>
						{'    ' + email.email}
					</Typography>
					<Typography noWrap style={{ paddingLeft: '40px', color: '#9E9E9E', fontSize: '0.7em' }}>
						{'    ' + email.message}
					</Typography>
				</div>
			</ListItem>
		);
	}
}
const mapStateToProps = (state) => ({
	emailReducer: state.email
});

export default connect(mapStateToProps, { SelectEmail })(withStyles(styles, { withTheme: true })(EmailListItem));
