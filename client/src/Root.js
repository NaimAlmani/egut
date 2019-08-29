import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { withStyles, withTheme, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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
import Groups from './components/group/Groups';
import Categories from './components/category/Categories';
import Activities from './components/activity/Activities';
import ViewActivity from './components/activity/ViewActivity';
import ViewOrg from './components/org/ViewOrg';
import ViewPlace from './components/place/ViewPlace';
import EmailsMain from './components/email/EmailsMain';
import { LinearProgress } from '@material-ui/core';
const theme = createMuiTheme(initTheme);
const styles = (theme) => ({
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		display: 'block'
	}
});
let BrowserHistory = Router.BrowserHistory;
class Root extends Component {
	componentDidMount() {
		this.props.setLoading(false);
	}
	render() {
		return (
			<Router history={BrowserHistory}>
				<MuiThemeProvider theme={theme}>
					<AdminFrame>
						<OnImagesLoaded onLoaded={() => this.props.setLoading(true)}>
							{this.props.loading === true ? <LinearProgress /> : null}

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
								<PrivateRoute exact path='/categories' component={Categories} />
							</Switch>
							<Switch>
								<PrivateRoute exact path='/activities' component={Activities} />
							</Switch>
							<Switch>
								<PrivateRoute exact path='/activity/:id' component={ViewActivity} />
							</Switch>
							<Switch>
								<PrivateRoute exact path='/organization/:id' component={ViewOrg} />
							</Switch>

							<Switch>
								<PrivateRoute exact path='/place/:id' component={ViewPlace} />
							</Switch>

							<Switch>
								<PrivateRoute exact path='/emails' component={EmailsMain} />
							</Switch>
						</OnImagesLoaded>
					</AdminFrame>
				</MuiThemeProvider>
			</Router>
		);
	}
}
Root.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	loading: state.loading
});

export default connect(mapStateToProps, { logoutUser, setCurrentUser, setLoading })(
	withStyles(styles, { withTheme: true })(Root)
);
