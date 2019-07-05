import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
// Generate required css

const styles = (theme) => ({
	loadingContainer: {
		position: 'fixed',
		width: '100%',
		height: '100%',
		background: '#fff',
		zIndex: '999',
		transition: 'all 500ms ease-in-out'
	},
	circle: {
		position: 'absolute',
		top: '40%',
		left: '40%'
	}
});
class Loading extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	handleImageChange = () => {
		this.props.setLoading();
	};
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.loadingContainer}>
				<CircularProgress disableShrink className={classes.circle} size={80} />
			</div>
		);
	}
}

Image.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(Loading));
