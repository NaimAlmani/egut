import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../../utils/config';

// Generate required css
const styles = (theme) => ({
	orgCont: {
		width: '50px',
		height: '50px',
		overflow: 'hidden',
		display: 'inline-block',
		margin: '2px'
	},
	mediaContaier: {
		width: '100%',
		height: 'auto',
		margin: '0 auto',
		maxHeight: '150px',
		overflow: 'hidden'
	},
	image: {
		// ⚠️ object-fit is not supported by IE 11.
		objectFit: 'cover',
		width: '100%'
	}
});
class OrgItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false
		};
	}
	render() {
		const { classes, org } = this.props;
		return (
			<div className={classes.orgCont}>
				<div className={classes.mediaContaier}>
					<img className={classes.image} src={config.imagesPath + org.logoPath} alt='logo' />
				</div>
			</div>
		);
	}
}

OrgItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(withStyles(styles, { withTheme: true })(OrgItem));
