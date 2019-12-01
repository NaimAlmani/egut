import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ExpiredActivityItem from './ExpiredActivityItem';
const styles = theme => {};
class ActivityFeed extends Component {
  render() {
    const { activities } = this.props;

    return activities.map((activity, index) => (
      <ExpiredActivityItem
        key={activity.id}
        activity={activity}
        index={index}
      />
    ));
  }
}
const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles, { withTheme: true })(ActivityFeed));
