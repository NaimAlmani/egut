import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import PlaceItem from './PlaceItem';
const styles = (theme) => {};
class GroupFeed extends Component {
	render() {
		const { places } = this.props;

		return places.map((place) => <PlaceItem key={place.id} place={place} activityID={this.props.activityID} />);
	}
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(GroupFeed));
