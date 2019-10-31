import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../../utils/config';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

// Generate required css
import { Card, CardContent, Typography } from '@material-ui/core';

const styles = (theme) => ({
	root: {
		color: theme.palette.primary.main
	},
	card: {
		maxWidth: 345,
		margin: '24px  auto',

		overflow: 'auto',
		textAlign: 'center',
		border: 'none',
		boxShadow: 'none'
	},
	mediaContaier: {
		width: '40%',
		height: 'auto',
		margin: '0 auto',
		maxHeight: '150px',
		overflow: 'hidden'
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
	btnCont: {},
	link: {
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'none'
		}
	}
});
class OrgItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false
		};

		this.selectOrg = this.selectOrg.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onConfirmDelete = this.onConfirmDelete.bind(this);
		this.onCancelDelete = this.onCancelDelete.bind(this);
	}
	componentDidCatch(error, info) {
		// You can also log the error to an error reporting service
		console.log('error');
		console.log(error);
		console.log('info');
		console.log(info);
	}
	onDelete() {
		this.setState({
			isDelete: true
		});
	}
	onConfirmDelete() {
		const org = {
			id: this.props.org.id
		};
		this.props.deleteOrg(org);
	}
	onCancelDelete() {
		this.setState({
			isDelete: false
		});
	}
	selectOrg = () => {
		this.props.showEdit(this.props.org, true);
	};
	render() {
		const { classes, org } = this.props;
		return (
			<Grid item xs={12} sm={4} md={2}>
				<Fade>
					<Card className={classes.card}>
						<div className={classes.root}>
							<Link to={'/organization/' + org.id} className={classes.link}>
								<div className={classes.mediaContaier}>
									<img className={classes.image} src={config.imagesPath + org.logoPath} alt='logo' />
								</div>
								<CardContent>
									<Typography gutterBottom variant='p' component='p' style={{ color: '#333' }}>
										{org.name}
									</Typography>
								</CardContent>
							</Link>
						</div>
					</Card>
				</Fade>
			</Grid>
		);
	}
}

OrgItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(OrgItem));
