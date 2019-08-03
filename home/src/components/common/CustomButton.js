import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import isEmpty from './../../validation/is-empty';
import Icon from 'react-web-vector-icons';

import {
  OutlinedInput,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputBase,
  FormHelperText,
  Button,
} from '@material-ui/core';
const styles = theme => ({
  btn: {
    background: theme.gradients.success,
    color: '#fff',
    margin: '10px',
    padding: '10px 10px',
    width: '120px',
    borderRadius: theme.borderRadius.button,
    border: '1px solid transparent',
    fontWeight: '700',
    boxShadow: '0px 3px 3px 0px rgba(0,0,0,0.16)',
    '&:hover': {
      boxShadow: '0px 3px 10px 0px rgba(0,0,0,0.16)',
    },
  },
  cancelbtn: {
    color: theme.gradients.primary,
    padding: '10px 10px',
    margin: '10px',
    width: '120px',
    borderRadius: theme.borderRadius.button,

    border: '1px solid #f0f0f0',
    fontWeight: '700',
    boxShadow: '0px 3px 3px 0px rgba(0,0,0,0.16)',
    '&:hover': {
      boxShadow: '0px 3px 10px 0px rgba(0,0,0,0.16)',
    },
  },
});
class CustomButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
  }

  render() {
    const { classes, onClick, style, cancel, type } = this.props;

    return (
      <button
        type={type}
        className={cancel ? classes.cancelbtn : classes.btn}
        style={style}
        onClick={onClick}
      >
        {this.props.children}
      </button>
    );
  }
}
CustomButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {},
)(withStyles(styles, { withTheme: true })(CustomButton));
