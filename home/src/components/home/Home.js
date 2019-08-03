import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CustomSlideShow from './../myComponents/CustomSlideShow';
import Slide from './../myComponents/Slide';

const styles = (theme) => ({
	Section: {
		height: '700px'
	}
});
class Home extends Component {
	render() {
		const { classes } = this.props;
		const images = [
			{
				title: 'image1',
				image: 'http://restadgard.se/wp-content/uploads/bb-plugin/cache/RestadGard-panorama.jpg'
			},
			{
				title: 'image2',
				image: 'http://visitrestad.se/wp-content/uploads/2016/04/SLIDER_ata-och-bo.jpg'
			}
		];
		return (
			<div className={classes.Section}>
				<CustomSlideShow content={images} />
			</div>
		);
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(Home));
