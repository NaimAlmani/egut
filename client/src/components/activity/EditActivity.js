import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from './../../utils/config';
import { withStyles } from '@material-ui/core/styles';
import customStyles from './../../theme/customStyles';
import { updateActivity, showEdit } from '../../actions/activity';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import Title from '../common/Title';
import ImageUploader from 'react-images-upload';
import IconItem from '../common/icons/IconItem';
import isEmpty from './../../validation/is-empty';
import RichText from './../common/RichText';
import DateFnsUtils from '@date-io/date-fns';
import formatISO from 'date-fns/formatISO';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker
} from 'material-ui-pickers';
const styles = theme => ({
  popupPageContainer: {
    position: 'fixed',
    width: '100%',
    height: '100vh',
    top: '0',
    left: '0',
    zIndex: '999'
  },
  overlay: {
    width: '100%',
    height: '100%',
    opacity: '0.3',
    background: '#333'
  },
  FormContainer: {
    width: '75%',
    padding: '20px 50px',
    position: 'fixed',
    height: 'calc(100vh - 200px)',
    top: '100px',
    left: '12.5%',
    minWidth: '300px',
    overflow: 'auto'
  },
  button: {
    margin: theme.spacing.unit
  },
  closeIcon: {
    textAlign: 'right'
  },
  mediaContaier: {
    width: '40%',
    height: 'auto',
    margin: '0 auto'
  },
  image: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
    width: '100%'
  }
});

class EditActivity extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      pictures: [],
      logo: null,
      oldLogo: '',
      is_active: false,
      startDate: new Date(),
      endDate: new Date(),
      isWeekly: true
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  componentDidMount() {
    if (!isEmpty(this.props.activity.selectedActivity)) {
      this.setState({
        name: this.props.activity.selectedActivity.name,
        description: this.props.activity.selectedActivity.description,
        oldLogo: this.props.activity.selectedActivity.logoPath,
        is_active:
          this.props.activity.selectedActivity.is_active === 1 ? true : false,
        isWeekly:
          this.props.activity.selectedActivity.is_weekly === 1 ? true : false,
        startDate: !isEmpty(this.props.activity.selectedActivity.start_date)
          ? new Date(
              Date.parse(
                this.props.activity.selectedActivity.start_date.replace(
                  '-',
                  '/',
                  'g'
                )
              )
            )
          : new Date(),
        endDate: !isEmpty(this.props.activity.selectedActivity.end_date)
          ? new Date(
              Date.parse(
                this.props.activity.selectedActivity.end_date.replace(
                  '-',
                  '/',
                  'g'
                )
              )
            )
          : new Date()
      });
    }
  }

  componentWillReceiveProps(nextProps) {}
  onCancel() {
    this.props.showEdit(this.props.selectedActivity, false);
  }
  onDrop(picture, file) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
      logo: file
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const newLogo = !isEmpty(this.state.pictures)
      ? this.state.pictures[0]
      : null;
    const activityData = {
      id: this.props.activity.selectedActivity.id,
      name: this.state.name,
      description: this.state.description,
      logo: newLogo,
      is_active: this.state.isActive === true ? 1 : 0,
      isWeekly: this.state.isWeekly === true ? 1 : 0,
      startDate: formatISO(this.state.startDate),
      endDate: formatISO(this.state.endDate)
    };
    this.props.updateActivity(activityData);
    this.props.showEdit(this.props.selectedActivity, false);
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onChangeTextEditor = value => {
    this.setState({
      description: value
    });
  };
  handleStartDateChange(date) {
    this.setState({ startDate: date });
  }

  handleEndDateChange(date) {
    this.setState({ endDate: date });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.popupPageContainer}>
        <div className={classes.overlay} />
        <Paper className={classes.FormContainer} elevation={1}>
          <div className={classes.closeIcon}>
            <span
              onClick={this.onCancel}
              style={{ cursor: 'pointer', width: 'auto' }}
            >
              <IconItem name='x' type='Feather' />
            </span>
          </div>
          <Title
            text='EditActivity'
            color={this.props.theme.palette.primary.main}
            icon='lock'
          />
          <form onSubmit={this.onSubmit} encType='multipart/form-data'>
            <div className={classes.FieldContainer}>
              <TextField
                id='outlined-email-input'
                label='Name'
                className={(classes.textField, classes.textfield)}
                type='text'
                name='name'
                autoComplete='name'
                margin='normal'
                variant='outlined'
                fullWidth={true}
                onChange={this.onChange}
                value={this.state.name}
              />
            </div>

            <ImageUploader
              withIcon={true}
              buttonText='Choose images'
              onChange={this.onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
              maxFileSize={10000000}
              label='Max image size 10 mb'
              singleImage={true}
              withPreview={true}
              name='fileInput'
              className='imageInputFile'
            />
            <div className={classes.oldImageCont}>
              <label>The current logo: </label>
              <div className={classes.mediaContaier}>
                <img
                  className={classes.image}
                  src={config.imagesPath + this.state.oldLogo}
                  alt='logo'
                />
              </div>
            </div>
            <div className={classes.switchContainer}>
              <FormControlLabel
                labelPlacement='start'
                control={
                  <Switch
                    checked={this.state.is_active}
                    onChange={this.handleChange('isActive')}
                    value={this.state.is_active}
                    color='primary'
                    name='isActive'
                  />
                }
                label='Active ?'
              />
            </div>
            <div className={classes.switchContainer}>
              <FormControlLabel
                labelPlacement='start'
                control={
                  <Switch
                    checked={this.state.isWeekly}
                    onChange={this.handleChange('isWeekly')}
                    value='isWeekly'
                    color='primary'
                    name='isWeekly'
                  />
                }
                label='weekly ?'
              />
            </div>
            {this.state.isWeekly === false && (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  margin='normal'
                  label='Start date'
                  value={this.state.startDate}
                  onChange={this.handleStartDateChange}
                />
                <DatePicker
                  margin='normal'
                  label='End date'
                  value={this.state.endDate}
                  onChange={this.handleEndDateChange}
                />
              </MuiPickersUtilsProvider>
            )}
            <div className={classes.RichFieldContainer}>
              <Typography>description:</Typography>
              <RichText
                onChange={this.onChangeTextEditor}
                value={this.state.description}
              />
            </div>
            <div style={{ textAlign: 'right' }}>
              <Button
                variant='outlined'
                color='primary'
                className={classes.button}
                size='large'
                type='submit'
              >
                Update
              </Button>
              <Button
                variant='outlined'
                color='error'
                className={classes.button}
                size='large'
                onClick={this.onCancel}
              >
                cancel
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

EditActivity.propTypes = {
  updateActivity: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  loading: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  loading: state.loading,
  activity: state.activity
});

export default connect(mapStateToProps, { updateActivity, showEdit })(
  withStyles(styles, { withTheme: true })(EditActivity)
);
