import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import isEmpty from './../../validation/is-empty';
import PropTypes from 'prop-types';

class RichText extends Component {
	static propTypes = {
		value: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired
	};

	state = {
		richValue: RichTextEditor.createValueFromString(this.props.value, 'html'),
		htmlValue: this.props.value
	};

	componentWillReceiveProps(newProps) {
		if (newProps.value != this.state.htmlValue) {
			this.setState({
				richValue: RichTextEditor.createValueFromString(newProps.value, 'html'),
				htmlValue: newProps.value
			});
		}
	}

	onChange = (richValue) => {
		this.setState({ richValue, htmlValue: richValue.toString('html') }, () => {
			this.props.onChange(this.state.htmlValue);
		});
	};

	render() {
		return (
			<div style={{ height: '300px', overflow: 'auto' }}>
				<RichTextEditor value={this.state.richValue} onChange={this.onChange} style={{ height: '100%' }} />
			</div>
		);
	}
}
export default RichText;
