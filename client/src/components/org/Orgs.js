import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OrgFeed from './OrgFeed';
import OrgForm from './OrgForm';
import EditOrg from './EditOrg';
import { withStyles } from '@material-ui/core/styles';
import {
	Grid,
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
	Dialog,
	DialogContent
} from '@material-ui/core';
import { customStyles } from './../../theme/customStyles';
import isEmpty from './../../validation/is-empty';
import { getAllOrgs } from './../../actions/organization';
import SearchInput, { createFilter } from 'react-search-input';
import CustomSearchInput from './../common/CustomSearchInput';
import Title from '../common/Title';
import IconItem from '../common/icons/IconItem';
const KEYS_TO_FILTERS = [ 'name' ];
const styles = (theme) => ({
	root: {
		position: 'relative',
		marginTop: '50px',
		display: 'inline-block',
		width: '100%'
	},
	actionColor: {
		color: theme.palette.green.main
	},
	paperTitle: {
		position: 'absolute',
		top: '-15px',
		background: '#fff',
		padding: '0 10px'
	},
	card: {
		maxWidth: 345,
		margin: '24px auto',
		height: '350',
		overflow: 'auto'
	},
	relativeContainer: {
		position: 'relative'
	}
});
class Orgs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			isAddNew: false
		};
		this.searchUpdated = this.searchUpdated.bind(this);
		this.ShowCreateForm = this.ShowCreateForm.bind(this);
		this.onHideNewOrg = this.onHideNewOrg.bind(this);
	}

	componentDidMount() {
		this.props.getAllOrgs();
	}
	searchUpdated(term) {
		this.setState({ searchTerm: term });
	}
	ShowCreateForm() {
		this.setState({
			isAddNew: true
		});
	}
	onHideNewOrg() {
		this.setState({
			isAddNew: false
		});
	}
	render() {
		const { classes, organization } = this.props;
		let orgsContent;
		const { orgs } = organization;
		if (orgs === null) {
			orgsContent = '';
		} else {
			if (isEmpty(this.state.searchTerm)) {
				orgsContent = <OrgFeed orgs={orgs} />;
			} else {
				const filteredOrgs = orgs.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
				orgsContent = <OrgFeed orgs={filteredOrgs} />;
			}
		}
		return (
			<div className={classes.relativeContainer}>
				<Title
					iconName='globe'
					text=' Organizations'
					subText='You can manage the organizations here'
					color={this.props.theme.palette.primary.main}
				/>
				<CustomSearchInput
					placeholder='Search by name'
					onChange={this.searchUpdated}
					color={this.props.theme.palette.primary.main}
				/>
				<Grid container spacing={10}>
					<Grid item xs={12} sm={6} md={3} onClick={this.ShowCreateForm}>
						<Card className={classes.card}>
							<CardActionArea style={{ minHeight: '290px' }} className={classes.actionColor}>
								<CardContent>
									<Typography gutterBottom variant='h5' component='h2'>
										<IconItem name='plus' type='Feather' size={50} />
										Add new Organization
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
					{orgsContent}
				</Grid>
				<div />
				{this.state.isAddNew ? <OrgForm onCancel={this.onHideNewOrg} /> : null}
				{this.props.organization.isEdit ? <EditOrg /> : null}
			</div>
		);
	}
}

Orgs.propTypes = {
	errors: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	organization: state.organization
});

export default connect(mapStateToProps, { getAllOrgs })(withStyles(styles, { withTheme: true })(Orgs));
