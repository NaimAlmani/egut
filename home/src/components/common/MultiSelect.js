import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import isEmpty from './../../validation/is-empty';
import Icon from 'react-web-vector-icons';

import {
	Input,
	Select,
	FormControl,
	InputLabel,
	MenuItem,
	Checkbox,
	ListItemText,
	InputBase,
	FormHelperText
} from '@material-ui/core';
const styles = (theme) => ({
	textField: {
		[`& fieldset`]: {
			borderRadius: '10px',
			padding: '0px'
		},
		ControlRoot: {
			minWidth: '150px !important'
		},
		input: {
			minWidth: '150px !important',
			[`& fieldset`]: {
				borderRadius: '50px',
				padding: '0px'
			}
		},
		selectIcon: {
			float: 'right',
			position: 'absolute',
			right: ' 0px',
			top: '12px'
		},

		labelOutlined: {
			background: '#fff'
		},
		selectedMenuItem: {
			'&$selected': {
				backgroundColor: '#f00'
			}
		}
	}
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = (mainColor) => ({
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
			borderRadius: '10px'
		}
	}
});

const BootstrapInput = withStyles((theme) => ({
	root: {
		marginTop: '5px',
		'label + &': {
			top: '-4px!important'
		}
	},
	input: {
		borderRadius: '10px',
		position: 'relative',
		backgroundColor: theme.palette.background.paper,
		border: '1px solid' + theme.palette.primary.main,
		fontSize: 12,
		padding: '10px 25px 15px 12px',
		transition: theme.transitions.create([ 'border-color', 'box-shadow' ]),
		// Use the system font instead of the default Roboto font.
		'&:focus': {
			borderRadius: '10px',
			borderColor: '#80bdff',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
		}
	}
}))(InputBase);
class MultiSelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isHovered: false
		};
	}
	inputLabel = React.useRef < HTMLLabelElement > null;

	render() {
		const {
			classes,
			onClick,
			style,
			theme,
			value,
			label,
			onChange,
			onBlur,
			id,
			options,
			selectedValues,
			name,
			error,
			info,
			shrink,
			disabled,
			helperText
		} = this.props;

		return (
			<FormControl
				variant='outlined'
				classes={{ root: classes.ControlRoot }}
				className={classes.formControl}
				error={error}
				style={{ minWidth: '150px', paddingRight: '30px', marginTop: '-7px' }}
			>
				<InputLabel
					classes={{ outlined: classes.labelOutlined }}
					style={{ background: '#fff', padding: '0 5px' }}
					ref={this.inputLabel}
					htmlFor={name}
					variant='outlined'
					margin='dense'
					shrink={shrink}
				>
					{label}
				</InputLabel>
				<Select
					value={value}
					multiple
					name={name}
					onChange={onChange}
					onBlur={onBlur}
					variant='outlined'
					renderValue={(selected) => selected.join(', ')}
					classes={{ outlined: classes.input }}
					input={
						<BootstrapInput
							classes={{ root: classes.input }}
							name={name}
							id={name}
							disabled={disabled}
							error={error}
						/>
					}
					MenuProps={MenuProps(theme.palette.primary.main)}
					IconComponent={() => (
						<Icon
							style={{ position: 'absolute', right: '0', top: '13px' }}
							name='chevron-down'
							font='Feather'
							color={this.props.theme.palette.primary.main}
						/>
					)}
				>
					{options.map((option) => (
						<MenuItem key={option} value={option} classes={{ root: classes.selectedMenuItem }}>
							<Checkbox
								color='primary'
								checked={value.indexOf(option) > -1}
								icon={
									<Icon name='circle' font='Feather' color={theme.palette.primary.main} size={16} />
								}
								checkedIcon={<Icon name='check-circle' font='Feather' color={'#6ea3fd'} size={16} />}
							/>
							<ListItemText primary={option} />
						</MenuItem>
					))}
				</Select>
				<FormHelperText style={{ marginTop: '2px' }}>{helperText}</FormHelperText>
			</FormControl>
		);
	}
}
MultiSelect.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(MultiSelect));
