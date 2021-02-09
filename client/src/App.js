import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';

import Login from './components/Login';
import Navbar from './components/Navbar'
import Home from './components/pages/Home';
import ErrorPage from './components/pages/ErrorPage';

import { Provider } from 'react-redux'
import store from './store'
import setAuthToken from './utils/setAuthToken';
import UserList from './components/UserList';
import Register from './components/Register';
import { loadUser } from './action/auth';
import PrivateRoute from './components/routing/PrivateRoute';



if (localStorage.token) {
  setAuthToken(localStorage.token);
}


const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());

  }, []);


  return (


    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/users" component={UserList} />
          </Switch>

        </Fragment>
      </Router>
    </Provider>


  )
}

export default App
