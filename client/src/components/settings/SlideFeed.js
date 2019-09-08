import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import SlideItem from './SlideItem';
const styles = (theme) => {};
class SlideFeed extends Component {
	render() {
		const { slides } = this.props;

		return slides.map((slide, index) => <SlideItem key={slide.id} slide={slide} index={index} />);
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(SlideFeed));
