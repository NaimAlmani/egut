import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../utils/config';

import changeToGallery from './../../utils/changeToGallery';
import isEmpty from './../../validation/is-empty';
import { Grid, Typography } from '@material-ui/core';
import { startLoading, endLoading, setLoading } from '../../actions/loading';
import { getGroupById } from './../../actions/group';
// Generate required css
import IconItem from '../common/icons/IconItem';
import Activities from './activities/Activities';
import Title from './../common/Title';
const styles = (theme) => ({
	header: {
		position: 'relative',
		width: '100%',
		height: '80vh',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
		backgroundSize: 'cover'
	},
	headerContent: {
		textAlign: 'center',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%,-50%)',
		color: 'white'
	},
	editIcon: {
		position: 'absolute',
		right: '10px',
		top: '10px',
		cursor: 'pointer'
	},
	editIconText: {
		color: '#fff',
		fontSize: '1.5em'
	},
	root: {
		color: theme.palette.primary.main,
		height: '350px',
		overflow: 'auto'
	},
	card: {
		maxWidth: 345,
		margin: '24px  auto',
		height: '350',
		overflow: 'auto'
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
	//group section
	orgHeader: {
		textAlign: 'center'
	},
	iconCont: {
		float: 'right',
		width: '50px',
		height: '50px',
		background: theme.palette.primary.main,
		borderRadius: '50%',
		marginRight: '10px',
		cursor: 'pointer'
	},
	orgInfoContainer: {
		width: '60%',
		margin: '40px auto',
		textAlign: 'center',
		fontSize: '1.25em'
	},
	chipsCont: {
		textAlign: 'center'
	},
	chip: {
		margin: '10px'
	},
	logoContainer: {
		background: '#fff',
		borderRadius: '15px',
		maxHeight: '500px',
		margin: '0 auto',
		overflow: 'hidden',
		boxShadow: '1px 1px 1px #f0f0f0',
		padding: '5px',
		maxWidth: '500px'
	},
	img: {
		// ⚠️ object-fit is not supported by IE 11.
		objectFit: 'cover',
		width: '100%',
		height: 'auto',
		maxHeight: '200px'
	},
	activityContainer: {
		textAlign: 'center'
	},
	container: {
		marginTop: '100px',
		textAlign: 'center'
	},
	IconCont: {
		margin: '10px'
	}
});
class ViewGroup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.props.startLoading();
	}

	componentDidMount() {
		this.props.getGroupById(this.props.match.params.id);
	}

	render() {
		const { classes, group } = this.props;
		const cat = group.currentGroup;
		return (
			<div className={classes.container}>
				<div className={classes.title}>
					<Title
						iconName={cat.icon_name}
						text={cat.name}
						subText={cat.description}
						color={this.props.theme.palette.primary.main}
					/>
					<p dangerouslySetInnerHTML={{ __html: cat.description }} />
				</div>
				<Grid container>
					<Activities title='Aktiviteter' activities={this.props.group.activities} icon='heart' />
				</Grid>
			</div>
		);
	}
}

ViewGroup.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	group: state.group,
	loading: state.loading
});

export default connect(mapStateToProps, { getGroupById, startLoading, endLoading, setLoading })(
	withStyles(styles, { withTheme: true })(ViewGroup)
);
