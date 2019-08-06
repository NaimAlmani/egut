import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Paper, Typography } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconItem from './../common/icons/IconItem';
import customStyles from './../../theme/customStyles';
import isEmpty from './../../validation/is-empty';
// Generate required css

const styles = (theme) => ({
	//title component
	TitleContainer: {
		width: '100%',
		padding: '10px',
		position: 'relative',
		textAlign: 'center',
		color: theme.palette.peach.contrastText,
		borderTopLeftRadius: '1px',
		borderTopRightRadius: '1px'
	},
	TitleText: {
		display: 'inline-block',
		lineHeight: '2',
		fontSize: '2em',
		textAlign: 'center',
		color: theme.palette.primary.main
	},
	TitleSubText: {
		color: theme.palette.black.active
	}
});
class Title extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { classes, background, color } = this.props;
		return (
			<div style={{ marginBottom: '20px' }}>
				<div className={classes.TitleContainer} style={{ background: background }}>
					<IconItem
						name={this.props.iconName}
						font={!isEmpty(this.props.iconType) ? this.props.iconType : 'Feather'}
						color={this.props.theme.palette.primary.main}
						size={30}
					/>

					<span className={classes.TitleText} style={{ color: color }}>
						{this.props.text}
					</span>
					<Typography component='div' className={classes.TitleSubText}>
						{this.props.subText}
					</Typography>
				</div>
			</div>
		);
	}
}

Title.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	loading: state.loading
});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(Title));
