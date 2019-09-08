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
import { Typography } from '@material-ui/core';
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
		borderColor: '#fff'
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
			const background = isEmpty(item.logoPath) ? defaultImage : config.imagesPath + item.logoPath;
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
						<Typography variant='h2'>{item.name}</Typography>
						<Typography>{item.detail}</Typography>
						<Typography>{item.description}</Typography>
						<Link
							className={classes.btn}
							href={'./../organization/' + item.id}
							variant='outlined'
							color='primary'
						>
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
