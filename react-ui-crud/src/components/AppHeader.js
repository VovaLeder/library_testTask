import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
} from 'reactstrap';
import librarby from '../images/librarby.png';
class AppHeader extends Component {
    render() {
        return <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">
                <img src={ librarby } width="128" className="d-inline-block align-top" alt="" />
            </NavbarBrand>
        </Navbar>;
    }
}
export default AppHeader;
