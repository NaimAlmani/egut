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
} from '@material-ui/core';
const styles = theme => ({
  textField: {
    [`& fieldset`]: {
      borderRadius: '10px',
      padding: '0px',
    },
    input: {
      [`& fieldset`]: {
        borderRadius: '50px',
        padding: '0px',
      },
    },
    selectIcon: {
      float: 'right',
      position: 'absolute',
      right: ' 0px',
      top: '12px',
    },

    labelOutlined: {
      background: '#fff',
    },
  },
});
const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {},
  },
  input: {
    borderRadius: '10px',
    position: 'relative',
    backgroundColor: 'transparent',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 15px 15px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
      borderRadius: '10px',
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

class CustomSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };
  }

  inputLabel = React.useRef < HTMLLabelElement > null;

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
    const {
      classes,
      value,
      onChange,
      options,
      name,
      label,
      inputProps,
      error,
      info,
      readOnly,
      inputLabelProps,
      shrink,
      disabled,
    } = this.props;
    let content = options.map(option => {
      return (
        <MenuItem key={option} value={option.id}>
          {option.name}
        </MenuItem>
      );
    });
    return (
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel
          classes={{ outlined: classes.labelOutlined }}
          style={{ background: '#fff', padding: '0 5px' }}
          ref={this.inputLabel}
          htmlFor={name}
          margin="dense"
          shrink={shrink}
        >
          {label}
        </InputLabel>
        <Select
          value={value}
          onChange={onChange}
          classes={{ outlined: classes.input }}
          readOnly={readOnly || false}
          input={
            <BootstrapInput
              classes={{ root: classes.input }}
              name={name}
              id={name}
              disabled={disabled}
            />
          }
          IconComponent={() => (
            <Icon
              style={{ position: 'absolute', right: '0', top: '13px' }}
              name="chevron-down"
              font="Feather"
            />
          )}
        >
          >{content}
        </Select>
        <FormHelperText>{error || info}</FormHelperText>
      </FormControl>
    );
  }
}
CustomSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {},
)(withStyles(styles, { withTheme: true })(CustomSelect));
