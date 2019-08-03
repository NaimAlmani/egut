import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import isEmpty from './../../validation/is-empty';
import { Card } from '@material-ui/core';
const styles = theme => ({
  card: {
    padding: '20px',
    borderRadius: ' 20px',
    display: 'inline-block',
    cursor: 'pointer',
    border: '1px solid' + theme.palette.select.main,
    transition: 'all 0.25 ease-in-out',
    boxShadow: theme.boxShadow.main,
    textAlign: 'left',
  },
  selectedCard: {
    padding: '20px',
    borderRadius: ' 20px',
    width: '200px',
    height: '200px',
    display: 'inline-block',
    cursor: 'pointer',
    border: '1px solid' + theme.palette.select.dark,
    background: theme.palette.select.main,
    boxShadow: theme.boxShadow.dark,
    transition: 'all 0.25 ease-in-out',
    textAlign: 'left',
  },
});
const customCardStyle = (theme, isSelected, isHovered, isCurrent) => {
  return {
    overflow: 'hidden',
    display: 'inline-block',
    margin: '10px',
    marginLeft: '0',
    padding: '15px 10px',
    borderRadius: '10px',
    background: isSelected
      ? theme.palette.select.light
      : isHovered
      ? theme.palette.select.hover
      : '#fff',
    cursor: isHovered ? 'pointer' : 'default',
    boxShadow: theme.boxShadow.card || '0px 3px 6px 0px rgba(0,0,0,0.16)',
    border: isSelected ? '2px solid ' + theme.palette.select.main : '2px solid transparent',
    transition: 'all 0.1s ease-in-out',
  };
};
class SelectableCard extends React.Component {
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
    const { title, description, isSelected, isCurrent, onClick, className } = this.props;
    return (
      <Card
        onMouseEnter={this.MouseOverOnItem}
        onMouseLeave={this.MouseLeaveOnItem}
        style={customCardStyle(this.props.theme, isSelected, this.state.isHovered, isCurrent)}
        onClick={onClick}
        className={className}
      >
        <div className={classes.title}>{title}</div>
        <div className={classes.title}>{description}</div>
      </Card>
    );
  }
}
SelectableCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {},
)(withStyles(styles, { withTheme: true })(SelectableCard));
