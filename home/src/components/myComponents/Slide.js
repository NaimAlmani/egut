import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import randomOverlay from './../../utils/randomOverlay';
const styles = (theme) => ({
	SlideContainer: {
		position: 'relative',
		height: '700px'
	},
	overlay: {
		background: randomOverlay(),
		position: 'absolute',
		top: '0',
		width: '100%',
		height: '100%'
	}
});
class Slide extends Component {
	render() {
		const { classes, image } = this.props;
		const background = 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)) , url(' + image + ')';
		return (
			<div className={classes.SlideContainer} style={{ background: background }}>
				<div className={classes.overlay} />
			</div>
		);
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(Slide));
