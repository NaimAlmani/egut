import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import IconItem from './../common/icons/IconItem';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const styles = (theme) => ({
	IconContainer: {
		textAlign: 'center',
		marginTop: '20px'
	},
	TitleContainer: {
		textAlign: 'center'
	}
});
class ConfirmDelete extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<Dialog
				open={this.props.open}
				onClose={this.props.onClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					<div className={classes.IconContainer}>
						<IconItem
							name='close'
							font='MaterialIcons'
							size={'4em'}
							color={this.props.theme.palette.error.main}
						/>
					</div>
					<div className={classes.TitleContainer}>{this.props.title}</div>
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						<strong>{this.props.text}</strong>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.props.onClose} color='secondary'>
						Cancel
					</Button>
					<Button onClick={this.props.onDelete} color='primary' autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

ConfirmDelete.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(ConfirmDelete));
