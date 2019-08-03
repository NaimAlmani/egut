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
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Input } from '@material-ui/core';
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
	},
	formControl: {
		minWidth: '150px'
	}
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};

class CustomSelect extends Component {
	handleChange = (e) => {
		this.props.onChange(e);
	};
	render() {
		const { classes, onChange, options, selectedItems, label } = this.props;
		return (
			<FormControl className={classes.formControl} variant='outlined'>
				<InputLabel htmlFor='select-multiple-checkbox'>{label}</InputLabel>
				<Select
					multiple
					value={selectedItems}
					onChange={this.handleChange}
					input={<Input id='select-multiple-checkbox' />}
					renderValue={(selected) => selected.join(', ')}
					MenuProps={MenuProps}
				>
					{options.map((name) => (
						<MenuItem key={name} value={name}>
							<Checkbox checked={selectedItems.indexOf(name) > -1} />
							<ListItemText primary={name} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
		);
	}
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(CustomSelect));
