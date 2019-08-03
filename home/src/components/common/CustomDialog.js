import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Icon from 'react-web-vector-icons';
import Fade from 'react-reveal/Fade';
import { BrowserView, MobileView, isMobile } from 'react-device-detect';
const styles = theme => ({
  mainTitle: {
    fontSize: '25px',
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: '10px',
  },
  container: {
    position: 'absolute',
    width: '100vw',
    height: '100%',
    top: '0',
    left: '0',
  },
  mobileContainer: {
    position: 'absolute',
    width: '50vw',
    height: '100%',
    top: '0',
    left: '0',
  },
  mainContainer: {
    position: 'absolute',
    top: '5%',
    left: 'calc(15% + 44px)',
    width: '70%',
    height: '90%',
    minHeight: '500px',
    background: '#fff',
    borderRadius: '15px',
    padding: '15px',
    zIndex: '999',
    boxShadow: '0px 1px 11px #707070',
    overflow: 'auto',
  },
  mobileMainContainer: {
    position: 'absolute',
    top: '5%',
    width: '100%',
    height: '90%',
    minHeight: '500px',
    background: '#fff',
    borderRadius: '15px',
    padding: '15px',
    zIndex: '999',
    boxShadow: '0px 1px 11px #707070',
    overflow: 'auto',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: '#333',
    opacity: '0.3',
    zIndex: '9',
  },
  closeContainer: {
    float: 'right',
    marginTop: '-10px',
    cursor: 'pointer',
  },
});

class CustomDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditHover: false,
      isDeleteHover: false,
    };
  }

  MouseOverOnEditIcon = () => {
    this.setState({
      isEditHover: true,
    });
  };
  onMouseLeaveEditIcon = () => {
    this.setState({
      isEditHover: false,
    });
  };

  MouseOverOnDeleteIcon = () => {
    this.setState({
      isDeleteHover: true,
    });
  };
  onMouseLeaveDeleteIcon = () => {
    this.setState({
      isDeleteHover: false,
    });
  };
  render() {
    const { classes, activity, theme } = this.props;
    return (
      <div>
        {this.props.isOpen ? (
          <div className={classes.container}>
            <div className={classes.overlay} />
            <div className={isMobile ? classes.mobileMainContainer : classes.mainContainer}>
              <span className={classes.closeContainer} onClick={this.props.onClose}>
                <Icon name="x" font="Feather" color="#000" size={25} />
              </span>
              <div className={classes.mainTitle}>{this.props.title}</div>
              <div className={classes.content}>{this.props.children}</div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
CustomDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {},
)(withStyles(styles, { withTheme: true })(CustomDialog));
