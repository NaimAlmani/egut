import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Divider } from '@material-ui/core';
import IconItem from './../common/icons/IconItem';

const styles = (theme) => ({
	container: {
		flexGrow: 1,
		width: '100%',
		background: '#333',
		padding: '20px',
		marginTop: '40px'
	},
	contactInfo: {
		position: 'relative'
	},
	title: {
		marginBottom: '10px',
		color: '#fff'
	},
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	singleContactCont: {
		display: 'block'
	},
	icon: {
		margin: '5px',
		display: 'inline-block'
	},
	text: {
		color: '#fff',
		display: 'inline-block',
		fontSize: '20px',
		margin: '0'
	},
	link: {
		color: '#fff',
		listStyle: 'none'
	},
	rights: {
		width: '100%',
		height: '50px',
		background: '#f0f0f0',
		padding: '10px',
		textAlign: 'center'
	}
});

class Footer extends React.Component {
	componentDidMount() {}
	render() {
		const { classes } = this.props;

		return (
			<Grid container className={classes.container}>
				<Grid item md={4}>
					<img src={'/images/rg.png'} alt='Restad gard ab' />
				</Grid>
				{/**contact info */}
				<Grid item md={4}>
					<div className={classes.title}>
						<img src={'/images/rgText.png'} alt='RESTAD GARD UTBILDNING AB' />
					</div>
					<Divider variant='inset' light={true} />
					<div className={classes.contactInfo}>
						<a className={classes.singleContactCont} href='mailto:info@restadgard-utb.se'>
							<div className={classes.icon}>
								<IconItem name='mail' color='#fff' size={20} />
							</div>
							<p className={classes.text}>info@restadgard-utb.se</p>
						</a>
						<a className={classes.singleContactCont} href='tel:0762143512'>
							<div className={classes.icon}>
								<IconItem name='phone' color='#fff' size={20} />
							</div>
							<p className={classes.text}>0762143512</p>
						</a>
						<a
							className={classes.singleContactCont}
							target='#'
							href='https://goo.gl/maps/8oDxZUQb1gDFKHFP9'
						>
							<div className={classes.icon}>
								<IconItem name='map-pin' color='#fff' size={20} />
							</div>
							<p className={classes.text}>Kungsladugårdsvägen </p>
							<p className={classes.text}> 462 54 Vänersborg</p>
						</a>
					</div>
				</Grid>
				<Grid item md={4}>
					<div className={classes.title}>
						<h4>WEBBPLATSKART</h4>
					</div>
					<div>
						<NavLink className={classes.link} href='/'>
							<IconItem name='home' color='#fff' font='Feather' size={'1rem'} /> Hem
						</NavLink>
					</div>
					<div>
						<NavLink className={classes.link} href='/activities/'>
							<IconItem name='heart' color='#fff' font='Feather' size={'1rem'} /> Aktiviteter
						</NavLink>
					</div>
					<div>
						<NavLink className={classes.link} href='/organizations/'>
							<IconItem name='globe' color='#fff' font='Feather' size={'1rem'} /> Organisationer
						</NavLink>
					</div>
					<div>
						<NavLink className={classes.link} href='/aboutus/'>
							<IconItem name='info' color='#fff' font='Feather' size={'1rem'} /> Om oss
						</NavLink>
					</div>
				</Grid>
				<Grid item xs={12}>
					<div className={classes.rights}>
						<p>&copy; All rights reserved {new Date().getFullYear()}</p>
					</div>
				</Grid>
			</Grid>
		);
	}
}

Footer.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, {})(withStyles(styles)(Footer));
