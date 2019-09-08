import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { withStyles, withTheme, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import OnImagesLoaded from 'react-on-images-loaded';
import Loading from './components/common/Loading';
import initTheme from './theme/initTheme';
import PrivateRoute from './components/common/PrivateRoute';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLoading } from './actions/loading';
import Dashboard from './components/dashboard/Dashboard';
import CustomAppBar from './components/headers/CustomAppBar';
import { LinearProgress } from '@material-ui/core';
import Home from './components/home/Home';
import Orgs from './components/org/Orgs';
import ViewOrg from './components/org/ViewOrg';
import BootstrapNavBar from './components/headers/BootstrapNavBar';
import Logo from './components/headers/Logo';
import Footer from './components/footer/Footer';
import CustomSneakBar from './components/common/CustomSneakBar';
import Activities from './components/activity/Activities';
import ViewActivity from './components/activity/ViewActivity';
import { Scrollbars } from 'react-custom-scrollbars';
import NotFound from './components/layouts/NotFound';
import Places from './components/place/Places';
import ViewPlace from './components/place/ViewPlace';
import ViewCategory from './components/category/ViewCategory';
import ViewGroup from './components/group/ViewGroup';

const theme = createMuiTheme(initTheme);
const styles = (theme) => ({
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		display: 'block'
	},
	pageholder: {
		minHeight: '100vh'
	}
});
let BrowserHistory = Router.BrowserHistory;
class Root extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.setLoading(false);
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
						{this.props.loading === true ? (
							<LinearProgress
								style={{ position: 'fixed', top: '0', width: '100%', height: '5px' }}
								color='primary'
							/>
						) : null}
						<CustomSneakBar />
						<BootstrapNavBar />
						<OnImagesLoaded onLoaded={() => this.props.setLoading(true)}>
							<div className={classes.pageholder}>
								<Switch>
									<Route exact path='/' component={Home} />
									<Route exact path='/organization/:id' component={ViewOrg} />
									<Route exact path='/organizations' component={Orgs} />
									<Route exact path='/place/:id' component={ViewPlace} />
									<Route exact path='/places' component={Places} />
									<Route exact path='/activities' component={Activities} />
									<Route exact path='/activity/:id' component={ViewActivity} />
									<Route exact path='/category/:id' component={ViewCategory} />
									<Route exact path='/group/:id' component={ViewGroup} />
									<Route component={NotFound} />
								</Switch>
							</div>
							<Footer />
						</OnImagesLoaded>
					</Scrollbars>
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

export default connect(mapStateToProps, { setLoading })(withStyles(styles, { withTheme: true })(Root));
