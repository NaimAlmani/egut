import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CustomSlideShow from './CustomSlideShow';
import Subscription from './Subscription';
import { Grid, Typography } from '@material-ui/core';
import { getHomeInfo } from './../../actions/home';
import CategoryFeed from './../category/CategoryFeed';
import GroupFeed from './../group/GroupFeed';
import { Container, Row, Col } from 'reactstrap';
import defaults from './../../utils/defaults';
import { Fade } from 'react-reveal';

const styles = (theme) => ({
	mainTitle: {
		textAlign: 'center',
		margin: '10px',
		marginTop: '20px'
	},
	section: {
		textAlign: 'center',
		marginBottom: '50px',
		position: 'relative',
		minHeight: '300px'
	},
	sectionBlack: {
		textAlign: 'center',
		marginBottom: '50px',
		position: 'relative',
		color: '#fff',
		minHeight: '300px'
	},
	overlay: {
		background: '#333',
		opacity: '0.5',
		position: 'absolute',
		width: '100%',
		height: '100%'
	},
	sectionContent: {
		padding: '20px',
		zIndex: '1',
		position: 'relative'
	}
});
class Home extends Component {
	componentDidMount() {
		this.props.getHomeInfo();
	}
	render() {
		const { classes } = this.props;

		return (
			<div>
				<div className={classes.Section}>
					<CustomSlideShow slides={this.props.slide.slides} />
				</div>
				<Typography variant='h4' className={classes.mainTitle}>
					Restad Gård Utbildning
				</Typography>
				<div className={classes.section}>
					<Typography variant='h6'>Erbjuder aktiviteter för</Typography>
					<Container fluid={true}>
						<Row>
							<GroupFeed groups={this.props.group.groups} />
						</Row>
					</Container>
				</div>

				<div
					className={classes.sectionBlack}
					style={{
						background: `url('${defaults().background.groups}') no-repeat center center`,
						backgroundSize: 'cover',
						backgroundAttachment: 'fixed'
					}}
				>
					<div className={classes.overlay} />
					<div className={classes.sectionContent}>
						<Typography variant='h6' style={{ color: '#fff' }}>
							Kategorier
						</Typography>
						<Typography variant='p'>
							Erbjuder aktiviteter för vuxna, ungdomar och barn. Aktiviteter kan även vara riktade för
							kvinnor, män eller hela familjer.
						</Typography>

						<Container fluid={true}>
							<Row>
								<CategoryFeed isWhite={true} categories={this.props.category.categories} />
							</Row>
						</Container>
					</div>
				</div>

				<div className={classes.Section}>
					<Fade bottom>
						<Subscription />
					</Fade>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	category: state.category,
	group: state.group,
	slide: state.slide
});

export default connect(mapStateToProps, { getHomeInfo })(withStyles(styles, { withTheme: true })(Home));
