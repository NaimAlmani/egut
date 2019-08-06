import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Divider } from '@material-ui/core';
import IconItem from './../common/icons/IconItem';

const styles = (theme) => ({
	main: {
		textAlign: 'center',
		margin: '40px auto',
		width: '100%'
	},
	text: {
		fontSize: '40px',
		color: theme.palette.primary.main
	}
});

class NotFound extends React.Component {
	componentDidMount() {}
	render() {
		const { classes } = this.props;

		return (
			<div className={classes.main}>
				<div className={classes.IconCont}>
					<IconItem name='alert-triangle' color={this.props.theme.palette.primary.main} size={100} />
				</div>
				<div className={classes.text}>NotFound</div>
			</div>
		);
	}
}

NotFound.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(NotFound));
