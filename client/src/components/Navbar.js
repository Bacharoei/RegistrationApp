import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import Logo from "../img/logo.svg"
import { connect } from 'react-redux';
import { logout } from '../action/auth'


const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {

    const guestLinks = (
        <div className="nav-center-column">
            <div className="banner-image">
                <img src={Logo} alt="logo" />
            </div>
            <ul className="links-wrapper">
                <li className="nav-link">
                    <Link to="/" > Home </Link>
                </li>
                <li className="nav-link">
                    <Link to="/register" > Register </Link>
                </li>
                <li className="nav-link">
                    <Link to="/login" > Login </Link>
                </li>
            </ul>
        </div>
    );

    const authLinks = (
        <div className="nav-center-column">
            <div className="banner-image">
                <img src={Logo} alt="logo" />

            </div>
            <ul className="links-wrapper">

                <li className="nav-link">
                    <Link to="/users" > users </Link>
                </li>
                <li className="nav-link">
                    <Link onClick={logout} to="/" > logout </Link>
                </li>
            </ul>
        </div>
    );

    return (
        <nav className="nav-wrapper">
            <div className="nav-left-column">
                <div className="nav-icons">
                    <i className="fas fa-phone-volume" />
                </div>
                <div className="contact-hours-wrapper">
                    <div className="phone">
                        1700-50-53-53
                    </div>
                    <div className="hours">
                        8 AM - 8 PM
                    </div>
                </div>
            </div>
            {
                (<Fragment> { isAuthenticated ? authLinks : guestLinks}</Fragment>)
            }


            <div className="nav-right-column">
                <div className="address-wrapper">
                    <a href="https://www.google.com/maps/place/HaMered+St+27,+Tel+Aviv-Yafo/data=!4m2!3m1!1s0x151d4c909e5b9e27:0x35de60f6b3e2336c?sa=X&ved=2ahUKEwit0J6159fuAhVDiqQKHSQVCAMQ8gEwAHoECAYQAQ" target="_blank"> HaMered St 27 Street <br />
                    Tel-Aviv, 85251 </a>
                </div>
                <div className="contact-icon">
                    <a href="/">
                        <i className="fas fa-map-marker-alt"></i>
                    </a>
                </div>


            </div>

        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,

}


const mapStateToProps = state => ({
    auth: state.auth,
});


export default connect(mapStateToProps, { logout })(Navbar);