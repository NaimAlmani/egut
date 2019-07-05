import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../../utils/config';
import { Grid } from '@material-ui/core';
import { deleteGroup } from './../../../actions/activity';
import ConfirmDelete from '../../common/ConfirmDelete';
import IconItem from './../../common/icons/IconItem';
// Generate required css
const styles = (theme) => ({
	root: {
		color: theme.palette.primary.main,
		minHeight: '250px'
	},
	Grid: {},
	mediaContaier: {
		width: '40%',
		height: 'auto',
		margin: '0 auto'
	},
	imageContainer: {
		width: '100%',
		height: '400px',
		minHeight: '300px'
	},
	image: {
		// ⚠️ object-fit is not supported by IE 11.
		objectFit: 'cover',
		width: '100%',
		height: 'auto'
	},
	deleteBtn: {
		color: theme.palette.error.main,
		background: theme.palette.error.contrastText,
		margin: '0 auto'
	},
	avatar: {
		margin: '10px auto',
		width: 60,
		height: 60,
		background: theme.palette.primary.main
	}
});
class ImageItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false
		};

		this.onDelete = this.onDelete.bind(this);
		this.onConfirmDelete = this.onConfirmDelete.bind(this);
		this.onCancelDelete = this.onCancelDelete.bind(this);
	}
	componentDidCatch(error, info) {}
	onDelete() {
		this.setState({
			isDelete: true
		});
	}
	onConfirmDelete() {
		const image = {
			id: this.props.image.id
		};
		this.props.deleteGroup(this.props.activityID, image);
	}
	onCancelDelete() {
		this.setState({
			isDelete: false
		});
	}
	render() {
		const { classes } = this.props;
		const img = config.imagesPath + this.props.image.path;
		return (
			<Grid item xs={12} sm={6} md={4} className={classes.Grid}>
				<div className={classes.imageContainer} style={{ background: img }}>
					<img src={img} className={classes.image} />
					<h4>{this.props.image.title}</h4>
					<p>{this.props.image.description}</p>
				</div>
			</Grid>
		);
	}
}

ImageItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deleteGroup })(withStyles(styles, { withTheme: true })(ImageItem));
