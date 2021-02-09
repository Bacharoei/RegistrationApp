import axios from 'axios'
import { toast } from 'react-toastify';
import setAuthToken from '../utils/setAuthToken';


/* Load User */
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/users/auth');

        dispatch({
            type: "USER_LOADED",
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: "AUTH_ERROR"
        })
    }
}

// Register User
export const register = ({ userName, email, age }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'Application/json'
        }
    }

    const body = JSON.stringify({ userName, email, age });

    try {
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: "REGISTER_SUCCESS",
            payload: res.data
        });
        toast.success('REGISTER_SUCCESS', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });


    } catch (err) {
        const errors = err.response.data.errors;

        dispatch({
            type: "REGISTER_FAIL"
        });

        if (errors) {
            // eslint-disable-next-line array-callback-return
            errors.map(error => {
                toast.warning((`${error.msg}`), {
                    position: "bottom-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
        }
    }
}

//getUser
export const getUsers = () => async dispatch => {

    try {
        const res = await axios.get('/api/users');
        dispatch(loadUser());

        dispatch({
            type: "GET_USERS",
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: "AUTH_ERROR"
        })
    }
}


/* Login User */
export const login = ({ userName, email }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'Application/json'
        }
    };

    const body = JSON.stringify({ email, userName });

    try {
        const res = await axios.post('/api/users/auth', body, config);

        dispatch({
            type: "REGISTER_SUCCESS",
            payload: res.data
        });

        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.map(error => {
                toast.warning((`${error.msg}`), {
                    position: "bottom-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
        }

        dispatch({
            type: "LOGIN_FAIL"
        });
    }
}


/* Logout user and clear Profile */

export const logout = () => dispatch => {
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "CLEAR_PROFILE" });
}
