import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ImageItem from './ImageItem';
const styles = (theme) => {};
class ImageFeed extends Component {
	render() {
		const { images } = this.props;

		return images.map((image) => <ImageItem key={image.id} image={image} />);
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(ImageFeed));
