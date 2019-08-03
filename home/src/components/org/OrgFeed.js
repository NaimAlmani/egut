import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import OrgItem from './OrgItem';
const styles = (theme) => {};
class OrgFeed extends Component {
	render() {
		const { orgs } = this.props;

		return orgs.map((org, index) => <OrgItem key={org.id} org={org} index={index} />);
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(OrgFeed));
