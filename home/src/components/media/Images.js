import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Gallery from 'react-grid-gallery';
import { Button } from '@material-ui/core';
import allImagesSelected from './../../utils/allImagesSelected';
import IconItem from './../common/icons/IconItem';
import { deleteActivityImage } from './../../actions/activity';
import { withRouter } from 'react-router-dom';
const styles = theme => ({
  captionStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    //maxHeight: '240px',
    overflow: 'hidden',
    position: 'absolute',
    bottom: '0',
    width: '100%',
    color: 'white',
    padding: '2px',
    fontSize: '90%'
  },
  title: {
    width: '100%',
    textAlign: 'center',
    color: theme.palette.green.main
  },

  IconContainer: {
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    backgroundColor: theme.palette.green.main,
    float: 'right',
    position: 'absolute',
    right: '2px',
    bottom: '2px',
    zIndex: '99999'
  },
  trash: {
    cursor: 'wait'
  },
  btn: {
    position: 'absolute',
    width: '100%',
    top: '0',
    color: '#fff'
  }
});
class Images extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      isDelete: false,
      currentImage: ''
    };
    this.onCurrentImageChange = this.onCurrentImageChange.bind(this);
  }
  componentDidMount() {
    this.setState({ images: this.props.images });
  }
  componentWillReceiveProps(nextprops) {
    this.setState({
      images: nextprops.images
    });
  }

  onSelectImage(index, image) {
    var images = this.state.images.slice();
    var img = images[index];
    if (img.hasOwnProperty('isSelected')) img.isSelected = !img.isSelected;
    else img.isSelected = true;

    this.setState({
      images: images
    });

    if (allImagesSelected(images)) {
      this.setState({
        selectAllChecked: true
      });
    } else {
      this.setState({
        selectAllChecked: false
      });
    }
  }
  onCurrentImageChange(index) {
    this.setState({ currentImage: index });
  }
  onVisit = () => {
    const current = this.state.images[this.state.currentImage];
    console.log('current.actiivity_id');
    console.log(current.activity_id);
    this.props.onVisit(current.activity_id);
  };

  render() {
    const { classes } = this.props;
    var images = this.props.images.map(i => {
      i.customOverlay = (
        <Link to={`/activity/${i.activity_id}`}>
          <div className={classes.captionStyle}>
            <div className={classes.title}>{i.caption}</div>

            <div className={classes.description}>{i.description}</div>
            {i.hasOwnProperty('tags') && this.setCustomTags(i)}
          </div>
        </Link>
      );
      return i;
    });
    return (
      <div>
        <Gallery
          images={this.state.images}
          srcSet={this.state.images}
          enableImageSelection={false}
          currentImageWillChange={this.onCurrentImageChange}
          customControls={[
            <Button
              key='deleteImage'
              className={classes.btn}
              onClick={this.onVisit}
            >
              Visa aktivitet
            </Button>
          ]}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({});

export default connect(mapStateToProps, { deleteActivityImage })(
  withStyles(styles, { withTheme: true })(withRouter(Images))
);
