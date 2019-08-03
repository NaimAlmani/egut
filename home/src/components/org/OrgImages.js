import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Gallery from 'react-grid-gallery';
import { Button } from '@material-ui/core';
import allImagesSelected from './../../utils/allImagesSelected';
import IconItem from './../common/icons/IconItem';
import { deleteOrgImage } from './../../actions/organization';
const styles = (theme) => ({
	captionStyle: {
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		maxHeight: '240px',
		overflow: 'hidden',
		position: 'absolute',
		bottom: '0',
		width: '100%',
		color: 'white',
		padding: '2px',
		fontSize: '90%'
	},
	title: {
		width: '100%',
		textAlign: 'center',
		color: theme.palette.green.main
	},
	galleryContainer: {
		width: '100%',
		marginTop: '20px'
	},
	IconContainer: {
		borderRadius: '50%',
		width: '30px',
		height: '30px',
		backgroundColor: theme.palette.green.main,
		float: 'right',
		position: 'absolute',
		right: '2px',
		bottom: '2px',
		zIndex: '99999'
	},
	trash: {
		cursor: 'wait'
	}
});
class OrgImages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			isDelete: false,
			currentImage: ''
		};
		this.onCurrentImageChange = this.onCurrentImageChange.bind(this);
		this.deleteImage = this.deleteImage.bind(this);
	}
	componentDidMount() {
		this.setState({
			images: this.props.images
		});
	}
	componentWillReceiveProps(nextprops) {
		this.setState({
			images: nextprops.images
		});
	}

	onSelectImage(index, image) {
		var images = this.state.images.slice();
		var img = images[index];
		if (img.hasOwnProperty('isSelected')) img.isSelected = !img.isSelected;
		else img.isSelected = true;

		this.setState({
			images: images
		});

		if (allImagesSelected(images)) {
			this.setState({
				selectAllChecked: true
			});
		} else {
			this.setState({
				selectAllChecked: false
			});
		}
	}
	onCurrentImageChange(index) {
		this.setState({ currentImage: index });
	}
	deleteImage() {
		if (window.confirm(`Are you sure you want to delete image number ${this.state.currentImage}?`)) {
			const deleteImageId = this.state.images[this.state.currentImage].id;
			this.props.deleteOrgImage(deleteImageId);
			var images = this.state.images.slice();
			images.splice(this.state.currentImage, 1);
			this.setState({
				images: images
			});
		}
	}

	render() {
		const { classes } = this.props;
		var images = this.props.images.map((i) => {
			i.customOverlay = (
				<div className={classes.captionStyle}>
					<div className={classes.title}>{i.caption}</div>
					<div className={classes.description}>{i.description}</div>
					{i.hasOwnProperty('tags') && this.setCustomTags(i)}
				</div>
			);
			return i;
		});
		return (
			<div className={classes.galleryContainer}>
				<Gallery
					images={this.state.images}
					srcSet={this.state.images}
					onSelectImage={this.onSelectImage}
					currentImageWillChange={this.onCurrentImageChange}
					customControls={[]}
				/>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(OrgImages));
