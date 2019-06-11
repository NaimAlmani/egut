import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import customStyles from './../../theme/customStyles';
import { registerUser } from '../../actions/auth';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Title from '../common/Title';
const styles = theme => customStyles(theme);

class Dashboard extends Component {
	componentDidMount() {}
	render() {
		const { classes } = this.props;
		return (
			<div style={styles.mainLoginCont}>
				<h1>DashBoard</h1>
			</div>
		);
	}
}

Dashboard.propTypes = {};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	loading: state.loading
});

export default connect(
	mapStateToProps,
	{}
)(withStyles(styles, { withTheme: true })(Dashboard));
