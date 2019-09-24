import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../utils/config';
import randomColor from './../../utils/randomColor';
import { Grid, Avatar } from '@material-ui/core';
import { showEditGroup, deleteGroup } from './../../actions/group';
import customStyles from './../../theme/customStyles';
import ConfirmDelete from './../common/ConfirmDelete';
// Generate required css
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
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
		background: theme.palette.primary.main,
		border: '1px solid #fff'
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
	}
});
class GroupItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false
		};

		this.selectGroup = this.selectGroup.bind(this);
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
		const group = {
			id: this.props.group.id
		};
		this.props.deleteGroup(group);
	}
	onCancelDelete() {
		this.setState({
			isDelete: false
		});
	}
	selectGroup = () => {
		this.props.showEditGroup(this.props.group, true);
	};
	render() {
		const { classes, group } = this.props;
		return (
			<Grid item xs={12} sm={6} md={3}>
				<Card className={classes.card} style={{ background: randomColor(this.props.index) }}>
					<CardActionArea className={classes.root}>
						<CardContent>
							<Avatar className={classes.avatar}>
								<IconItem name={group.icon_name} font={group.icon_font} color='#fff' size='30px' />
							</Avatar>
							<Typography style={{ color: '#fff' }} gutterBottom variant='h5' component='h2'>
								{group.name}
							</Typography>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<div style={{ margin: '0 auto' }}>
							<Button size='small' className={classes.deleteBtn} onClick={this.onDelete}>
								Delete
							</Button>
							<Button size='small' color='primary' onClick={this.selectGroup}>
								Edit
							</Button>
						</div>
					</CardActions>
				</Card>
				<ConfirmDelete
					open={this.state.isDelete}
					title='Are you Sure ??'
					text={'do you want to delete ' + group.name}
					onClose={this.onCancelDelete}
					onDelete={this.onConfirmDelete}
				/>
			</Grid>
		);
	}
}

GroupItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { showEditGroup, deleteGroup })(
	withStyles(styles, { withTheme: true })(GroupItem)
);
