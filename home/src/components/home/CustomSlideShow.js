import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Slider from 'react-animated-slider';
import './slideStyle.css';
import 'react-animated-slider/build/horizontal.css';
import { Button, Typography } from '@material-ui/core';
import randomBackground from './../../utils/randomBackground';
import randomColor from './../../utils/randomColor';
import config from './../../utils/config';

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
	}
});
class CustomSlideShow extends Component {
	render() {
		const { classes } = this.props;
		/*	const images = [
			{
				title: 'Restad gård utbildning',
				image: randomBackground(1)
			},
			{
				title: 'Restad gård utbildning',
				image: randomBackground(2)
			},
			{
				title: 'Restad gård utbildning',
				image: randomBackground(3)
			}
		];*/
		const images = this.props.slides;

		return (
			<Slider autoplay={3000}>
				{images.map((item, index) => (
					<div
						key={index}
						style={{
							background: `url('${config.imagesPath + item.image}') no-repeat center center`,
							backgroundSize: 'cover',
							backgroundAttachment: 'fixed'
						}}
					>
						<div className={classes.overlay} style={{ background: randomColor(index) }} />
						<div className='center' style={{ marginTop: '15%' }}>
							<Typography className={'notranslate'} style={{ color: '#fff' }} component='h3' variant='h3'>
								{item.title}
							</Typography>
							<Typography className={'notranslate'} style={{ color: '#fff' }} variant='p'>
								{item.subtitle}
							</Typography>
						</div>
					</div>
				))}
			</Slider>
		);
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(CustomSlideShow));
