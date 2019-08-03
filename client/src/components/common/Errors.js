import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import IconItem from './../common/icons/IconItem';
import customStyles from './../../theme/customStyles';
import isEmpty from './../../validation/is-empty';
import { clearErrors } from './../../actions/errors';
// Generate required css
import {
	Button,
	Slide,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Link,
	Typography
} from '@material-ui/core';
import ErrorsFeed from './errors/ErrorsFeed';
const styles = (theme) => customStyles(theme);

function Transition(props) {
	return <Slide direction='up' {...props} />;
}

class Errors extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.clearErrors = this.clearErrors.bind(this);
	}
	clearErrors() {
		this.props.clearErrors();
	}
	render() {
		const { classes, errors } = this.props;
		let ErrorsContent;

		let allErrors = [];

		if (!isEmpty(errors)) {
			if (typeof errors.error === 'string') {
				allErrors.push(errors.error);
			}
			if (!isEmpty(errors.error)) {
				if (Array.isArray(errors.error)) {
					allErrors = errors.error.map((err) => {
						return Object.values(err);
					});
				}
				if (typeof errors.error === 'object') {
					allErrors = Object.values(errors.error);
				}
			}
			ErrorsContent = <ErrorsFeed errors={allErrors} />;
		} else {
			ErrorsContent = '';
		}
		return (
			<Dialog
				open={!isEmpty(this.props.errors)}
				TransitionComponent={Transition}
				onClose={this.handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'
			>
				<DialogTitle className={classes.ErrDialogTitle} id='alert-dialog-slide-title'>
					<p style={{ color: 'rgba(255, 121, 121, 1)', fontSize: '1.2em' }}>
						{' '}
						<IconItem name='error-outline' type='MaterialIcons' color='#fff' /> Error
					</p>
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						<ul style={{ listStyle: 'none' }}>
							{ErrorsContent}

							<li>{this.props.errors.message === '' ? this.props.errors.exception : null}</li>
							<li>{this.props.errors.message}</li>
						</ul>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.clearErrors} color='primary'>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

Errors.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { clearErrors })(withStyles(styles, { withTheme: true })(Errors));
