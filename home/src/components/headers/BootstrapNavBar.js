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
export default class BootstrapNavBar extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	render() {
		return (
			<div>
				<Navbar color='dark' dark expand='md'>
					<NavbarBrand to='/'>
						<img src='/images/rgText.png' alt='RESTAD GÅRD UTBILDNIND AB' />
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
										<IconItem name='globe' font='Feather' size={'1rem'} /> Organisationer
									</Link>
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink>
									<Link to='/aboutus/' className='navlink'>
										<IconItem name='info' font='Feather' size={'1rem'} /> Om oss
									</Link>
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
			</div>
		);
	}
}
