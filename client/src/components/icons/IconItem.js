import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Card } from '@material-ui/core';
import { selectGroupIcon } from './../../actions/group';
import Icon from 'react-web-vector-icons';

// Generate required css

const styles = (theme) => ({
	iconContainer: {
		textAlign: 'center',
		padding: '4px',
		background: '#fff',
		border: '1px solid #444',
		cursor: 'pointer'
	},
	selectedIconContainer: {
		textAlign: 'center',
		padding: '2px',
		background: ' linear-gradient(90deg, rgba(102,185,234,1) 35%, rgba(89,102,239,1) 100%)',
		color: '#fff'
	}
});
class IconItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onSelect = this.onSelect.bind(this);
	}
	onSelect() {
		switch (this.props.iconParent) {
			case 'group':
				this.props.selectGroupIcon({
					name: this.props.icon.name,
					type: this.props.icon.type
				});
				break;
			default:
		}
	}
	render() {
		const { classes } = this.props;
		const icon = this.props.icon;

		return (
			<div className='col col-md-1' style={{ padding: '2px' }}>
				<Card className={classes.iconContainer} onClick={this.onSelect}>
					<Icon
						name={this.props.icon.name}
						font={this.props.icon.type}
						color={this.props.theme.palette.primary.main}
						size={20}
					/>
				</Card>
			</div>
		);
	}
}

IconItem.propTypes = {
	classes: PropTypes.object.isRequired,
	selectIcon: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
	question: state.question,
	icons: state.icons
});

export default connect(mapStateToProps, {
	selectGroupIcon
})(withStyles(styles, { withTheme: true })(IconItem));
