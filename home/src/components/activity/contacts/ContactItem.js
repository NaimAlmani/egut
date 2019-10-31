import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../../utils/config';
import { deleteContact } from './../../../actions/activity';
import ConfirmDelete from '../../common/ConfirmDelete';
import IconItem from './../../common/icons/IconItem';
import Fade from 'react-reveal/Fade';
// Generate required css
import { Grid, TableCell, Avatar, Card, ListItem, Typography } from '@material-ui/core';

import randomColor from './../../../utils/randomColor';
const styles = (theme) => ({
	card: {
		position: 'relative',
		padding: '10px',
		overflow: 'inherit',
		borderBottom: '1px solid #eee'
	},
	avatar: {
		margin: 10,
		width: '75',
		height: '75',
		border: '1px solid ' + theme.palette.primary.main
	},
	image: {
		// ⚠️ object-fit is not supported by IE 11.
		objectFit: 'cover',
		width: '100%'
	},
	deleteBtn: {
		color: theme.palette.error.main,
		background: theme.palette.error.contrastText,
		margin: '0 auto'
	},
	trashIcon: {
		width: '40px',
		height: '40px',
		cursor: 'pointer'
	},
	infoCont: {
		textAlign: 'left',
		padding: '0 10px',
		color: '#fff',
		width: '100%'
	},
	extLink: {
		color: '#fff',
		textDecoration: 'none',
		cursor: 'pointer',
		'&:hover': {
			textDecoration: 'none'
		}
	}
});
class CotnactItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isHovered: false
		};

		this.onMouseLeave = this.onMouseLeave.bind(this);
		this.onMouseEnter = this.onMouseEnter.bind(this);
	}

	onMouseEnter() {
		this.setState({
			isHover: true
		});
	}

	onMouseLeave() {
		this.setState({
			isHover: false
		});
	}
	render() {
		const { classes, contact, index } = this.props;
		const themeColors = this.props.theme.palette;
		return (
			<div style={{ width: '100% ' }}>
				<Fade bottom>
					<ListItem
						className={classes.card}
						key={contact.name}
						onMouseEnter={this.onMouseEnter}
						onMouseLeave={this.onMouseLeave}
					>
						<div align='left'>
							<Avatar
								alt='Remy Sharp'
								src={config.imagesPath + 'small/' + contact.image}
								className={classes.avatar}
							/>
						</div>
						<div className={classes.infoCont}>
							<Typography
								variant='h6'
								align='left'
								style={{ color: '#eee', textAlign: 'left', marginLeft: '10px', fontSize: '1em' }}
							>
								{contact.name}
							</Typography>
							<div style={{ textAlign: 'left' }}>
								<a className={classes.extLink} href={'mailto:' + contact.email}>
									<Typography variant='p'>
										<span style={{ margin: '10px' }}>
											<IconItem
												name='mail'
												font='Feather'
												color={this.props.theme.palette.primary.main}
												size={20}
											/>
										</span>

										{contact.email}
									</Typography>
								</a>
								<a className={classes.extLink} href={'tel:' + contact.email}>
									<Typography variant='p'>
										<span style={{ margin: '10px' }}>
											<IconItem
												name='phone'
												font='Feather'
												color={this.props.theme.palette.primary.main}
												size={20}
											/>
										</span>
										{contact.tel}
									</Typography>
								</a>
							</div>
						</div>
					</ListItem>
				</Fade>
			</div>
		);
	}
}

CotnactItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(CotnactItem));
