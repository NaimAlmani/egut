import React from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';
import IconItem from './../common/icons/IconItem';
import { Link } from 'react-router-dom';

import './BootstrapNavBar.css';
import ContactForm from './ContactForm';
export default class BootstrapNavBar extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
			isContactShow: false
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	onShowContact = () => {
		this.setState({
			isContactShow: true
		});
	};
	onhideContact = () => {
		this.setState({
			isContactShow: false
		});
	};
	render() {
		return (
			<div>
				<Navbar style={{ background: '#333' }} dark expand='md'>
					<NavbarBrand href={process.env.PUBLIC_URL}>
						<img
							src='/images/logoRG.jpg'
							alt='RESTAD GÅRD UTBILDNIND'
							style={{ width: '60px', height: '50px' }}
						/>
						<p
							className='notranslate'
							style={{ margin: '10px', color: '#fff', display: 'inline-block', fontSize: '0.8em' }}
						>
							Restad Gård Utbildning
						</p>
					</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className='ml-auto' navbar>
							<NavItem>
								<NavLink>
									<Link to='/' className='navlink'>
										<IconItem name='home' font='Feather' size={'1rem'} /> Hem
									</Link>
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink>
									<Link to='/activities/' className='navlink'>
										<IconItem name='heart' font='Feather' size={'1rem'} /> Aktiviteter
									</Link>
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink>
									<Link to='/organizations/' className='navlink'>
										<IconItem name='globe' font='Feather' size={'1rem'} /> Partners
									</Link>
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink>
									<Link to='/places' className='navlink'>
										<IconItem name='map-pin' font='Feather' size={'1rem'} /> Våra lokaler
									</Link>
								</NavLink>
							</NavItem>

							<NavItem>
								<NavLink>
									<Link to='http://blog.restadgard-utb.se/about/' className='navlink'>
										<IconItem name='info' font='Feather' size={'1rem'} /> Om oss
									</Link>
								</NavLink>
							</NavItem>

							<NavItem>
								<NavLink>
									<NavItem onClick={this.onShowContact} style={{ cursor: 'pointer' }}>
										<IconItem name='phone-call' font='Feather' size={'1rem'} /> Kontakta
									</NavItem>
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink>
									<a href='https://blog.restadgard-utb.se' className='navlink'>
										<IconItem name='blogger' font='MaterialCommunityIcons' size={'1rem'} /> Blog
									</a>
								</NavLink>
							</NavItem>

							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									<IconItem name='g-translate' font='MaterialIcons' size={'1rem'} /> Språk
								</DropdownToggle>
								<DropdownMenu right>
									<div id='translate' />
								</DropdownMenu>
							</UncontrolledDropdown>
						</Nav>
					</Collapse>
				</Navbar>
				<ContactForm open={this.state.isContactShow} onClose={this.onhideContact} />
			</div>
		);
	}
}
