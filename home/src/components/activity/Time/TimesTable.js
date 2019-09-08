import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import TimeFeed from './TimeFeed';

const styles = (theme) => {};
class TimesTable extends Component {
	render() {
		const { times, classes } = this.props;

		return (
			<List>
				<TimeFeed times={times} />
			</List>
		);
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(TimesTable));
