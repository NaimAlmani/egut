import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
// Generate required css

const styles = theme => ({});
class IconItem extends React.Component {
	render() {
		return <li>{this.props.error}</li>;
	}
}

IconItem.propTypes = {
	classes: PropTypes.object.isRequired,
	selectIcon: PropTypes.func.isRequired
};
const mapStateToProps = state => ({});

export default connect(
	mapStateToProps,
	{}
)(withStyles(styles)(IconItem));
