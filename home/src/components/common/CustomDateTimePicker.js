import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import isEmpty from './../../validation/is-empty';
import { TextField, FormControl, FormHelperText } from '@material-ui/core';
import Icon from 'react-web-vector-icons';

import DatePicker from 'react-datepicker';
const styles = theme => ({
  dateContainer: {
    display: 'inline-block',
    background: 'transparent',
    width: '100%',
    padding: ' 13px 10px',
    paddingRight: '0px',
    borderRadius: '10px',
    border: '1px solid #c4c4c4',
  },
  input: {
    border: 'none',
    paddingRight: '30px',
    background: 'transparent',
    width: '100%',
    fontSize: '16px',
    '&:focus': {
      outlineWidth: '0',
    },
  },
  popper: {
    width: '101%',
    zIndex: '9999',
  },
  iconSpan: {
    right: '7px',
    position: 'absolute',
    zIndex: '-1',
  },
  label: {
    position: 'absolute',
    top: '-10px',
    left: '14px',
    color: 'rgba(0,0,0,0.54)',
    background: '#fff',
    padding: '0 5px',
    fontSize: '0.8rem',
  },
});

class CustomTextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
    };
  }

  handleChange = date => {
    console.log(date);
    this.setState({
      selectedDate: date,
    });
  };
  render() {
    const { classes } = this.props;
    const {
      selected,
      label,
      onChange,
      readOnly,
      name,
      onBlur,
      value,
      disabled,
      error,
      info,
      helperText,
    } = this.props;
    return (
      <FormControl variant="outlined" className={classes.formControl} error={error}>
        <div className={classes.dateContainer}>
          <span className={classes.label}> {label}</span>
          <DatePicker
            selected={selected}
            onChange={onChange}
            onBlur={onBlur}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="time"
            className={classes.input}
            popperClassName={classes.popper}
            strictParsing
            name={name}
            value={value}
            readOnly={readOnly || false}
            disabled={disabled}
          />
          <span className={classes.iconSpan}>
            <Icon name="calendar" font="Feather" size={16} color="#767676" />
          </span>
        </div>
        <FormHelperText style={{ marginTop: '2px' }}>{error || helperText || info}</FormHelperText>
      </FormControl>
    );
  }
}
CustomTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {},
)(withStyles(styles, { withTheme: true })(CustomTextField));
