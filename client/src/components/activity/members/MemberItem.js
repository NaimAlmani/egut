import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../../utils/config';
import { activiateMember } from './../../../actions/activity';
import ConfirmDelete from '../../common/ConfirmDelete';
import IconItem from './../../common/icons/IconItem';
import Fade from 'react-reveal/Fade';
// Generate required css
import { TableRow, TableCell, Switch, Button } from '@material-ui/core';

const styles = (theme) => ({
	avatar: {
		margin: 10
	},
	image: {
		// ⚠️ object-fit is not supported by IE 11.
		objectFit: 'cover',
		width: '100%'
	},
	deleteBtn: {
		color: theme.palette.error.main,
		background: theme.palette.error.contrastText,
		margin: '0 auto'
	},
	trashIcon: {
		width: '40px',
		height: '40px',
		cursor: 'pointer'
	}
});
class MemberItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isActive: false
		};
	}
	componentDidMount() {
		this.setState({
			isActive: this.props.member.pivot.is_active === 1 ? true : false
		});
	}

	onActivate = () => {
		this.setState({
			isActive: !this.state.isActive
		});

		this.props.activiateMember(this.props.activity.currentActivity.id, this.props.member.id, !this.state.isActive);
	};
	render() {
		const { classes, member } = this.props;
		const themeColors = this.props.theme.palette;
		return (
			<TableRow key={member.name} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
				<TableCell align='center'>{member.name}</TableCell>
				<TableCell align='center'>{member.email}</TableCell>
				<TableCell align='center'>{member.tel}</TableCell>
				<TableCell>
					<TableCell align='right'>
						<div onClick={this.onActivate} className={classes.trashIcon}>
							<Switch
								checked={this.state.isActive}
								onChange={this.onActivate}
								value='checkedB'
								color='primary'
								inputProps={{ 'aria-label': 'primary checkbox' }}
							/>
						</div>
					</TableCell>
				</TableCell>
			</TableRow>
		);
	}
}

MemberItem.propTypes = {
	classes: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
	activity: state.activity
});

export default connect(mapStateToProps, { activiateMember })(withStyles(styles, { withTheme: true })(MemberItem));
