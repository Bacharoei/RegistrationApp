import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { login } from '../action/auth';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { ToastContainer } from 'react-toastify';

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        userName: '',
        email: '',
    })

    const { userName, email } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = async e => {
        e.preventDefault();
        login({ userName, email })
    }

    // Redirerct if logged in
    if (isAuthenticated) {
        return <Redirect to="/users" />
    }

    return (
        <section className="page-container">
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <ToastContainer />

            <div className="contact-grid-wrapper">
                <div className="contact-sidebar-wrapper">
                    <div className="form-logo">
                        <img src={"https://upload.wikimedia.org/wikipedia/he/a/ae/Maccabi_Health_Care_Services_2011_logo.svg"} alt="logo" />
                    </div>
                    <div className="contact-details-wrapper">
                        <i className="fas fa-sign-in-alt"></i>
                        Login
                    </div>
                </div>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                        <input type="text" name="userName" value={userName} placeholder="User-Name" onChange={e => onChange(e)} />
                        <label htmlFor="userName">Your User-Name</label>
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" value={email} placeholder="Email" onChange={e => onChange(e)} />
                        <label htmlFor="Email">Your email</label>
                    </div>
                    <div className="center-btn-wrapper">
                        <button type="submit" className="btn">Login</button>
                    </div>

                </form>
            </div>
        </section>
    )
}

Login.prototype = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

