import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavbarText,
    Button} from 'reactstrap';
import { AuthContext } from '../App';

const MenuComp = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const {state, dispatch} = useContext(AuthContext);

    if(!state.isAuthenticated){
        return(
            <div>
                <Navbar className='navbar-dark bg-dark' expand="md">
                    <NavbarBrand href="/">reactstrap</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                    <NavbarText style={{marginLeft: "auto"}}>
                        <Link to={'/login'}>
                            <Button>
                                LOGIN
                            </Button>
                        </Link>
                    </NavbarText>
                    </Collapse>
                </Navbar>
            </div>
        )
    }

    return (
        <div>
            <Navbar className='navbar-dark bg-dark' expand="md">
                <NavbarBrand href="/">reactstrap</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <Link to={'/dashboard'} className='nav-link'>HOME</Link>
                    </NavItem>
                </Nav>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <Link to={'/transaksi'} className='nav-link'>TRANSAKSI</Link>
                    </NavItem>
                </Nav>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <Link to={'/mahasiswa'} className='nav-link'>MAHASISWA</Link>
                    </NavItem>
                </Nav>
                <NavbarText style={{marginLeft: "auto"}}>
                    <Link to={'/login'}>
                        <Button color='success' onClick={()=>dispatch({
                            type: "LOGOUT"
                        })}>
                            LOGOUT
                        </Button>
                    </Link>
                    
                </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default MenuComp