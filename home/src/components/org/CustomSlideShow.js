import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Slider from 'react-animated-slider';
import './slideStyle.css';
import { Button } from '@material-ui/core';
import randomColor from './../../utils/randomColor';
import 'react-animated-slider/build/horizontal.css';
import config from './../../utils/config';
import isEmpty from './../../validation/is-empty';
import { Link } from 'react-router-dom';
const styles = (theme) => ({
	slideContent: {
		width: '100%'
	},
	contentContanier: {
		textAlign: 'center',
		width: '50%',
		margin: '0 auto',
		lineHeight: '100'
	},
	overlay: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		opacity: '0.6'
	},
	btn: {
		color: '#fff',
		borderColor: '#fff',
		padding: '10px',
		borderRadius: '5px',
		border: '1px solid #fff',
		'&:hover': {
			textDecoration: 'none',
			fontWeight: 'bold',
			underline: 'none',
			color: theme.palette.primary.main,
			border: '1px solid ' + theme.palette.primary.main
		}
	},
	logoContanier: {
		width: '200px',
		height: 'auto',
		overflow: 'hidden',
		margin: '0 auto'
	},
	logo: {
		width: '100%',
		height: 'auto'
	}
});
class CustomSlideShow extends Component {
	render() {
		const { content, classes } = this.props;
		const defaultImage = 'http://restadgard.se/wp-content/uploads/bb-plugin/cache/RestadGard-panorama.jpg';
		let returned = content.map((item, index) => {
			const background = isEmpty(item.background) ? defaultImage : config.imagesPath + item.background;
			return (
				<div
					key={index}
					style={{
						background: `url('${background}') no-repeat center center`,
						backgroundSize: 'cover',
						backgroundAttachment: 'fixed'
					}}
				>
					<div className={classes.overlay} style={{ background: randomColor(index) }} />
					<div className='center'>
						<div className={classes.logoContanier}>
							<img className={classes.logo} src={config.imagesPath + item.logoPath} alt={item.name} />
						</div>
						<h1>{item.name}</h1>
						<p>{item.detail}</p>
						<p>{item.description}</p>

						<Link className={classes.btn} to={'/organization/' + item.id}>
							Visa mer
						</Link>
					</div>
				</div>
			);
		});
		return (
			<Slider infinite={true} autoplay={5000}>
				{returned}
			</Slider>
		);
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(CustomSlideShow));
