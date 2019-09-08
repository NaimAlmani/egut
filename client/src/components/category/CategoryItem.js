import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Grid, Avatar } from '@material-ui/core';
import randomColor from './../../utils/randomColor';
import { Link } from 'react-router-dom';

import { Fade } from 'react-reveal';
import { showEditCategory, deleteCategory } from './../../actions/category';
import ConfirmDelete from './../common/ConfirmDelete';
// Generate required css
import { Card, CardActionArea, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import IconItem from '../common/icons/IconItem';

const styles = (theme) => ({
	root: {
		color: theme.palette.primary.main,
		minHeight: '250px',

		textAlign: 'center'
	},
	card: {
		maxWidth: 345,
		margin: '24px  auto',
		height: '350',
		overflow: 'auto'
	},
	avatar: {
		margin: '10px auto',
		width: 60,
		height: 60,
		background: theme.palette.primary.main
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
	linkClass: {
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'none'
		}
	}
});
class CategoryItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false
		};

		this.selectCategory = this.selectCategory.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onConfirmDelete = this.onConfirmDelete.bind(this);
		this.onCancelDelete = this.onCancelDelete.bind(this);
	}
	componentDidCatch(error, info) {
		// You can also log the error to an error reporting service
	}
	onDelete() {
		this.setState({
			isDelete: true
		});
	}
	onConfirmDelete() {
		const category = {
			id: this.props.category.id
		};
		this.props.deleteCategory(category);
	}
	onCancelDelete() {
		this.setState({
			isDelete: false
		});
	}
	selectCategory = () => {
		this.props.showEditCategory(this.props.category, true);
	};
	render() {
		const { classes, category } = this.props;
		return (
			<Grid item xs={12} sm={6} md={3}>
				<Fade bottom>
					<Card className={classes.card} style={{ background: randomColor(this.props.index) }}>
						<CardActionArea className={classes.root}>
							<Link to={'category/' + category.id} className={classes.linkClass}>
								<CardContent>
									<Avatar className={classes.avatar}>
										<IconItem
											name={category.icon_name}
											font={category.icon_font}
											color='#fff'
											size='30px'
										/>
									</Avatar>
									<Typography gutterBottom variant='h5' component='h2'>
										{category.name}
									</Typography>
									<Typography noWrap={true} component='p'>
										{category.description}
									</Typography>
								</CardContent>
							</Link>
						</CardActionArea>
						<CardActions>
							<div style={{ margin: '0 auto' }}>
								<Button size='small' className={classes.deleteBtn} onClick={this.onDelete}>
									Delete
								</Button>
								<Button size='small' color='primary' onClick={this.selectCategory}>
									Edit
								</Button>
							</div>
						</CardActions>
					</Card>
					<ConfirmDelete
						open={this.state.isDelete}
						title='Are you Sure ??'
						text={'do you want to delete ' + category.name}
						onClose={this.onCancelDelete}
						onDelete={this.onConfirmDelete}
					/>
				</Fade>
			</Grid>
		);
	}
}

CategoryItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { showEditCategory, deleteCategory })(
	withStyles(styles, { withTheme: true })(CategoryItem)
);
