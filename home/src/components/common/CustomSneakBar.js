import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Icon from 'react-web-vector-icons';
import Fade from 'react-reveal/Fade';
import { green } from '@material-ui/core/colors';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { clearSuccess } from './../../actions/success';
import IconItem from './icons/IconItem';
const styles = (theme) => ({
	content: {
		background: green[600],
		color: '#fff'
	},
	successIcon: {
		margin: '10px',
		paddingTop: '10px'
	},
	message: {
		fontSize: '20px'
	}
});

class CustomSneakBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditHover: false,
			isDeleteHover: false
		};
	}
	handleClose = () => {
		this.props.clearSuccess();
	};

	render() {
		const { classes, success } = this.props;
		return (
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				open={success === true}
				autoHideDuration={6000}
				onClose={this.handleClose}
			>
				<SnackbarContent
					className={classes.content}
					aria-describedby='client-snackbar'
					message={
						<span id='client-snackbar' className={classes.message}>
							<span className={classes.successIcon}>
								<IconItem name='check-circle' size={25} />
							</span>
							Tack for registera dig !
						</span>
					}
					action={[
						<IconButton key='close' aria-label='close' color='inherit' onClick={this.onClose}>
							<span>
								<IconItem name='x' size={25} />
							</span>
						</IconButton>
					]}
				/>
			</Snackbar>
		);
	}
}
CustomSneakBar.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	success: state.success
});

export default connect(mapStateToProps, { clearSuccess })(withStyles(styles, { withTheme: true })(CustomSneakBar));
