import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Divider, Typography } from '@material-ui/core';
import IconItem from './../common/icons/IconItem';
import { Container, Row, Col } from 'reactstrap';
import defaults from './../../utils/defaults';
import { Fade } from 'react-reveal';
import ContactForm from './../headers/ContactForm';
const styles = (theme) => ({
	container: {
		background: '#df8546'
	},
	contactInfo: {
		position: 'relative'
	},
	title: {
		marginBottom: '10px',
		color: '#fff',
		textAlign: 'left',
		marginRight: '25px'
	},
	whiteColor: {
		color: '#fff'
	},
	image: {
		width: '175px',
		height: 'auto',
		margin: '20px auto'
	},
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	singleContactCont: {
		display: 'block',
		fontSize: '0.8em'
	},
	icon: {
		margin: '5px',
		display: 'inline-block'
	},
	text: {
		color: '#fff',
		display: 'inline-block',
		fontSize: '1rem',
		margin: '0 10px'
	},
	link: {
		color: '#fff',
		listStyle: 'none',
		fontSize: '0.8em'
	},
	centeredlink: {
		color: '#fff',
		listStyle: 'none',
		fontSize: '0.8em',
		textAlign: 'left'
	},
	rights: {
		width: '100%',
		height: '50px',
		padding: '10px 0',
		textAlign: 'center',
		margin: '0',
		background: 'transparent',
		color: '#fff'
	},
	overlay: {
		background: theme.palette.primary.main,
		opacity: '0.5',
		position: 'absolute',
		width: '100%',
		height: '100%',
		left: '0',
		top: '0'
	}
});

class Footer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isContactShow: false
		};
	}
	componentDidMount() {}
	onShowContact = () => {
		this.setState({
			isContactShow: true
		});
	};
	onhideContact = () => {
		this.setState({
			isContactShow: false
		});
	};
	render() {
		const { classes } = this.props;

		return (
			<Container
				fluid={true}
				className={classes.container}
				style={{
					position: 'relative',
					background: `url('${defaults().background.groups}') no-repeat center center`,
					backgroundSize: 'cover',
					backgroundAttachment: 'fixed',
					marginTop: '40px'
				}}
			>
				<div className={classes.overlay} />
				<Row style={{ padding: '10px' }}>
					<Col lg={4} md={4} sm={12} style={{ textAlign: 'center' }}>
						<img src={'/images/rg.png'} alt='Restad gard ab' className={classes.image} />
					</Col>
					{/**contact info */}
					<Col lg={4} md={4} sm={12}>
						<div className={classes.title}>
							<Typography className={classes.whiteColor} variant='h6'>
								Restad gård utbildning
							</Typography>
						</div>
						<Divider variant='inset' light={true} />
						<div className={classes.contactInfo}>
							<NavLink className={classes.link} href='mailto:info@restadgard-utb.se'>
								<IconItem name='mail' color='#fff' font='Feather' size={'1rem'} />
								<Typography variant='p' className={classes.text}>
									info@restadgard-utb.se
								</Typography>
							</NavLink>
							<NavLink className={classes.link} href='tel:0762143512'>
								<IconItem name='phone' color='#fff' font='Feather' size={'1rem'} />
								<Typography variant='p' className={classes.text}>
									0762143512
								</Typography>
							</NavLink>
							<NavLink className={classes.link} href='https://goo.gl/maps/8oDxZUQb1gDFKHFP9'>
								<IconItem name='map-pin' color='#fff' font='Feather' size={'1rem'} />
								<Typography variant='p' className={classes.text}>
									Kungsladugårdsvägen<br />
									462 54 Vänersborg
								</Typography>
							</NavLink>
						</div>
					</Col>
					<Col lg={4} md={4} sm={12}>
						<div className={classes.title}>
							<Typography className={classes.whiteColor} style={{ textAlign: 'center' }} variant='h6'>
								WEBBPLATSKART
							</Typography>
						</div>
						<Row>
							<Col md={6} lg={6} sm={12}>
								<div>
									<NavLink className={classes.centeredlink} href='/'>
										<IconItem name='home' color='#fff' font='Feather' size={'1rem'} />
										<Typography variant='p' className={classes.text}>
											Hem
										</Typography>
									</NavLink>
								</div>
								<div>
									<NavLink className={classes.centeredlink}>
										<Link to='/activities/' className='navlink'>
											<IconItem name='heart' color='#fff' font='Feather' size={'1rem'} />
											<Typography variant='p' className={classes.text}>
												Aktiviteter
											</Typography>
										</Link>
									</NavLink>
								</div>
								<div>
									<NavLink className={classes.centeredlink}>
										<Link to='/organizations/' className='navlink'>
											<IconItem name='globe' color='#fff' font='Feather' size={'1rem'} />
											<Typography variant='p' className={classes.text}>
												Organisationer
											</Typography>
										</Link>
									</NavLink>
								</div>
								<div>
									<NavLink className={classes.centeredlink}>
										<Link to='/places/' className='navlink'>
											<IconItem name='map-pin' color='#fff' font='Feather' size={'1rem'} />
											<Typography variant='p' className={classes.text}>
												Våra lokalar
											</Typography>
										</Link>
									</NavLink>
								</div>
							</Col>

							<Col md={6} lg={6} sm={12}>
								<div>
									<NavLink className={classes.centeredlink}>
										<Link to='/about/' className='navlink'>
											<IconItem name='info' color='#fff' font='Feather' size={'1rem'} />
											<Typography variant='p' className={classes.text}>
												Om oss
											</Typography>
										</Link>
									</NavLink>
								</div>
								<div>
									<NavLink className={classes.centeredlink}>
										<NavItem
											onClick={this.onShowContact}
											style={{ cursor: 'pointer', color: '#fff' }}
										>
											<IconItem name='phone-call' font='Feather' size={'1rem'} color='#fff' />
											<Typography variant='p' className={classes.text}>
												Kontakta
											</Typography>
										</NavItem>
									</NavLink>
								</div>
								<div>
									<NavLink className={classes.centeredlink} href='/organizations/'>
										<IconItem name='globe' color='#fff' font='Feather' size={'1rem'} />
										<Typography variant='p' className={classes.text}>
											Organisationer
										</Typography>
									</NavLink>
								</div>
								<div>
									<NavLink className={classes.centeredlink} href='/aboutus/'>
										<IconItem name='info' color='#fff' font='Feather' size={'1rem'} />
										<Typography variant='p' className={classes.text}>
											Om oss
										</Typography>
									</NavLink>
								</div>
							</Col>
						</Row>
					</Col>
					<Col lg={12} md={12} sm={12}>
						<div className={classes.rights}>
							<p>&copy; All rights reserved {new Date().getFullYear()}</p>
						</div>
					</Col>
				</Row>
				<ContactForm open={this.state.isContactShow} onClose={this.onhideContact} />
			</Container>
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
