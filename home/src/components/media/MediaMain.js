import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import config from './../../utils/config';
import changeToGallery from './changeToGallery';
import isEmpty from './../../validation/is-empty';
import { Grid, CircularProgress, Button } from '@material-ui/core';
import { startLoading, endLoading, setLoading } from '../../actions/loading';
import { getAllImages } from './../../actions/activity';
import { Redirect, withRouter } from 'react-router-dom';
// Generate required css
import randomBackground from '../../utils/randomBackground';
import { Container, Row, Col } from 'reactstrap';
import Images from './Images';
import Title from './../common/Title';
const styles = theme => ({
  header: {
    position: 'relative',
    width: '100%',
    height: '60vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  },
  headerContent: {
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    color: 'white'
  },
  editIcon: {
    position: 'absolute',
    right: '10px',
    top: '10px',
    cursor: 'pointer'
  },
  editIconText: {
    color: '#fff',
    fontSize: '1.5em'
  },
  root: {
    color: theme.palette.primary.main,
    height: '350px',
    overflow: 'auto'
  },
  card: {
    maxWidth: 345,
    margin: '24px  auto',
    height: '350',
    overflow: 'auto'
  },
  sectionWhite: {
    color: '#333',
    background: '#fff'
  },
  sectionBlack: {
    color: '#fff',
    background: theme.palette.secondary.main
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
  },
  deleteBtn: {
    color: theme.palette.error.main,
    background: theme.palette.error.contrastText
  },
  //org section
  orgHeader: {
    textAlign: 'center'
  },
  iconCont: {
    float: 'right',
    width: '50px',
    height: '50px',
    background: theme.palette.primary.main,
    borderRadius: '50%',
    marginRight: '10px',
    cursor: 'pointer'
  },
  memberBtn: {
    marginTop: '10px'
  }
});
class MediaMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visitTo: ''
    };
  }

  componentDidMount() {
    this.props.getAllImages();
  }
  onVisit = id => {
    this.props.history.push(`/activity/${id}`);
  };
  render() {
    const { allImages } = this.props.activity;
    const { classes } = this.props;
    if (!isEmpty(this.state.visitTo)) {
      return <Redirect to={`../activity/${this.state.visitTo}`} />;
    }
    return (
      <Container fluid>
        <Row>
          <div style={{ width: '100%', margin: '0 auto' }}>
            <div className={classes.title}>
              <Title
                text={'Galleri'}
                color={this.props.theme.palette.primary.main}
              />
            </div>
            <Images
              images={changeToGallery(allImages)}
              onVisit={this.onVisit}
            />
          </div>
        </Row>
      </Container>
    );
  }
}

MediaMain.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  activity: state.activity,
  loading: state.loading
});

export default connect(mapStateToProps, { getAllImages })(
  withStyles(styles, { withTheme: true })(withRouter(MediaMain))
);
