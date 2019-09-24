import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import SearchInput, { createFilter } from 'react-search-input';
import IconItem from './../common/icons/IconItem';

// Generate required css

class CustomSearchInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: ''
		};
	}
	onChange = (e) => {
		this.setState({
			text: e.target.value
		});
		this.props.onChange();
	};
	render() {
		const { placeholder, onChange } = this.props;
		const color = this.props.color || '#333';
		return (
			<div
				className='searchInput'
				style={{
					borderRadius: '10px',
					paddingLeft: '40px',
					marginBottom: '10px',
					width: '255px',
					background: 'transparent'
				}}
			>
				<SearchInput onChange={onChange} placeholder={placeholder} />
			</div>
		);
	}
}

CustomSearchInput.propTypes = {};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(CustomSearchInput);
