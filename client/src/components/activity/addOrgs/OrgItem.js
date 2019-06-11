import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../../utils/config';
import { Grid } from '@material-ui/core';
import { SelectOrg, deselectOrg } from './../../../actions/activity';
// Generate required css
import { Chip } from '@material-ui/core';
import IconItem from '../../common/icons/IconItem';
import isContain from './../../../utils/isContain';
const styles = (theme) => ({
	root: {
		color: theme.palette.primary.main,
		minHeight: '250px'
	},
	card: {
		maxWidth: 345,
		margin: '24px  auto',
		height: '350',
		overflow: 'auto'
	},
	Selectedchip: {
		background: theme.palette.select.main,
		color: theme.palette.select.contrastText
	},
	mediaContaier: {
		width: '40%',
		height: 'auto',
		margin: '0 auto'
	},
	image: {
		// ⚠️ object-fit is not supported by IE 11.
		objectFit: 'cover',
		width: 'auto',
		height: '100%'
	},
	chip: {},
	deleteBtn: {
		color: theme.palette.error.main,
		background: theme.palette.error.contrastText
	}
});
class OrgItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDelete: false
		};
		this.onDeselectOrg = this.onDeselectOrg.bind(this);
		this.onSelectOrg = this.onSelectOrg.bind(this);
	}
	componentDidCatch(error, info) {
		// You can also log the error to an error reporting service
		console.log('error');
		console.log(error);
		console.log('info');
		console.log(info);
	}
	onSelectOrg = () => {
		this.props.SelectOrg(this.props.org);
	};
	onDeselectOrg = () => {
		this.props.deselectOrg(this.props.org);
	};
	render() {
		const { classes, org, activity } = this.props;
		let content;
		if (isContain(this.props.activity.selectedOrgs, this.props.org)) {
			content = (
				<Chip
					icon={<img className={classes.image} src={config.imagesPath + org.logoPath} alt='logo' />}
					label={org.name}
					clickable
					className={classes.Selectedchip}
					color='select'
					variant='outlined'
					onClick={this.onDeselectOrg}
				/>
			);
		} else {
			content = (
				<Chip
					icon={<img className={classes.image} src={config.imagesPath + org.logoPath} alt='logo' />}
					label={org.name}
					clickable
					className={classes.chip}
					color='primary'
					variant='outlined'
					onClick={this.onSelectOrg}
				/>
			);
		}
		return <div> {content}</div>;
	}
}

OrgItem.propTypes = {
	classes: PropTypes.object.isRequired,
	activity: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	activity: state.activity
});

export default connect(mapStateToProps, { deselectOrg, SelectOrg })(withStyles(styles, { withTheme: true })(OrgItem));
