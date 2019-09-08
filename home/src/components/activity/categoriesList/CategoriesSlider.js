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
import MediaQuery from 'react-responsive';
const styles = (theme) => ({
	root: {
		textAlign: 'center'
	},
	sliderCont: {
		marginTop: '30px',
		marginBottom: '30px',
		position: 'relative'
	},
	arrowBtn: {
		width: '100%',
		textAlign: 'center',
		cursor: 'pointer'
	}
});

class CategoriesSlider extends React.Component {
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
		const settings = {
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 4,
			slidesToScroll: 1,
			initialSlide: 0,
			swipeToSlide: true,
			vertical: true,
			verticalSwiping: true
		};
		const Hsettings = {
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 4,
			slidesToScroll: 1,
			initialSlide: 0,
			swipeToSlide: true
		};
		const { classes, categories } = this.props;
		const content = categories.map((category, index) => <CategoryItem key={index} category={category} />);
		return (
			<div className={classes.sliderCont}>
				<div className={classes.arrowBtn} onClick={this.prev}>
					<IconItem name='chevron-up' size={'40px'} color={'#333'} />
				</div>
				<Slider ref={(c) => (this.slider = c)} {...settings}>
					{content}
				</Slider>
				<div className={classes.arrowBtn} onClick={this.next}>
					<IconItem name='chevron-down' size={'40px'} color={'#333'} />
				</div>
			</div>
		);
	}
}
CategoriesSlider.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(CategoriesSlider));
