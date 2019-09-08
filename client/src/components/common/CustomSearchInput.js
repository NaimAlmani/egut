import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import SearchInput, { createFilter } from 'react-search-input';
import IconItem from './../common/icons/IconItem';

// Generate required css

class CustomSearchInput extends React.Component {
	render() {
		const { placeholder, onChange } = this.props;
		const color = this.props.color || '#333';
		return (
			<div
				className='searchInput'
				style={{
					borderBottom: '1px solid' + color,
					marginBottom: '10px',
				}}
			>
				<IconItem name='search' type='Feather' />
				<SearchInput onChange={onChange} placeholder={placeholder} />
			</div>
		);
	}
}

CustomSearchInput.propTypes = {};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(CustomSearchInput);
