const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    users: []
}

const auth = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case "USER_LOADED":
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        //if the register or login success we get the token back, and we want the user to put the token inside the local storage
        case "REGISTER_SUCCESS":
        case "LOGIN_SUCCESS":
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case "GET_USERS":
            return {
                ...state,
                isAuthenticated: true,
                token: localStorage.getItem('token'),
                loading: false,
                users: payload

            }
        case "REGISTER_FAIL":
        case "AUTH_ERROR":
        case "LOGIN_FAIL":
        case "LOGOUT_FAIL":
        case "LOGOUT":
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }


        default:
            return state;
    }
}
export default auth
