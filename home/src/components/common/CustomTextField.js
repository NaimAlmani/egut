import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import isEmpty from './../../validation/is-empty';
import { TextField, FormControl, InputAdornment, FormHelperText } from '@material-ui/core';
import Icon from 'react-web-vector-icons';

const styles = theme => ({
  textStyle: {
    [`& fieldset`]: {
      borderRadius: '10px',
      padding: '0px',
    },
    input: {
      padding: '5px 10px !important ',
    },
  },
});

class CustomTextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
  }
  MouseOverOnItem = () => {
    this.setState({
      isHovered: true,
    });
  };
  MouseLeaveOnItem = () => {
    this.setState({
      isHovered: false,
    });
  };
  render() {
    const { classes } = this.props;
    const {
      name,
      type,
      autoComplete,
      className,
      label,
      id,
      value,
      required,
      onChange,
      onBlur,
      placeholder,
      helperText,
      error,
      info,
      multiline,
      disabled,
      defaultValue,
      inputProps,
      autoFocus,
      inputLabelProps,
      fullWidth,
      rows,
      rowsMax,
    } = this.props;
    return (
      <FormControl classes={{ root: classes.formControlRoot }}>
        <TextField
          id={id || name}
          label={label || name}
          className={classes.textStyle}
          type={type || 'text'}
          name={name || null}
          autoComplete={autoComplete || 'false'}
          margin="normal"
          variant="outlined"
          value={value}
          defaultValue={defaultValue}
          required={required}
          onChange={onChange}
          onBlur={onBlur}
          multiline={multiline}
          disabled={disabled}
          inputProps={inputProps}
          autoFocus={autoFocus || false}
          fullWidth={fullWidth}
          rows={rows || 2}
          rowsMax={rowsMax || 4}
        />
        <FormHelperText style={{ marginTop: '2px' }}>{error || helperText || info}</FormHelperText>
      </FormControl>
    );
  }
}
CustomTextField.propTypes = {};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {},
)(withStyles(styles, { withTheme: true })(CustomTextField));
