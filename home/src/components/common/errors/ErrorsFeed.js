import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorItem from './ErrorItem';

class ErrorsFeed extends Component {
	render() {
		const { errors } = this.props;

		return errors.map(error => <ErrorItem key={error} error={error} />);
	}
}

ErrorsFeed.propTypes = {
	errors: PropTypes.array.isRequired
};

export default ErrorsFeed;
