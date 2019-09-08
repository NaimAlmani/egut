import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { ListItem, List } from '@material-ui/core';

import Slider from 'react-slick';
import './../slick/slick.css';
import './../slick/slick-theme.css';
import IconItem from './../../common/icons/IconItem';

import CategoryItem from './CategoryItem';
const styles = (theme) => ({
	root: {
		textAlign: 'center'
	},
	sliderCont: {
		width: '75%',
		margin: '0 auto',
		position: 'relative'
	},
	leftBtn: {
		position: 'absolute',
		left: '-5%',
		top: '5px',
		cursor: 'pointer'
	},
	rightBtn: {
		position: 'absolute',
		right: '-5%',
		top: '5px',
		cursor: 'pointer'
	}
});

class categoriesSlider extends React.Component {
	constructor(props) {
		super(props);
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
	}

	next() {
		this.slider.slickNext();
	}
	prev() {
		this.slider.slickPrev();
	}
	render() {
		var settings = {
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 4,
			slidesToScroll: 4,
			initialSlide: 0,
			arrows: false,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						infinite: true
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						initialSlide: 2
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		};
		const { classes, categories } = this.props;
		const content = categories.map((gr, index) => <CategoryItem key={index} category={gr} />);
		return (
			<div className={classes.sliderCont}>
				<div className={classes.leftBtn} onClick={this.prev}>
					<IconItem name='chevron-left' size={'40px'} color={'#333'} />
				</div>
				<Slider ref={(c) => (this.slider = c)} {...settings}>
					{content}
				</Slider>
				<div className={classes.rightBtn} onClick={this.next}>
					<IconItem name='chevron-right' size={'40px'} color={'#333'} />
				</div>
			</div>
		);
	}
}
categoriesSlider.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(categoriesSlider));
