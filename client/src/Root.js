import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withStyles, withTheme, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import initTheme from './theme/initTheme';
import PrivateRoute from './components/common/PrivateRoute';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser, setCurrentUser } from './actions/auth';
import classnames from 'classnames';
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
	render() {
		return (
			<Router history={BrowserHistory}>
				<MuiThemeProvider theme={theme}>
					<AdminFrame>
						<Route exact path='/login' component={Login} />
						<Route exact path='/register' component={Register} />
						<Switch>
							<PrivateRoute exact path='/dashboard' component={Dashboard} />
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
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, setCurrentUser })(withStyles(styles, { withTheme: true })(Root));
