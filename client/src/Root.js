import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import {
  withStyles,
  withTheme,
  MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import OnImagesLoaded from 'react-on-images-loaded';
import Loading from './components/common/Loading';
import initTheme from './theme/initTheme';
import PrivateRoute from './components/common/PrivateRoute';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser, setCurrentUser } from './actions/auth';
import { setLoading } from './actions/loading';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import AdminFrame from './components/headers/AdminFrame';
import Orgs from './components/org/Orgs';
import Places from './components/place/Places';
import Settings from './components/settings/Settings';
import Groups from './components/group/Groups';
import Categories from './components/category/Categories';
import Activities from './components/activity/Activities';
import ViewActivity from './components/activity/ViewActivity';
import ViewOrg from './components/org/ViewOrg';
import ViewCategory from './components/category/ViewCategory';
import ViewGroup from './components/group/ViewGroup';
import ViewPlace from './components/place/ViewPlace';
import EmailsMain from './components/email/EmailsMain';
import SchemaMain from './components/Schema/SchemaMain';
import { LinearProgress } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import SubList from './components/subscription/SubList';

import ExpiredActivities from './components/activity/ExpiredActivities';
const theme = createMuiTheme(initTheme);
const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    display: 'block'
  },
  loadingCont: {
    position: 'fixed',
    width: '100%',
    height: '5px',
    top: '0',
    left: '0',
    background: '#333'
  }
});
let BrowserHistory = Router.BrowserHistory;
class Root extends Component {
  componentDidMount() {
    this.props.setLoading(true);
  }
  render() {
    const { classes } = this.props;
    return (
      <Router history={BrowserHistory}>
        <MuiThemeProvider theme={theme}>
          <Scrollbars
            autoHide
            style={{ width: '100%', height: '100vh' }}
            renderThumbVertical={({ style, ...props }) => (
              <div
                {...props}
                style={{
                  ...style,
                  backgroundColor: this.props.theme.palette.primary.main,
                  width: '4px',
                  opacity: '0.8',
                  borderRadius: '2px'
                }}
              />
            )}
          >
            <AdminFrame>
              <OnImagesLoaded onLoaded={() => this.props.setLoading(true)}>
                <Route exact path='/login' component={Login} />
                <Route />
                <Switch>
                  <PrivateRoute exact path='/register' component={Register} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path='/' component={Dashboard} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path='/orgs' component={Orgs} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path='/places' component={Places} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path='/groups' component={Groups} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path='/categories'
                    component={Categories}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path='/activities'
                    component={Activities}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path='/activities/expired'
                    component={ExpiredActivities}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path='/activity/:id'
                    component={ViewActivity}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path='/organization/:id'
                    component={ViewOrg}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path='/category/:id'
                    component={ViewCategory}
                  />
                </Switch>

                <Switch>
                  <PrivateRoute exact path='/group/:id' component={ViewGroup} />
                </Switch>

                <Switch>
                  <PrivateRoute exact path='/place/:id' component={ViewPlace} />
                </Switch>

                <Switch>
                  <PrivateRoute exact path='/emails' component={EmailsMain} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path='/schema' component={SchemaMain} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path='/subscription'
                    component={SubList}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute exact path='/settings' component={Settings} />
                </Switch>
              </OnImagesLoaded>
            </AdminFrame>
          </Scrollbars>
        </MuiThemeProvider>
      </Router>
    );
  }
}
Root.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  loading: state.loading
});

export default connect(mapStateToProps, {
  logoutUser,
  setCurrentUser,
  setLoading
})(withStyles(styles, { withTheme: true })(Root));
