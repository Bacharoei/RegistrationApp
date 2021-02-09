import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { getUsers } from '../action/auth';
import { connect } from 'react-redux';


const UserList = ({ getUsers, user: { users } }) => {

    useEffect(() => {
        getUsers()
    }, [getUsers]);

    const userList = users && users.map(user => (
        <tr key={user.id}>
            <td>{user.userName}</td>
            <td className="hide-sm">{user.email}</td>
            <td className="hide-sm">{user.age}</td>


        </tr>
    ));

    return (
        <Fragment>

            <section className="page-container">

                <div className="contact-grid-wrapper">
                    <div className="contact-sidebar-wrapper">
                        <div className="form-logo">
                            <img src={"https://upload.wikimedia.org/wikipedia/he/a/ae/Maccabi_Health_Care_Services_2011_logo.svg"} alt="logo" />
                        </div>
                        <div className="contact-details-wrapper">
                            <i className="fas fa-user" />
                        UserList
                    </div>
                    </div>
                    <table className="table ">
                        <thead>
                            <tr>
                                <th className="">userName</th>
                                <th className="hide-sm"> Email </th>
                                <th>age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList}

                        </tbody>




                    </table>

                </div>
            </section>



        </Fragment>
    )
}



UserList.propTypes = {
    getUsers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    user: state.auth
});


export default connect(mapStateToProps, { getUsers })(UserList)

