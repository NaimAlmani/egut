import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import isEmpty from './../../../validation/is-empty';
import './style.css';
import Icon from 'react-web-vector-icons';
// Generate required css

const styles = (theme) => ({});
class IconItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Icon
				name={this.props.name}
				font={!isEmpty(this.props.font) ? this.props.font : 'Feather'}
				color={!isEmpty(this.props.color) ? this.props.color : this.props.theme.palette.primary.main}
				size={this.props.size}
			/>
		);
	}
}

IconItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(IconItem));
