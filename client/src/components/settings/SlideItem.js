import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../utils/config';
import randomColor from './../../utils/randomColor';
import { Fade } from 'react-reveal';
import { Grid } from '@material-ui/core';
import { showEditSlide, deleteSlide } from './../../actions/slide';
import ConfirmDelete from './../common/ConfirmDelete';
import IconItem from './../common/icons/IconItem';
import { Link } from 'react-router-dom';

// Generate required css
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

const styles = (theme) => ({
	root: {
		color: theme.palette.primary.main,
		minHeight: '250px'
	},
	card: {
		maxWidth: 345,
		margin: '24px  auto',
		height: '350',
		overflow: 'auto',
		textAlign: 'center',
		position: 'relative'
	},
	mediaContaier: {
		width: '40%',
		height: 'auto',
		margin: '0 auto'
	},
	image: {
		// ⚠️ object-fit is not supported by IE 11.
		objectFit: 'cover',
		width: '100%'
	},
	deleteBtn: {
		color: theme.palette.error.main,
		background: theme.palette.error.contrastText
	},
	btnCont: {
		margin: '10px auto'
	},
	linkClass: {
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'none'
		}
	}
});
class SlideItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false
		};

		this.selectSlide = this.selectSlide.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onConfirmDelete = this.onConfirmDelete.bind(this);
		this.onCancelDelete = this.onCancelDelete.bind(this);
	}
	onDelete() {
		this.setState({
			isDelete: true
		});
	}
	onConfirmDelete() {
		const slide = {
			id: this.props.slide.id
		};
		this.props.deleteSlide(slide);
	}
	onCancelDelete() {
		this.setState({
			isDelete: false
		});
	}
	selectSlide = () => {
		this.props.showEditSlide(this.props.slide, true);
	};
	render() {
		const { classes, slide } = this.props;
		return (
			<Grid item xs={12} sm={6} md={3}>
				<Fade bottom>
					<Card className={classes.card} style={{ background: randomColor(this.props.index) }}>
						{slide.favorite == 1 || slide.favorite === true ? (
							<span style={{ position: 'absolute', top: '2px', left: '2px' }}>
								<IconItem name='star' color='#C5B358' />
							</span>
						) : null}
						<CardActionArea className={classes.root}>
							<Link to={'slide/' + slide.id} className={classes.linkClass}>
								<div className={classes.mediaContaier}>
									<img className={classes.image} src={config.imagesPath + slide.image} alt='logo' />
								</div>
								<CardContent>
									<Typography gutterBottom variant='h5' component='h2'>
										{slide.name}
									</Typography>
									<Typography noWrap={true} component='p'>
										{slide.description}
									</Typography>
								</CardContent>
							</Link>
						</CardActionArea>
						<CardActions className={classes.cardAction}>
							<div className={classes.btnCont}>
								<Button size='small' className={classes.deleteBtn} onClick={this.onDelete}>
									Delete
								</Button>
								<Button size='small' color='primary' onClick={this.selectSlide}>
									Edit
								</Button>
							</div>
						</CardActions>
					</Card>
					<ConfirmDelete
						open={this.state.isDelete}
						title='Are you Sure ??'
						text={'do you want to delete ' + slide.name}
						onClose={this.onCancelDelete}
						onDelete={this.onConfirmDelete}
					/>
				</Fade>
			</Grid>
		);
	}
}

SlideItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { showEditSlide, deleteSlide })(
	withStyles(styles, { withTheme: true })(SlideItem)
);
