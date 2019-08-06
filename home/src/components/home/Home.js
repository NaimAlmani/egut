import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CustomSlideShow from './CustomSlideShow';

const styles = (theme) => ({
	Section: {
		height: '900px',
		marginButton: '50px'
	}
});
class Home extends Component {
	render() {
		const { classes } = this.props;
	
		return (
			<div className={classes.Section}>
				<CustomSlideShow  />
			</div>
		);
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(Home));
