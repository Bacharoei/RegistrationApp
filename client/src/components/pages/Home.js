import React from 'react'
import Featured from '../Featured'
import Hero from '../Hero'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';

const Home = ({ isAuthenticated }) => {

    if (isAuthenticated) {
        return <Redirect to='/users' />
    }
    return (
        <div>
            <Hero />
            <Featured />


        </div>
    )
}


Home.prototype = {
    isAuthenticated: PropTypes.bool.isRequired,
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,

});

export default connect(mapStateToProps)(Home)

